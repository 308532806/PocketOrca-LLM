/* ============================================================
 * caps.js — 设备/模型能力检测与 UI 门控（fix10）
 *
 * 目标：不可用的引擎/模式自动屏蔽，不浪费一次启动的时间开销。
 *  - 设备能力：SoC → NPU（Hexagon HTP）可用性，纯查表，零运行时开销。
 *    数据源与 recommend.js 相同：localStorage["npullmWelcome"]（app.js 启动时写入）。
 *    NPU 可用 = 骁龙 8 Gen 2（HTP v73）/ 8 Gen 3（v75) / 8 Elite（v79）
 *             / 8 Elite Gen 5（v81）；其余（含 765G 等）一律视为无可用 NPU。
 *  - 模型能力：MTP 需要模型含 MTP 层；首次对某模型使用 MTP 即探测一次，
 *    结果按模型路径缓存在 localStorage["npullmModelCaps"]，之后直接门控。
 *
 * 门控点：engineSeg 按钮、benchPick chips（置灰 + 点击 toast 原因）；
 * 拦截点：setProfile / doStart（app.js 内守卫，防御）；benchNext（已知不
 * 支持直接跳过，不启动）；普通启动路径的 MTP 失败经 onServerState 记录。
 * 冒烟测试环境：无 document/localStorage 时核心函数仍可用（经 _caps 导出）。
 * ============================================================ */
(function () {
  "use strict";

  /* ---- SoC → NPU（子串匹配，小写；与 recommend.js 口径一致） ---- */
  var SOC_NPU = [
    ["sm8750", "8 elite gen 5", "8elite5"],
    ["sm8650", "8 elite"],
    ["sm8550", "8 gen 3", "8gen3"],
    ["sm8450", "8 gen 2", "8gen2"]
  ];

  function readWelcome() {
    try {
      var raw = null;
      if (typeof localStorage !== "undefined") raw = localStorage.getItem("npullmWelcome");
      if (!raw && typeof window !== "undefined" && window._welcomeInfo) raw = JSON.stringify(window._welcomeInfo);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  }

  /* 设备能力：{ npu: bool, known: bool, soc: string }
   * 无设备信息（桌面预览）→ npu:true，保持现状不影响预览；
   * 有 SoC 但不在名单 → npu:false，保守关闭，避免无效启动/崩溃。 */
  function deviceCaps() {
    var w = readWelcome() || {};
    var soc = (w.soc || "").toLowerCase();
    if (!soc) return { npu: true, known: false, soc: "" };
    for (var i = 0; i < SOC_NPU.length; i++) {
      var m = SOC_NPU[i];
      for (var j = 0; j < m.length; j++) {
        if (soc.indexOf(m[j]) >= 0) return { npu: true, known: true, soc: w.soc || "" };
      }
    }
    return { npu: false, known: true, soc: w.soc || "" };
  }

  /* ---- 模型能力缓存：path → { mtp: 1/-1, ts } ---- */
  var CAPS_KEY = "npullmModelCaps";
  var CAPS_MAX = 50;

  function readModelCaps() {
    try {
      if (typeof localStorage === "undefined") return {};
      return JSON.parse(localStorage.getItem(CAPS_KEY) || "{}") || {};
    } catch (e) { return {}; }
  }

  /* "yes" / "no" / "unknown" */
  function modelMtpState(path) {
    if (!path) return "unknown";
    var c = readModelCaps()[path];
    if (!c) return "unknown";
    return c.mtp === 1 ? "yes" : (c.mtp === -1 ? "no" : "unknown");
  }

  function recordModelMtp(path, ok) {
    if (!path || typeof localStorage === "undefined") return;
    try {
      var all = readModelCaps();
      all[path] = { mtp: ok ? 1 : -1, ts: Date.now() };
      var keys = Object.keys(all);
      if (keys.length > CAPS_MAX) {
        keys.sort(function (a, b) { return (all[a].ts || 0) - (all[b].ts || 0); });
        for (var i = 0; i < keys.length - CAPS_MAX; i++) delete all[keys[i]];
      }
      localStorage.setItem(CAPS_KEY, JSON.stringify(all));
    } catch (e) {}
    applyCapsUI();
  }

  /* 当前日志是否含"MTP 层缺失"特征（与 bench.js 的 benchFailReason 同源） */
  function mtpLogHasNoMtp() {
    try {
      var b = (typeof bridge === "function") ? bridge("getLog") : null;
      var log = b || "";
      return log.indexOf("doesn't contain MTP layers") >= 0 ||
             log.indexOf("failed to create MTP context") >= 0;
    } catch (e) { return false; }
  }

  function T_(s) { return (typeof T === "function") ? T(s) : s; }
  function modelPath() {
    try { return (typeof model !== "undefined" && model && model.path) || ""; }
    catch (e) { return ""; }
  }

  /* 引擎是否可用：{ ok, reason }。pid 与 engineSeg/benchPick 的取值一致。 */
  function engineAllowed(pid, mpath) {
    var dev = deviceCaps();
    if (pid === "htp") {
      if (!dev.npu) return { ok: false, reason: T_("本机无可用 NPU，已自动屏蔽") };
      return { ok: true, reason: "" };
    }
    if (pid === "mtp") {
      if (!dev.npu) return { ok: false, reason: T_("本机无可用 NPU，MTP 不可用") };
      if (modelMtpState(mpath || modelPath()) === "no")
        return { ok: false, reason: T_("当前模型不含 MTP 层，已自动屏蔽") };
      return { ok: true, reason: "" };
    }
    return { ok: true, reason: "" };
  }

  /* ---- UI 门控：置灰不可用项（保留点击 → setProfile 守卫 toast 原因） ---- */
  function applyCapsUI() {
    if (typeof document === "undefined") return;
    var inBench = (typeof benchRunning !== "undefined" && benchRunning);
    var mp = modelPath();
    var seg = document.getElementById("engineSeg");
    if (seg && seg.querySelectorAll) {
      var btns = seg.querySelectorAll("button[data-profile]");
      for (var i = 0; i < btns.length; i++) {
        var p = btns[i].getAttribute("data-profile");
        var chk = engineAllowed(p, mp);
        if (btns[i].classList) btns[i].classList.toggle("unavail", !chk.ok);
        try { btns[i].setAttribute("title", chk.ok ? "" : chk.reason); } catch (e) {}
      }
    }
    if (inBench) return; // 测速中不碰 chips，避免改写 benchQueue
    var box = document.getElementById("benchPick");
    if (box && box.querySelectorAll) {
      var chips = box.querySelectorAll(".chip[data-bench]");
      var changed = false;
      for (var j = 0; j < chips.length; j++) {
        var b = chips[j].getAttribute("data-bench");
        var c = engineAllowed(b, mp);
        if (chips[j].classList) chips[j].classList.toggle("unavail", !c.ok);
        if (!c.ok && chips[j].classList.contains("on")) {
          chips[j].classList.remove("on");
          changed = true;
        }
      }
      if (changed && typeof benchApplySel === "function" && typeof benchReadPicks === "function") {
        try { benchApplySel(benchReadPicks()); } catch (e) {}
      }
    }
  }

  /* ---- 回调织入（app.js 已加载完成后执行） ---- */
  (function () {
    if (typeof window === "undefined") return;
    // MTP 探测：在普通启动路径上记录失败（bench 路径由 benchPut 记录）
    var oss = window.onServerState;
    if (typeof oss === "function") {
      window.onServerState = function (st, msg) {
        try {
          var pid = (typeof profileId !== "undefined") ? profileId : "";
          if (st === "error" && pid === "mtp" && mtpLogHasNoMtp()) {
            var mp = modelPath();
            if (mp) recordModelMtp(mp, false);
          }
        } catch (e) {}
        return oss(st, msg);
      };
    }
    // 换模型后重新门控（MTP 缓存按模型路径）
    var omp = window.onModelPicked;
    if (typeof omp === "function") {
      window.onModelPicked = function (m) {
        var r = omp(m);
        try { applyCapsUI(); } catch (e) {}
        return r;
      };
    }
  })();

  /* 导出 */
  if (typeof window !== "undefined") {
    window.deviceCaps = deviceCaps;
    window.modelMtpState = modelMtpState;
    window.recordModelMtp = recordModelMtp;
    window.mtpLogHasNoMtp = mtpLogHasNoMtp;
    window.engineAllowed = engineAllowed;
    window.applyCapsUI = applyCapsUI;
  }
  if (typeof globalThis !== "undefined") {
    globalThis._caps = { deviceCaps: deviceCaps, modelMtpState: modelMtpState,
      recordModelMtp: recordModelMtp, mtpLogHasNoMtp: mtpLogHasNoMtp,
      engineAllowed: engineAllowed, applyCapsUI: applyCapsUI };
  }

  /* 脚本加载即应用一次（app.js 的初始化链已在之前执行完） */
  try {
    applyCapsUI();
    // 启动时：若恢复的引擎不可用，静默回退（setProfile 的 t 参数即静默位）
    var cur = (typeof profileId !== "undefined") ? profileId : "";
    if (cur && !engineAllowed(cur).ok && typeof setProfile === "function") {
      var fb = deviceCaps().npu ? "htp" : "cpu";
      if (cur !== fb) setProfile(fb, true);
    }
  } catch (e) {}
})();
