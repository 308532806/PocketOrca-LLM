#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""对最终（已签名）APK 做内容校验：NPU 补丁 / OpenCL 兼容 / 测速资产 / 打包结构。"""
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

# 2) OpenCL 旧驱动兼容补丁（libggml-opencl.so）
oc = z.read("lib/arm64-v8a/libggml-opencl.so")
assert oc[0xF19D:0xF19D + 15] == b"clCreateBuffer\x00", "opencl dynstr rename missing"
assert oc[0x331270:0x331274] == bytes.fromhex("1f2003d5"), "opencl callsite nop missing"
assert oc.count(b"clCreateBufferWithProperties") == 2, \
    "opencl: expected the name only in .debug_str/.strtab, got %d" % oc.count(b"clCreateBufferWithProperties")
print("OpenCL patch: dynstr rename + callsite nop ok")

# 3) 测速资产
assert "assets/bench.js" in names, "bench.js missing"
bench = z.read("assets/bench.js")
assert b"benchStart" in bench and b"BENCH_ENGINES" in bench
appjs = z.read("assets/app.js")
assert b"benchRunning" in appjs and b"1.4.0 fix" in appjs, "app.js fork edits missing"
idx = z.read("assets/index.html")
assert b"benchCard" in idx and b"bench.js" in idx, "index.html missing bench UI"
print("bench assets: app.js + index.html + bench.js ok")

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
