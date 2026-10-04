# -*- coding: utf-8 -*-
"""对 v1.4.0 官方 app.js（beautified 版）应用全部 fork 修改 → 生成当前版本。

用途：留档/复现全部修改（8 处），并可用于一致性校验：
    python3 patch_appjs.py <原始_beautified.js> <输出.js>
    diff 输出.js mod/assets/app.js   # 应完全一致
"""
import io, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else 'work/apkapp.beauty.js'
DST = sys.argv[2] if len(sys.argv) > 2 else '/tmp/appjs-regen.js'
s = io.open(SRC, encoding='utf-8').read()
changes = 0


def rep(old, new, tag):
    global s, changes
    n = s.count(old)
    assert n == 1, '[%s] anchor count=%d' % (tag, n)
    s = s.replace(old, new, 1)
    changes += 1
    print('ok:', tag)


TW_ADD = '''      "引擎测速": "引擎測速",
      "当前模型 · NPU/GPU/CPU 依次实测": "目前模型 · NPU/GPU/CPU 依序實測",
      "会短暂停止当前服务并逐一切换引擎，完成自动恢复": "會短暫停止目前服務並逐一切換引擎，完成後自動恢復",
      "开始测速": "開始測速",
      "停止测速": "停止測速",
      "测速进行中，请稍候": "測速進行中，請稍候",
      "准备中…": "準備中…",
      "等待中": "等待中",
      "启动中": "啟動中",
      "预热中…": "預熱中…",
      "测量中…": "測量中…",
      "启动失败": "啟動失敗",
      "启动超时": "啟動逾時",
      "请求失败": "請求失敗",
      "无 timings 数据": "無 timings 資料",
      "BigMoE 模型不支持测速": "BigMoE 模型不支援測速",
      "测速完成": "測速完成",
      "最快": "最快",
      "全部失败": "全部失敗",
      "已取消": "已取消",
      "加载": "載入",
      " · 已恢复原引擎": " · 已恢復原引擎",'''

EN_ADD = '''      "引擎测速": "Engine speed test",
      "当前模型 · NPU/GPU/CPU 依次实测": "Current model · NPU / GPU / CPU measured in turn",
      "会短暂停止当前服务并逐一切换引擎，完成自动恢复": "Temporarily stops the server and switches engines; restores it when done",
      "开始测速": "Run speed test",
      "停止测速": "Stop test",
      "测速进行中，请稍候": "Speed test running — please wait",
      "准备中…": "Preparing…",
      "等待中": "Waiting",
      "启动中": "Starting",
      "预热中…": "Warming up…",
      "测量中…": "Measuring…",
      "启动失败": "Start failed",
      "启动超时": "Start timed out",
      "请求失败": "Request failed",
      "无 timings 数据": "No timings in response",
      "BigMoE 模型不支持测速": "Speed test is unavailable for BigMoE models",
      "测速完成": "Speed test done",
      "最快": "fastest",
      "全部失败": "all engines failed",
      "已取消": "Cancelled",
      "加载": "load",
      " · 已恢复原引擎": " · previous engine restored",'''

# 1-2. i18n 词条（zh-TW / en）
rep('''      "关闭": "關閉",
      "KV 卸载（省内存/速度权衡）": "KV 卸載（省記憶體/速度權衡）",''',
    '''      "关闭": "關閉",
''' + TW_ADD + '''
      "KV 卸载（省内存/速度权衡）": "KV 卸載（省記憶體/速度權衡）",''', 'i18n-zh-TW')

rep('''      "关闭": "Off",
      "KV 卸载（省内存/速度权衡）": "KV offload (RAM/speed tradeoff)",''',
    '''      "关闭": "Off",
''' + EN_ADD + '''
      "KV 卸载（省内存/速度权衡）": "KV offload (RAM/speed tradeoff)",''', 'i18n-en')

# 3. 版本号
rep('  APP_VER = "1.4.0";',
    '  APP_VER = "1.4.0 fix3";', 'APP_VER')

# 4. benchRunning 声明（fix1）
rep('var lastSnap = "";',
    '''var lastSnap = "";
/* fork add-on: 引擎测速状态（实现见 bench.js） */
var benchRunning = false;''', 'benchRunning-decl')

# 5. onMainButton guard（fix1）
rep('''function onMainButton() {
  if ("running" !== state)''',
    '''function onMainButton() {
  if (benchRunning) { toastT("测速进行中，请稍候"); return; }
  if ("running" !== state)''', 'guard-main')

# 6. pillToggle guard（fix1）
rep('''function pillToggle() {
  "running" !== state''',
    '''function pillToggle() {
  if (benchRunning) { toastT("测速进行中，请稍候"); return; }
  "running" !== state''', 'guard-pill')

# 7. setProfile guard（fix1）
rep('''function setProfile(e, t) {
  if (_bmoeOn || "bmoe" !== e) {''',
    '''function setProfile(e, t) {
  if (benchRunning) return;
  if (_bmoeOn || "bmoe" !== e) {''', 'guard-profile')

# 8. setState 同步 statusPill 样式类（fix3 — 修复开关滑块不动）
rep('''function setState(e, t) {
  state = e, $("stateDot").className = "ready" === e ? "" : e, $("stateMsg").textContent = t || "";''',
    '''function setState(e, t) {
  state = e, $("stateDot").className = "ready" === e ? "" : e, $("stateMsg").textContent = t || "";
  var _sp = $("statusPill");
  _sp && (_sp.classList.toggle("running", "running" === e), _sp.classList.toggle("starting", "starting" === e));''', 'setState-statusPill')

io.open(DST, 'w', encoding='utf-8').write(s)
print('---- all %d edits applied -> %s (%d bytes) ----' % (changes, DST, len(s.encode('utf-8'))))
