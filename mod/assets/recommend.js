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

  /* 匹配模板：返回 {tpl, device, fallback} */
  function findRecommend() {
    var w = readWelcome() || {};
    var soc = (w.soc || "").toLowerCase();
    var ram = w.ramGB || 0;
    for (var i = 0; i < TEMPLATES.length; i++) {
      var t = TEMPLATES[i];
      for (var j = 0; j < t.match.length; j++) {
        if (soc.indexOf(t.match[j]) >= 0) {
          return { tpl: t, device: w, fallback: false };
        }
      }
    }
    return { tpl: defaultTemplate(ram), device: w, fallback: true };
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
    body.innerHTML = devLine + rows.join("") +
      '<div class="rec-note">' + (t.note || "") + "</div>";
  }

  /* 导出到全局 */
  var api = { findRecommend: findRecommend, applyRecommend: applyRecommend,
              renderRecommend: renderRecommend, TEMPLATES: TEMPLATES };
  if (typeof window !== "undefined") {
    window.findRecommend = findRecommend;
    window.applyRecommend = applyRecommend;
    window.renderRecommend = renderRecommend;
  }
  if (typeof globalThis !== "undefined") globalThis._recommend = api;
})();
