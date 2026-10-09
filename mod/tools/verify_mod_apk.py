#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""对最终（已签名）APK 做内容校验：v1.4.2 基座 + 我们的 assets 改动 + 打包结构。

注：v1.4.1 时代的 .so 字节补丁已在 v1.4.2 退役（上游自行修复了 DMA64 与
OpenCL 符号问题），本脚本不再校验 .so 补丁点。
"""
import sys, zipfile, hashlib

apk = sys.argv[1]
z = zipfile.ZipFile(apk)
names = set(z.namelist())

# 1) 基座版本
appjs = z.read("assets/app.js")
assert b"1.4.2 fix1" in appjs, "APP_VER not 1.4.2 fix1"
print("base: v1.4.2 fix1")

# 2) v1.4.2 上游多模态/会话 Web 层移植
assert b"chatAttachBar" in appjs, "v1.4.2: chatAttachBar missing"
assert b"onChatAttached" in appjs and b"onChatRecStopped" in appjs, "v1.4.2: multimodal callbacks missing"
assert b"onSlotSaved" in appjs and b"onSlotHistLoaded" in appjs, "v1.4.2: session callbacks missing"
assert b"chatHistSave" in appjs and b"npullmChatHist" in appjs, "v1.4.2: chat history persistence missing"
assert b"chatStaged" in appjs and b"chatSlotFile" in appjs, "v1.4.2: attach state missing"
idx = z.read("assets/index.html")
assert b'id="btnChatAttach"' in idx, "v1.4.2: attach button missing"
assert b'id="chatAttachBar"' in idx, "v1.4.2: attach bar missing"
assert b"chat-attach-chip" in idx, "v1.4.2: attach chip CSS missing"
print("v1.4.2 assets: multimodal + session web layer ok")

# 3) 我们的历史改动（fix9~fix13，rebase 到 v1.4.2）
bench = z.read("assets/bench.js")
assert b"benchStart" in bench and b"BENCH_ENGINES" in bench
assert b"benchRunning" in appjs, "app.js fork edits missing"
assert b"benchCard" in idx and b"bench.js" in idx, "index.html missing bench UI"
rec = z.read("assets/recommend.js")
assert b"findRecommend" in rec and b"applyRecommend" in rec, "recommend.js missing core functions"
assert b"npullmMemExt" in rec and b"toggleMemExt" in rec, "recommend.js memext toggle missing"
assert b"CTX_TIERS" in rec, "recommend.js model-aware ctx tiers missing"
assert b'recommend.js' in idx and b'recCard' in idx, "index.html missing recommend UI"
assert b'npullmWelcome' in appjs, "app.js missing welcome cache for recommend"
assert b'id="benchPick"' in idx, "index.html missing bench engine picker (fix5)"
assert b'id="stateDot"' not in idx, "stateDot should be removed (fix5)"
assert b'"mtp"' in bench and b'data-bench="mtp"' in idx, "fix8: MTP bench engine missing"
assert b'chatFollowBtn' in idx and b'chatFollow' in appjs, "fix9: chat follow-scroll missing"
assert b'interactive-widget=resizes-content' in idx, "fix9: keyboard viewport fix missing"
assert b'visualViewport' in appjs, "fix9: keyboard visualViewport fallback missing"
assert b'benchFailReason' in bench, "fix9: MTP fail reason missing"
assert b'$("verLine")' in appjs, "verLine not filled from APP_VER"
assert b"mdRender" in appjs and b"chatMdApply" in appjs, "fix12: chat markdown missing"
assert b"chatClearAsk" in appjs and b"doChatClear" in appjs, "fix12: chat clear missing"
assert b"api.github.com/repos/308532806/PocketOrca-LLM/releases" in appjs, "fix12: checkUpdate API missing"
assert b"toastAct" in appjs and b"goTab" in appjs, "fix12: actionable toast / goTab missing"
assert b'id="btnChatClear"' in idx, "fix12: chat clear button missing"
assert b"cblock" in idx, "fix12: markdown code block CSS missing"
print("fix9~fix12 assets: bench + recommend + markdown + chat clear + toast/ui ok")
caps = z.read("assets/caps.js")
assert b"deviceCaps" in caps and b"engineAllowed" in caps and b"recordModelMtp" in caps, \
    "caps.js missing core functions"
assert b"engineAllowed" in appjs, "app.js setProfile/doStart caps guard missing"
assert b'<script src="caps.js">' in idx, "index.html missing caps.js script"
assert b"unavail" in idx, "index.html missing unavail style"
assert b'"sm8850"' in caps and b'"sm8750"' in caps and b'"sm8650"' in caps and b'"sm8550"' in caps, \
    "fix13: caps.js SOC_NPU has wrong SoC numbers"
assert b'"sm8850"' in rec and b'"sm8450"' not in rec, \
    "fix13: recommend.js TEMPLATES has wrong SoC numbers"
print("fix10/fix13 assets: caps.js + guards + gating + SoC numbers ok")

# 4) 打包结构
arsc = [i for i in z.infolist() if i.filename == "resources.arsc"]
assert arsc and arsc[0].compress_type == 0, "resources.arsc must be stored"
libs = [n for n in names if n.startswith("lib/arm64-v8a/")]
assert len(libs) >= 27, "native libs count=%d" % len(libs)
assert "lib/arm64-v8a/libmtmd.so" in names, "v1.4.2 libmtmd.so (multimodal) missing"
assert "classes.dex" in names and "AndroidManifest.xml" in names
print("packaging: arsc stored, %d native libs (incl. libmtmd.so), dex+manifest ok" % len(libs))

h = hashlib.sha256()
with open(apk, "rb") as f:
    for chunk in iter(lambda: f.read(1 << 20), b""):
        h.update(chunk)
print("APK verify ALL OK")
print("sha256:", h.hexdigest())
print("size:", __import__("os").path.getsize(apk), "bytes")
