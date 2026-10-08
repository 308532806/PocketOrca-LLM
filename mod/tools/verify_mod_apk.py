#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""对最终（已签名）APK 做内容校验：NPU 补丁 / OpenCL 兼容(含 fix4) / 测速资产 / 打包结构。"""
import sys, zipfile, hashlib

apk = sys.argv[1]
z = zipfile.ZipFile(apk)
names = set(z.namelist())

# 1) NPU DMA64 补丁（libggml-hexagon.so 两处 strb wzr）
so = z.read("lib/arm64-v8a/libggml-hexagon.so")
for off in (0xC89F0, 0xCBE28):
    got = so[off:off + 4]
    assert got == bytes.fromhex("3fe13d39"), "NPU patch missing @%#x: %s" % (off, got.hex())
print("NPU patch: 2/2 anchors patched")

# 2) OpenCL 兼容补丁（libggml-opencl.so，10 处：fix3 5 处 + fix4 5 处）
oc = z.read("lib/arm64-v8a/libggml-opencl.so")
assert oc[0xF19D:0xF19D + 15] == b"clCreateBuffer\x00", "opencl CL3 dynstr rename missing"
assert oc[0x338204:0x338208] == bytes.fromhex("1f2003d5"), "opencl CL3 callsite nop missing"
assert oc[0xF20C:0xF20C + 16] == b"clGetDeviceInfo\x00", "opencl CSG dynstr rename missing"
assert oc[0x340440:0x340444] == bytes.fromhex("20008052"), "opencl CSG call1 missing (mov w0,#1)"
assert oc[0x3404F4:0x3404F8] == bytes.fromhex("20008052"), "opencl CSG call2 missing (mov w0,#1)"
assert oc.count(b"clCreateBufferWithProperties") == 2, "CL3 name leftover != 2"
assert oc.count(b"clGetKernelSubGroupInfo") == 2, "CSG name leftover != 2"
assert oc[0x3477F4:0x3477F5] == bytes.fromhex("04"), "fix4 fatal flag not patched"
for off in (0x347840, 0x347860, 0x347880, 0x3478A0):
    assert oc[off:off + 4] == bytes.fromhex("1f2003d5"), "fix4 cbnz->nop missing @%#x" % off
h_oc = hashlib.sha256(oc).hexdigest()
assert h_oc == "6782023fe7fc7aeb9b41eac3187571011685460c156f2eb9fb0700308734ec21", \
    "opencl fixed sha256 mismatch: %s" % h_oc
print("OpenCL patch: 10/10 points ok (CL3 + CSG + fix4); sha256 = device-verified")

# 3) 测速资产
assert "assets/bench.js" in names, "bench.js missing"
bench = z.read("assets/bench.js")
assert b"benchStart" in bench and b"BENCH_ENGINES" in bench
appjs = z.read("assets/app.js")
assert b"benchRunning" in appjs and b"1.4.1 fix" in appjs, "app.js fork edits missing"
assert b"_sp.classList.toggle" in appjs, "statusPill fix missing"
idx = z.read("assets/index.html")
assert b"benchCard" in idx and b"bench.js" in idx, "index.html missing bench UI"
# fix6: recommend.js
rec = z.read("assets/recommend.js")
assert b"findRecommend" in rec and b"applyRecommend" in rec, "recommend.js missing core functions"
assert b'recommend.js' in idx and b'recCard' in idx, "index.html missing recommend UI"
assert b'npullmWelcome' in appjs, "app.js missing welcome cache for recommend"
# fix5: 自选测速 chips / 日志轮询优化 / 指示灯移除
assert b'id="benchPick"' in idx, "index.html missing bench engine picker (fix5)"
assert b'id="stateDot"' not in idx, "stateDot should be removed (fix5)"
assert b'pageLogs' in appjs and b'classList.contains("active")' in appjs, \
    "log polling visibility optimization missing (fix5)"
assert b'benchQueue' in bench and b'npullmBenchSel' in bench, "bench.js self-select missing (fix5)"
assert b'"mtp"' in bench and b'data-bench="mtp"' in idx, "fix8: MTP bench engine missing"
# fix9: 跟随滚动 / 键盘遮挡 / MTP 失败原因细化（CI 门禁必须覆盖新修改点）
assert b'chatFollowBtn' in idx and b'chatFollow' in appjs, "fix9: chat follow-scroll missing"
assert b'interactive-widget=resizes-content' in idx, "fix9: keyboard viewport fix missing"
assert b'visualViewport' in appjs, "fix9: keyboard visualViewport fallback missing"
assert b'benchFailReason' in bench, "fix9: MTP fail reason missing"
assert b'1.4.1 fix8' not in idx, "stale hardcoded version string in index.html"
assert b'$("verLine")' in appjs, "verLine not filled from APP_VER"
print("bench assets: app.js + index.html + bench.js + recommend.js (fix6) ok")
print("fix9 assets: follow-scroll + keyboard + mtp reason + verLine ok")

# 4) 打包结构
arsc = [i for i in z.infolist() if i.filename == "resources.arsc"]
assert arsc and arsc[0].compress_type == 0, "resources.arsc must be stored"
libs = [n for n in names if n.startswith("lib/arm64-v8a/")]
assert len(libs) >= 27, "native libs count=%d" % len(libs)  # 1.4.1 精简后 27 个
assert "classes.dex" in names and "AndroidManifest.xml" in names
print("packaging: arsc stored, %d native libs, dex+manifest ok" % len(libs))

h = hashlib.sha256()
with open(apk, "rb") as f:
    for chunk in iter(lambda: f.read(1 << 20), b""):
        h.update(chunk)
print("APK verify ALL OK")
print("sha256:", h.hexdigest())
print("size:", __import__("os").path.getsize(apk), "bytes")
