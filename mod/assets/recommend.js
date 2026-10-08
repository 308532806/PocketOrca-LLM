/* recommend.js — 设备推荐参数（fix6）
 *
 * 数据来源：app.js 在启动时把 bridge("welcomeInfo") 的 JSON 存到
 * localStorage["npullmWelcome"]（此处只读，不再调 JNI）。
 * 匹配到模板后可通过 applyRecommend() 一键应用 + 保存。
 *
 * 冒烟测试环境：makeRecommendEnv(test_welcome) 注入 window + localStorage，
 * 再 runInContext 本文件即可调用 findRecommend。
 */
(function () {
  "use strict";

  /* ---- 模板库：按 SoC / 平台匹配（新增型号只需在数组前插入即可）---- */
  /* match: 命中 soc 字符串（小写子串）。ramMin 可选（GB）。 */
  var TEMPLATES = [
    { match: ["sm8750", "8 elite gen 5", "8elite5"], name: "骁龙 8 Elite Gen 5",
      ctx: 16384, ubatch: 1024, threads: 8, kvoff: true, profile: "htp",
      note: "旗舰 NPU，可跑大上下文" },
    { match: ["sm8650", "8 elite"], name: "骁龙 8 Elite",
      ctx: 8192, ubatch: 1024, threads: 8, kvoff: true, profile: "htp",
      note: "旗舰 NPU，8K 上下文流畅" },
    { match: ["sm8550", "8 gen 3", "8gen3"], name: "骁龙 8 Gen 3",
      ctx: 8192, ubatch: 512, threads: 8, kvoff: true, profile: "htp",
      note: "NPU 强，K 系量化可全速" },
    { match: ["sm8450", "8 gen 2", "8gen2"], name: "骁龙 8 Gen 2",
      ctx: 4096, ubatch: 512, threads: 6, kvoff: false, profile: "htp",
      note: "NPU 可用，大上下文注意内存" },
    { match: ["sm8350", "888"], name: "骁龙 888",
      ctx: 4096, ubatch: 256, threads: 6, kvoff: false, profile: "ocl",
      note: "老旗舰，建议 GPU/CPU" },
    { match: ["sm7675", "7+ gen 3", "7+gen3"], name: "骁龙 7+ Gen 3",
      ctx: 4096, ubatch: 256, threads: 6, kvoff: false, profile: "cpu",
      note: "无兼容 NPU，CPU 最稳" },
    { match: ["sm7250", "765g", "765"], name: "骁龙 765G",
      ctx: 4096, ubatch: 256, threads: 4, kvoff: false, profile: "cpu",
      note: "无可用 NPU；Adreno 620 老驱动 GPU 慎用，推荐 CPU" },
    { match: ["sm6450", "6 gen 1", "6gen1"], name: "骁龙 6 Gen 1",
      ctx: 2048, ubatch: 128, threads: 4, kvoff: false, profile: "cpu",
      note: "入门平台，小上下文" }
  ];

  /* 上下文档位（调整时按档跳，不搞碎值） */
  var CTX_TIERS = [2048, 4096, 8192, 16384, 32768];
  function tierIndex(ctx) {
    var idx = 0;
    for (var i = 0; i < CTX_TIERS.length; i++) {
      if (CTX_TIERS[i] <= ctx) idx = i;
    }
    return idx;
  }

  /* 内存扩展（虚拟内存）手动开关：无 bridge 能读到 swap 状态，只能手动 */
  function memExtOn() {
    try { return typeof localStorage !== "undefined" && localStorage.getItem("npullmMemExt") === "1"; }
    catch (e) { return false; }
  }
  function toggleMemExt(on) {
    try { if (typeof localStorage !== "undefined") localStorage.setItem("npullmMemExt", on ? "1" : "0"); } catch (e) {}
    renderRecommend();
  }

  /* 当前模型信息（BigMoE 无文件大小，走模板不调整） */
  function modelInfo() {
    try {
      if (typeof model === "undefined" || !model || !model.path) return null;
      if (model.path.indexOf("__bmoe__") === 0) return null;
      var gb = (model.sizeBytes || 0) / 1073741824;
      if (!(gb > 0)) return null;
      return { gb: gb, name: model.name || "" };
    } catch (e) { return null; }
  }

  function T_(s) { return (typeof T === "function") ? T(s) : s; }

  /* 默认模板（按内存分级的兜底） */
  function defaultTemplate(ramGB) {
    if (ramGB >= 12) return { name: "高内存设备（未识别 SoC）",
      ctx: 8192, ubatch: 512, threads: 6, kvoff: true, profile: "cpu",
      note: "按 12GB+ 内存给的通用推荐" };
    if (ramGB >= 8) return { name: "中内存设备（未识别 SoC）",
      ctx: 4096, ubatch: 256, threads: 4, kvoff: false, profile: "cpu",
      note: "按 8GB 内存给的通用推荐" };
    return { name: "低内存设备",
      ctx: 2048, ubatch: 128, threads: 4, kvoff: false, profile: "cpu",
      note: "内存有限，建议小模型 + 小上下文" };
  }

  /* 读取缓存的设备信息（app.js 在启动时写入 npullmWelcome） */
  function readWelcome() {
    try {
      var raw = null;
      if (typeof localStorage !== "undefined") raw = localStorage.getItem("npullmWelcome");
      if (!raw && typeof window !== "undefined" && window._welcomeInfo) raw = JSON.stringify(window._welcomeInfo);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  /* 匹配模板：返回 {tpl, device, fallback, memExt, model}
   * 三维：SoC 模板（基准）→ 模型大小（按占内存比例调 ctx 档位）
   *       → 内存扩展开关（放宽一档，上限 32768） */
  function findRecommend() {
    var w = readWelcome() || {};
    var soc = (w.soc || "").toLowerCase();
    var ram = w.ramGB || 0;
    var base = null, fallback = false, i, j;
    for (i = 0; i < TEMPLATES.length; i++) {
      var tm = TEMPLATES[i];
      for (j = 0; j < tm.match.length; j++) {
        if (soc.indexOf(tm.match[j]) >= 0) { base = tm; break; }
      }
      if (base) break;
    }
    if (!base) { base = defaultTemplate(ram); fallback = true; }
    // 深拷贝：调整不污染模板库
    var tpl = { match: base.match, name: base.name, ctx: base.ctx, ubatch: base.ubatch,
                threads: base.threads, kvoff: base.kvoff, profile: base.profile,
                note: base.note || "" };
    var notes = [];
    // 1) 模型感知：大模型降档防 OOM，小模型升档吃满内存
    var mi = modelInfo();
    if (mi && ram > 0) {
      var ratio = mi.gb / ram;
      var ti = tierIndex(tpl.ctx);
      if (ratio > 0.6 && ti > 0) {
        tpl.ctx = CTX_TIERS[ti - 1];
        notes.push(T_("模型较大（占内存超 6 成），已调低上下文防 OOM"));
      } else if (ratio < 0.3 && ti < CTX_TIERS.length - 1) {
        tpl.ctx = CTX_TIERS[ti + 1];
        notes.push(T_("模型较小，已调高上下文"));
      }
    }
    // 2) 内存扩展：ctx 放宽一档（闪存 swap 防 OOM 用，速度指望不上）
    var me = memExtOn();
    if (me) {
      var tj = tierIndex(tpl.ctx);
      if (tj < CTX_TIERS.length - 1) {
        tpl.ctx = CTX_TIERS[tj + 1];
        notes.push(T_("内存扩展已开启，上下文放宽一档（扩展内存较慢，超出物理内存部分会变慢）"));
      } else {
        notes.push(T_("内存扩展已开启（已达上下文上限）"));
      }
    }
    if (notes.length) tpl.note = (tpl.note ? tpl.note + "；" : "") + notes.join("；");
    return { tpl: tpl, device: w, fallback: fallback, memExt: me, model: mi };
  }

  /* 应用到当前设置（依赖 app.js 的全局函数与元素） */
  function applyRecommend() {
    if (typeof document === "undefined") return false;
    var r = findRecommend(), t = r.tpl;
    var el = function (id) { return document.getElementById(id); };
    // 引擎（BMoE 开启时跳过）
    if (typeof setProfile === "function" && !(typeof _bmoeOn !== "undefined" && _bmoeOn)) {
      try { setProfile(t.profile); } catch (e) {}
    }
    // 上下文
    if (typeof setCtx === "function") { try { setCtx(t.ctx); } catch (e) {} }
    // ubatch：直接设值 + 刷新显示（stepUbatch 是步进式，这里需要直达）
    if (typeof ubatch !== "undefined") {
      /* global ubatch */
      try { ubatch = t.ubatch; } catch (e) {}
      var uv = el("ubatchVal");
      if (uv) uv.textContent = t.ubatch;
    }
    // 线程：同理直达
    if (typeof threads !== "undefined") {
      /* global threads */
      try { threads = Math.min(8, Math.max(1, t.threads)); } catch (e) {}
      var tv = el("threadsVal");
      if (tv) tv.textContent = Math.min(8, Math.max(1, t.threads));
    }
    // KV 卸载
    var kv = el("kvoff");
    if (kv) kv.checked = !!t.kvoff;
    // 保存 + 提示
    if (typeof save === "function") { try { save(); } catch (e) {} }
    if (typeof toast === "function") {
      toast((typeof T === "function" ? T("已应用推荐参数") : "已应用推荐参数") + " · " + t.name);
    }
    return true;
  }

  /* 渲染卡片内容（index.html 里 #recBody） */
  function renderRecommend() {
    if (typeof document === "undefined") return;
    var body = document.getElementById("recBody");
    var head = document.getElementById("recHead");
    if (!body) return;
    var r = findRecommend(), t = r.tpl, d = r.device || {};
    var label = t.name + (r.fallback ? "（按内存推荐）" : "");
    var engineMap = { htp: "NPU", ocl: "GPU", cpu: "CPU" };
    var engineName = engineMap[t.profile] || t.profile;
    var ctxK = t.ctx >= 1024 ? (t.ctx / 1024) + "K" : t.ctx;
    if (head) head.textContent = label;
    var rows = [];
    rows.push('<div class="rec-row"><span>引擎</span><b>' + engineName + "</b></div>");
    rows.push('<div class="rec-row"><span>上下文</span><b>' + ctxK + "</b></div>");
    rows.push('<div class="rec-row"><span>ubatch</span><b>' + t.ubatch + "</b></div>");
    rows.push('<div class="rec-row"><span>线程</span><b>' + t.threads + "</b></div>");
    rows.push('<div class="rec-row"><span>KV 卸载</span><b>' + (t.kvoff ? "开" : "关") + "</b></div>");
    var devLine = "";
    if (d.soc || d.ramGB) {
      devLine = '<div class="rec-dev">本机：' + (d.soc || "?") +
        (d.ramGB ? " · " + d.ramGB + "GB" : "") +
        (d.cores ? " · " + d.cores + " 核" : "") + "</div>";
    }
    // 内存扩展开关（手动：无 bridge 能读到 swap 状态）
    var meOn = !!r.memExt;
    var meRow = '<label class="rec-row" style="cursor:pointer">' +
      "<span>" + T_("内存扩展") +
      '<div class="phint" style="font-size:11px;color:var(--faint)">' +
      T_("闪存虚拟内存，防 OOM 但更慢") + "</div></span>" +
      '<input type="checkbox" style="width:20px;height:20px" ' +
      (meOn ? "checked" : "") + ' onchange="toggleMemExt(this.checked)"></label>';
    body.innerHTML = devLine + rows.join("") + meRow +
      '<div class="rec-note">' + (t.note || "") + "</div>";
  }

  /* 换模型后重渲染（模型感知推荐依赖当前模型；与 caps.js 的包装链式共存） */
  (function () {
    if (typeof window === "undefined") return;
    var omp = window.onModelPicked;
    if (typeof omp === "function" && !omp._recWrapped) {
      var wrapped = function (m) {
        var r = omp(m);
        try { renderRecommend(); } catch (e) {}
        return r;
      };
      wrapped._recWrapped = true;
      window.onModelPicked = wrapped;
    }
  })();

  /* 导出到全局 */
  var api = { findRecommend: findRecommend, applyRecommend: applyRecommend,
              renderRecommend: renderRecommend, toggleMemExt: toggleMemExt,
              memExtOn: memExtOn, TEMPLATES: TEMPLATES, CTX_TIERS: CTX_TIERS };
  if (typeof window !== "undefined") {
    window.findRecommend = findRecommend;
    window.applyRecommend = applyRecommend;
    window.renderRecommend = renderRecommend;
    window.toggleMemExt = toggleMemExt;
    window.memExtOn = memExtOn;
  }
  if (typeof globalThis !== "undefined") globalThis._recommend = api;
})();
