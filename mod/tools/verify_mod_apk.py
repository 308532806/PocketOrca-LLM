#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""对最终（已签名）APK 做内容校验：NPU 补丁 / OpenCL 兼容(含 fix4) / 测速资产 / 打包结构。"""
import sys, zipfile, hashlib

apk = sys.argv[1]
z = zipfile.ZipFile(apk)
names = set(z.namelist())

# 1) NPU DMA64 补丁（libggml-hexagon.so 两处 strb wzr）
so = z.read("lib/arm64-v8a/libggml-hexagon.so")
for off in (0xC6544, 0xC997C):
    got = so[off:off + 4]
    assert got == bytes.fromhex("3f212b39"), "NPU patch missing @%#x: %s" % (off, got.hex())
print("NPU patch: 2/2 anchors patched")

# 2) OpenCL 兼容补丁（libggml-opencl.so，10 处：fix3 5 处 + fix4 5 处）
oc = z.read("lib/arm64-v8a/libggml-opencl.so")
assert oc[0xF19D:0xF19D + 15] == b"clCreateBuffer\x00", "opencl CL3 dynstr rename missing"
assert oc[0x331270:0x331274] == bytes.fromhex("1f2003d5"), "opencl CL3 callsite nop missing"
assert oc[0xF20C:0xF20C + 16] == b"clGetDeviceInfo\x00", "opencl CSG dynstr rename missing"
assert oc[0x3394AC:0x3394B0] == bytes.fromhex("20008052"), "opencl CSG call1 missing (mov w0,#1)"
assert oc[0x339560:0x339564] == bytes.fromhex("20008052"), "opencl CSG call2 missing (mov w0,#1)"
assert oc.count(b"clCreateBufferWithProperties") == 2, "CL3 name leftover != 2"
assert oc.count(b"clGetKernelSubGroupInfo") == 2, "CSG name leftover != 2"
assert oc[0x3405F4:0x3405F5] == bytes.fromhex("04"), "fix4 fatal flag not patched"
for off in (0x340640, 0x340660, 0x340680, 0x3406A0):
    assert oc[off:off + 4] == bytes.fromhex("1f2003d5"), "fix4 cbnz->nop missing @%#x" % off
h_oc = hashlib.sha256(oc).hexdigest()
assert h_oc == "ac6bb2091f331ad024cbbf3a587a7982a686389ee44916d31d93ff21444adb76", \
    "opencl fixed sha256 mismatch: %s" % h_oc
print("OpenCL patch: 10/10 points ok (CL3 + CSG + fix4); sha256 = device-verified")

# 3) 测速资产
assert "assets/bench.js" in names, "bench.js missing"
bench = z.read("assets/bench.js")
assert b"benchStart" in bench and b"BENCH_ENGINES" in bench
appjs = z.read("assets/app.js")
assert b"benchRunning" in appjs and b"1.4.0 fix" in appjs, "app.js fork edits missing"
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
print("bench assets: app.js + index.html + bench.js + recommend.js (fix6) ok")

# 4) 打包结构
arsc = [i for i in z.infolist() if i.filename == "resources.arsc"]
assert arsc and arsc[0].compress_type == 0, "resources.arsc must be stored"
libs = [n for n in names if n.startswith("lib/arm64-v8a/")]
assert len(libs) >= 35, "native libs count=%d" % len(libs)
assert "classes.dex" in names and "AndroidManifest.xml" in names
print("packaging: arsc stored, %d native libs, dex+manifest ok" % len(libs))

h = hashlib.sha256()
with open(apk, "rb") as f:
    for chunk in iter(lambda: f.read(1 << 20), b""):
        h.update(chunk)
print("APK verify ALL OK")
print("sha256:", h.hexdigest())
print("size:", __import__("os").path.getsize(apk), "bytes")
