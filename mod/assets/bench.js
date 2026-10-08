/* ============================================================
 * PocketOrca-LLM · 引擎测速（fork 附加功能）
 * 用"当前已选模型"依次启动 勾选 的引擎（NPU / GPU / CPU），
 * 走与正常使用完全一致的服务路径，读取 llama-server 响应里的
 * timings 字段，得到每个引擎的 生成速度(t/s) / 提示处理速度(t/s) / 加载耗时。
 *
 * 支持自选引擎（fix5）：测速卡片内勾选要测的引擎，选择会被记住。
 * 只依赖现有 JS 桥（startServer / stopServer / getStatus /
 * isPortBusy / httpPost），不需要改 Java 与 native。
 *
 * 流程：停止现有服务 → 逐个引擎：启动 → 等就绪 → 预热 → 测量
 *       → 停止 → 下一个 → 全部完成后恢复原来的引擎（若之前在运行）。
 * 测速期间会禁用主按钮/引擎切换，可随时点"停止测速"中止。
 * ============================================================ */
"use strict";

var benchRunning = false;      // 状态机运行中标志（app.js 的 guard 读取此变量）
var benchHttpCB = null;        // 当前等待的 httpPost 回调（统一仲裁 onHttpDone）
var benchSaved = null;         // 测速前的服务状态与参数
var benchIdx = 0;              // 当前引擎序号
var benchItems = {};           // 各引擎结果 { phase, loadMs, pp, tg, reason }
var benchT0 = 0;               // 当前引擎启动时刻
var BENCH_ENGINES = ["htp", "ocl", "cpu", "mtp"];
var benchQueue = BENCH_ENGINES.slice();   // 本次要测的引擎（自选）
var BENCH_LABELS = { htp: "NPU", ocl: "GPU", cpu: "CPU", mtp: "MTP" };
var BENCH_START_TIMEOUT = 240000; // 单引擎启动上限（Java 探活 120s + 余量）
var BENCH_HTTP_TIMEOUT = 150000;  // 单次 HTTP 请求看门狗

/* ---- 引擎勾选（自选测速） ---- */

function benchPickBox() {
  return document.getElementById("benchPick");
}

function benchReadPicks() {
  var box = benchPickBox();
  if (!box || !box.querySelectorAll) return BENCH_ENGINES.slice();
  var chips = box.querySelectorAll(".chip.on");
  var out = [];
  for (var i = 0; i < chips.length; i++) {
    var id = chips[i].getAttribute("data-bench");
    if (id && BENCH_ENGINES.indexOf(id) >= 0) out.push(id);
  }
  return out;
}

function benchApplySel(picks) {
  benchQueue = picks.slice();
  var box = benchPickBox();
  if (box && box.querySelectorAll) {
    var chips = box.querySelectorAll(".chip");
    for (var j = 0; j < chips.length; j++) {
      var id = chips[j].getAttribute("data-bench");
      var on = benchQueue.indexOf(id) >= 0;
      if (chips[j].classList) {
        if (on) chips[j].classList.add("on"); else chips[j].classList.remove("on");
      }
    }
  }
  try { localStorage.setItem("npullmBenchSel", benchQueue.join(",")); } catch (e) { }
}

function benchLoadSel() {
  var saved = null;
  try { saved = localStorage.getItem("npullmBenchSel"); } catch (e) { }
  var picks = null;
  if (saved) {
    var arr = saved.split(",");
    picks = [];
    for (var i = 0; i < arr.length; i++) {
      if (BENCH_ENGINES.indexOf(arr[i]) >= 0) picks.push(arr[i]);
    }
  }
  /* fix12: 无历史时默认只勾 NPU+CPU（GPU/MTP 手动加；低内存设备禁 GPU 完整测速红线，默认比警告更安全） */
  if (!picks || !picks.length) {
    picks = [];
    var safe = ["npu", "cpu"], k;
    for (k = 0; k < safe.length; k++) if (BENCH_ENGINES.indexOf(safe[k]) >= 0) picks.push(safe[k]);
    if (!picks.length) picks = BENCH_ENGINES.slice();
  }
  benchApplySel(picks);
}

(function () {
  var box = benchPickBox();
  if (box && box.addEventListener) {
    box.addEventListener("click", function (ev) {
      if (benchRunning) { toastT("测速进行中，请稍候"); return; }
      var t = ev.target;
      if (!t || !t.classList || !t.classList.contains("chip")) return;
      t.classList.toggle("on");
      benchApplySel(benchReadPicks());
    });
  }
  benchLoadSel();
})();

/* fix12: 测速失败行"查看日志"跳转（事件委托，常驻零开销） */
(function () {
  var box = document.getElementById("benchTable");
  if (box && box.addEventListener) {
    box.addEventListener("click", function (ev) {
      var t = ev.target;
      if (t && t.classList && t.classList.contains("golog")) {
        if (typeof goTab === "function") goTab(t.getAttribute("data-go") || "pageLogs");
      }
    });
  }
})();

/* ---- onHttpDone 仲裁：测速期间的响应由测速逻辑消费，其余走原处理 ---- */
(function () {
  var orig = window.onHttpDone;
  window.onHttpDone = function (st, payload) {
    if (benchHttpCB) {
      var cb = benchHttpCB;
      benchHttpCB = null;
      try { cb("200" === st, payload || ""); } catch (e) { }
      return;
    }
    if (orig) orig(st, payload);
  };
})();

/* ---- UI 小工具 ---- */

function benchEl(id) { return document.getElementById(id); }

function benchSetUi(stat) {
  var el = benchEl("benchStat");
  if (!el) return;
  el.textContent = stat || "";
  el.style.display = stat ? "block" : "none";
}

function benchSetBtn(text, busy) {
  var b = benchEl("btnBench");
  if (!b) return;
  b.textContent = text;
  if (busy) b.classList.add("busy"); else b.classList.remove("busy");
}

function benchPut(eng, item) {
  benchItems[eng] = item;
  // fix10: MTP 探测结果按模型路径缓存（skip 的跳过不算一次探测）
  if (eng === "mtp" && !item.skip && typeof recordModelMtp === "function") {
    var mp = (typeof model !== "undefined" && model && model.path) || "";
    if (mp && item.phase === "done") recordModelMtp(mp, true);
    else if (mp && item.phase === "fail" && benchMtpNoMtp()) recordModelMtp(mp, false);
  }
  benchRenderRows();
}

function benchRenderRows() {
  var box = benchEl("benchTable");
  if (!box) return;
  var html = "";
  for (var i = 0; i < benchQueue.length; i++) {
    var eng = benchQueue[i];
    var it = benchItems[eng] || { phase: "wait" };
    html += '<div class="brow"><span class="beng">' + BENCH_LABELS[eng] + '</span><span class="bstat">';
    if (it.phase === "wait") html += T("等待中");
    else if (it.phase === "starting") html += T("启动中") + "…";
    else if (it.phase === "warm") html += T("预热中…");
    else if (it.phase === "measuring") html += T("测量中…");
    else if (it.phase === "done") {
      html += '<span class="tv">⚡ ' + (it.tg || 0).toFixed(1) + " t/s</span>" +
        " · " + T("提示处理") + " " + (it.pp || 0).toFixed(1) + " t/s · " + T("加载") + " " +
        ((it.loadMs || 0) / 1000).toFixed(1) + "s";
    } else {
      /* fix12: 失败行给"查看日志"跳转 */
      html += '<span class="bad">✗ ' + (it.reason || T("失败")) + "</span>" +
        ' <a class="golog" data-go="pageLogs" style="color:var(--primary);font-size:12px">' + T("查看日志") + "</a>";
    }
    html += "</span></div>";
  }
  // U4: 淡入过渡，避免闪烁（Node 环境 fallback）
  box.style.opacity = "0";
  var raf = typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : function(f) { setTimeout(f, 16); };
  raf(function() {
    box.innerHTML = html;
    box.style.transition = "opacity .15s";
    box.style.opacity = "1";
  });
}

/* ---- HTTP 封装（带看门狗，防请求悬挂） ---- */

function benchHttp(path, body, cb) {
  var done = false;
  var self = null;
  var watchdog = setTimeout(function () {
    if (done) return;
    done = true;
    if (benchHttpCB === self) benchHttpCB = null;
    cb(false, "");
  }, BENCH_HTTP_TIMEOUT);
  self = function (ok, payload) {
    if (done) return;
    done = true;
    clearTimeout(watchdog);
    cb(ok, payload);
  };
  benchHttpCB = self;
  bridge("httpPost", "http://127.0.0.1:" + benchSaved.port + path, body);
}

function benchReadStatus() {
  var st = null;
  try { st = JSON.parse(bridge("getStatus") || "null"); } catch (e) { }
  return st || null;
}

function benchPortBusy() {
  try { return !!bridge("isPortBusy", benchSaved.port); } catch (e) { return false; }
}

/* ---- 主流程 ---- */

function benchStart() {
  if (benchRunning) { benchAbortNow(); return; }
  if (!model || !model.path) { toastT("先选择模型文件"); return; }
  if (0 === String(model.path).indexOf("__bmoe__")) { toastT("BigMoE 模型不支持测速"); return; }
  // fix8: MTP 引擎需要 MTP-GGUF（Qwen3.5 MTP 权重），普通模型会启动失败——提示但不拦截（失败也是有效结果）
  // fix9: 失败原因细化见 benchFailReason（读日志特征，普通模型显示"需 MTP 权重"而非笼统"启动失败"）
  // （MTP profile 的 requires 量化检查由 Java 层负责，JS 不重复）

  // 自选引擎：有勾选 UI 时用勾选值（空 = 提示），无 UI（测试环境）默认全选
  var box = benchPickBox();
  if (box && box.querySelectorAll) {
    var picks = benchReadPicks();
    if (!picks.length) { toastT("未选择任何引擎，请至少勾选一个"); return; }
    benchApplySel(picks);
  } else {
    benchQueue = BENCH_ENGINES.slice();
  }

  benchSaved = {
    wasRunning: false,
    profileId: profileId,
    port: port(),
    ctx: ctxSize,
    ub: ubatch,
    reasoning: benchEl("reasoning").checked ? "on" : "off",
    threads: threads,
    noKvOffload: !benchEl("kvoff").checked
  };
  var st0 = benchReadStatus();
  benchSaved.wasRunning = !!(st0 && st0.running);
  if (!benchSaved.wasRunning && benchPortBusy()) { toastT("端口被占用，请更换"); return; }

  benchRunning = true;
  benchIdx = 0;
  benchItems = {};
  benchHttpCB = null;
  benchEl("benchTable").style.display = "block";
  benchRenderRows();
  benchSetBtn(T("停止测速"), true);
  benchSetUi(T("准备中…"));

  bridge("stopServer");
  setTimeout(function () { if (benchRunning) benchWaitFree(0, benchNext); }, 600);
}

function benchAbortNow() {
  if (!benchRunning) return;
  benchRunning = false;
  benchHttpCB = null;
  bridge("stopServer");
  benchSetUi(T("已取消"));
  benchSetBtn(T("开始测速"), false);
  setTimeout(function () { benchRestore(T("已取消")); }, 900);
}

function benchWaitFree(tries, cb) {
  if (!benchRunning) return;
  if (!benchPortBusy() || tries >= 40) { cb(); return; }
  setTimeout(function () { benchWaitFree(tries + 1, cb); }, 500);
}

function benchNext() {
  if (!benchRunning) return;
  if (benchIdx >= benchQueue.length) { benchFinish(); return; }
  var eng = benchQueue[benchIdx];
  // fix10: 已知不支持的引擎直接跳过，不浪费一次启动的时间开销
  if (typeof engineAllowed === "function") {
    var chk = engineAllowed(eng);
    if (!chk.ok) {
      benchPut(eng, { phase: "fail", reason: chk.reason, skip: true });
      benchIdx += 1;
      setTimeout(function () { benchWaitFree(0, benchNext); }, 300);
      return;
    }
  }
  benchPut(eng, { phase: "starting" });
  /* fix12: 总进度 n/m */
  benchSetUi(T("测速中") + " " + (benchIdx + 1) + "/" + benchQueue.length + " · " + BENCH_LABELS[eng] + " " + T("启动中") + "…");
  benchT0 = Date.now();
  doStart({
    modelPath: model.path,
    profileId: eng,
    port: benchSaved.port,
    ctx: benchSaved.ctx,
    ub: benchSaved.ub,
    reasoning: benchSaved.reasoning,
    threads: benchSaved.threads,
    noKvOffload: benchSaved.noKvOffload
  });
  benchPollReady(0);
}

/* fix10: MTP 失败特征判断抽出，与 caps.js 同源（caps.js 未加载时本地回退） */
function benchMtpNoMtp() {
  try {
    if (typeof mtpLogHasNoMtp === "function") return mtpLogHasNoMtp();
  } catch (e) { }
  try {
    var log = bridge("getLog") || "";
    return log.indexOf("doesn't contain MTP layers") >= 0 || log.indexOf("failed to create MTP context") >= 0;
  } catch (e2) { return false; }
}

/* fix9: MTP 失败原因细化 —— 普通 GGUF 缺 MTP 层时给出可操作提示，而非笼统"启动失败" */
function benchFailReason(eng) {
  if (eng === "mtp" && benchMtpNoMtp())
    return T("需 MTP 权重（当前模型不含 MTP 层）");
  return T("启动失败");
}

function benchPollReady(elapsed) {
  if (!benchRunning) return;
  var eng = benchQueue[benchIdx];
  if (elapsed > BENCH_START_TIMEOUT) { benchFail(eng, T("启动超时")); return; }
  var st = benchReadStatus();
  if (st && st.running) { benchWarm(eng, Date.now() - benchT0); return; }
  var s = st && st.state;
  // error = 启动失败/健康检查超时；ready（启动后 4s 又回到 ready）= 进程退出
  if (s === "error" || (s === "ready" && elapsed > 4000)) { benchFail(eng, benchFailReason(eng)); return; }
  setTimeout(function () { benchPollReady(elapsed + 1000); }, 1000);
}

/* 预热：短请求让 OpenCL 内核 JIT / NPU 缓冲就绪，正式测量更稳定 */
function benchWarm(eng, loadMs) {
  if (!benchRunning) return;
  benchPut(eng, { phase: "warm", loadMs: loadMs });
  benchSetUi(BENCH_LABELS[eng] + " " + T("预热中…"));
  benchHttp("/v1/chat/completions",
    JSON.stringify({ model: "bench", messages: [{role: "user", content: "Hello"}], max_tokens: 8, temperature: 0, top_k: 1, stream: false }),
    function (ok) {
      if (!benchRunning) return;
      if (!ok) { benchFail(eng, T("请求失败"), loadMs); return; }
      benchRun(eng, loadMs);
    });
}

/* 正式测量：~250 token 提示 + 生成 64 token（cache 不命中） */
function benchRun(eng, loadMs) {
  if (!benchRunning) return;
  benchPut(eng, { phase: "measuring", loadMs: loadMs });
  benchSetUi(BENCH_LABELS[eng] + " " + T("测量中…"));
  var t0 = Date.now();
  benchHttp("/v1/chat/completions",
    JSON.stringify({
      model: "bench",
      messages: [{role: "user", content: benchPrompt()}],
      max_tokens: 64,
      temperature: 0,
      top_k: 1,
      stream: false
    }),
    function (ok, body) {
      if (!benchRunning) return;
      if (!ok) { benchFail(eng, T("请求失败"), loadMs); return; }
      var elapsed = (Date.now() - t0) / 1000;
      var o = null;
      try { o = JSON.parse(body); } catch (e) { }
      if (!o) { benchFail(eng, T("解析失败"), loadMs); return; }
      var usage = o.usage || {};
      var completionTokens = usage.completion_tokens || 0;
      var promptTokens = usage.prompt_tokens || 0;
      // OpenAI 兼容格式无 timings，用 usage + 耗时估算
      if (completionTokens <= 0) { benchFail(eng, T("无生成数据"), loadMs); return; }
      var tg = completionTokens / Math.max(0.1, elapsed);
      var pp = promptTokens / Math.max(0.1, elapsed * 0.3); // 假设 30% 时间在 prompt
      benchPut(eng, {
        phase: "done",
        loadMs: loadMs,
        pp: pp,
        tg: tg
      });
      benchAdvance();
    });
}

function benchPrompt() {
  var s = "The quick brown fox jumps over the lazy dog. ";
  var out = "";
  for (var i = 0; i < 28; i++) out += s;
  return out;
}

function benchFail(eng, reason, loadMs) {
  benchPut(eng, { phase: "fail", reason: reason, loadMs: loadMs || 0 });
  benchAdvance();
}

function benchAdvance() {
  bridge("stopServer");
  benchIdx += 1;
  setTimeout(function () { benchWaitFree(0, benchNext); }, 300);
}

function benchFinish() {
  benchRunning = false;
  var best = null, bestTg = 0;
  for (var i = 0; i < benchQueue.length; i++) {
    var it = benchItems[benchQueue[i]];
    if (it && it.phase === "done" && it.tg > bestTg) { bestTg = it.tg; best = benchQueue[i]; }
  }
  var msg = T("测速完成");
  if (best) msg += " · " + T("最快") + ": " + BENCH_LABELS[best] + " " + bestTg.toFixed(1) + " t/s";
  else msg += " · " + T("全部失败");
  benchRestore(msg);
}

/* 恢复测速前的服务状态：之前未运行 = 保持停止；之前运行 = 用原参数重新启动 */
function benchRestore(msg) {
  var was = benchSaved && benchSaved.wasRunning;
  var p = benchSaved && benchSaved.profileId;
  if (!was) {
    bridge("stopServer");
    benchSetUi(msg);
    benchSetBtn(T("开始测速"), false);
    return;
  }
  var tries = 0;
  (function waitRestore() {
    if (!benchPortBusy() || tries >= 20) {
      if (p === "bmoe") {
        doStart({
          modelPath: model.path, profileId: p, port: benchSaved.port, ctx: benchSaved.ctx,
          ub: 0, reasoning: "off", threads: benchSaved.threads, noKvOffload: false
        });
      } else {
        doStart({
          modelPath: model.path, profileId: p, port: benchSaved.port, ctx: benchSaved.ctx,
          ub: benchSaved.ub, reasoning: benchSaved.reasoning,
          threads: benchSaved.threads, noKvOffload: benchSaved.noKvOffload
        });
      }
      benchSetUi(msg + T(" · 已恢复原引擎"));
      benchSetBtn(T("开始测速"), false);
      return;
    }
    tries += 1;
    setTimeout(waitRestore, 500);
  })();
}
