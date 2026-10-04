#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PocketOrca-LLM v1.4.0 修复包构建（APK surgery，不重编 dex）

在官方 PocketOrca-LLM-v1.4.0-release.apk 上：
  1. 给 lib/arm64-v8a/libggml-hexagon.so 打 2 处字节补丁，
     把 opt_dma64 强制置 0 —— 修复 HTP arch > 79（骁龙 8 Elite Gen 5 等）
     新机型上 fastrpc_mmap(DMA64 扩展映射) 失败导致的 NPU 启动崩溃
     (issue #1, exit 134)。两个锚点必须精确匹配，否则构建失败。
  2. 替换 assets/app.js、assets/index.html，新增 assets/bench.js ——
     加入"当前模型 NPU/GPU/CPU 三引擎测速"功能。
  3. 去掉旧签名（META-INF/*），输出未签名 APK（随后由 zipalign + apksigner 处理）。

用法: python3 build_mod.py <official_v1.4.0.apk> <mod_dir> <out_apk>
"""
import sys, os, zipfile, hashlib

EXPECT_SHA256 = "14885aadb8d38aee9fc3ebc9fc393f148788901a2d63cdc082ff8ac5008e5478"
SO_ENTRY = "lib/arm64-v8a/libggml-hexagon.so"
# (文件偏移 -> (原字节, 补丁字节))  strb w8,[x9,#2760] -> strb wzr,[x9,#2760]
PATCHES = {
    0xC6544: (bytes.fromhex("28212b39"), bytes.fromhex("3f212b39")),
    0xC997C: (bytes.fromhex("28212b39"), bytes.fromhex("3f212b39")),
}
REPLACE_ASSETS = [
    "assets/app.js",
    "assets/index.html",
    "assets/bench.js",   # 新增条目
]

def main():
    official, moddir, out = sys.argv[1], sys.argv[2], sys.argv[3]

    h = hashlib.sha256()
    with open(official, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    digest = h.hexdigest()
    assert digest == EXPECT_SHA256, "source APK sha256 mismatch: %s" % digest
    print("source apk ok:", digest)

    repl = {}
    for a in REPLACE_ASSETS:
        p = os.path.join(moddir, a)
        with open(p, "rb") as f:
            repl[a] = f.read()
        print("mod asset:", a, len(repl[a]), "bytes")

    zin = zipfile.ZipFile(official)
    existing = set(it.filename for it in zin.infolist())
    new_assets = [a for a in REPLACE_ASSETS if a not in existing]
    kept = patched = replaced = skipped_sig = 0
    with zipfile.ZipFile(out, "w") as zout:
        for it in zin.infolist():
            name = it.filename
            if name.startswith("META-INF/"):
                skipped_sig += 1
                continue
            if name in repl:
                data = repl[name]
                replaced += 1
            elif name == SO_ENTRY:
                buf = bytearray(zin.read(name))
                for off, (old, new) in PATCHES.items():
                    cur = bytes(buf[off:off + 4])
                    assert cur == old, "anchor mismatch @%#x: %s" % (off, cur.hex())
                    buf[off:off + 4] = new
                data = bytes(buf)
                patched += 1
                print("patched:", name, "offsets", ", ".join("%#x" % o for o in PATCHES))
            else:
                data = zin.read(name)
                kept += 1
            zi = zipfile.ZipInfo(name, date_time=it.date_time)
            zi.compress_type = it.compress_type
            zi.external_attr = it.external_attr
            zi.internal_attr = it.internal_attr
            zi.create_system = it.create_system
            zout.writestr(zi, data)
        # 原 APK 中不存在的新增条目（bench.js）
        for a in new_assets:
            zi = zipfile.ZipInfo(a)
            zi.compress_type = zipfile.ZIP_DEFLATED
            zout.writestr(zi, repl[a])
            replaced += 1
            print("added:", a)

    assert replaced == len(REPLACE_ASSETS), "asset replace count %d" % replaced
    assert patched == 1, "so patch count %d" % patched

    # 从产物回读校验
    z2 = zipfile.ZipFile(out)
    so = z2.read(SO_ENTRY)
    for off, (old, new) in PATCHES.items():
        assert so[off:off + 4] == new, "verify failed @%#x" % off
    assert z2.read("assets/bench.js").find(b"benchStart") >= 0
    arsc = [i for i in z2.infolist() if i.filename == "resources.arsc"][0]
    assert arsc.compress_type == 0, "resources.arsc must stay stored"

    size = os.path.getsize(out)
    print("repacked: %s (%d bytes), kept=%d replaced=%d patched=%d sig_removed=%d"
          % (out, size, kept, replaced, patched, skipped_sig))
    print("verify: patched bytes + bench.js + stored arsc  OK")

if __name__ == "__main__":
    main()
