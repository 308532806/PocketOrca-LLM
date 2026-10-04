#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PocketOrca-LLM v1.4.0 修复包构建（APK surgery，不重编 dex）

基线：官方 PocketOrca-LLM-v1.4.0-release.apk

修改清单：
 1) libggml-hexagon.so — NPU(HTP) 启动崩溃修复（issue #1）
      DMA64 扩展映射与内置旧 libcdsprpc.so 不兼容 → fastrpc_mmap 0xe → exit 134。
      0xC6544 / 0xC997C:  strb w8 -> strb wzr  (opt_dma64 = 0)
 2) libggml-opencl.so — 旧 Adreno 驱动兼容（缺 OpenCL 3.0 / 2.1 符号）
      该库因 BIND_NOW 在加载期解析全部符号；旧驱动不导出
      clCreateBufferWithProperties（CL3.0）与 clGetKernelSubGroupInfo（CL2.1）。
      a) dynstr @0xF19D: clCreateBufferWithProperties -> clCreateBuffer（等长 29B）
         callsite @0x331270: bl -> nop
         （该调用仅属于 GGML_OPENCL_ADRENO_USE_LARGE_BUFFER 默认关闭的实验路径）
      b) dynstr @0xF20C: clGetKernelSubGroupInfo -> clGetDeviceInfo（等长 24B，占位；
         调用点已短路，不会真的调用）
         callsites @0x3394AC / @0x339560: bl -> mov w0,#1
         （= 查询返回失败 → 走 llama.cpp 既有降级：禁用两个 mamba2 专用
            subgroup kernel；老驱动本就不具备该查询能力）
       c) fix4: flash_attn_repack kernel 编译失败降级（旧驱动缺 cl_khr_3d_image_writes）
          repack 构建调用原为 fatal=true：编译失败 → exit(1)；JNI 进程内运行
          导致整个 App 闪退（真机 EXIT_SELF 实证）。修复：
            @0x3405F4: fatal 参数 1 -> 0（编译失败返回 nullptr 不再退出）
            @0x340640/0x340660/0x340680/0x3406A0: 4 处 CL_CHECK 失败跳转 cbnz -> nop
          （wmm prefill 路径在本包不可达：Adreno bin 内核库不随包分发，
            use_fa_bin_kernels_prefill 恒 false；4 个句柄保持 NULL 无任何使用）
 3) assets/app.js、index.html 替换；assets/bench.js 新增（三引擎测速）

用法: python3 build_mod.py <official_v1.4.0.apk> <mod_dir> <out_apk>
"""
import sys, os, zipfile, hashlib

EXPECT_APK_SHA256 = "14885aadb8d38aee9fc3ebc9fc393f148788901a2d63cdc082ff8ac5008e5478"

HEXAGON = "lib/arm64-v8a/libggml-hexagon.so"
OPENCL = "lib/arm64-v8a/libggml-opencl.so"

EXPECT_HEXAGON_SHA256 = "c781bb1834dadf0bbfd42bf2f817fef5520de7e9be70b378585a2599df0a7596"
EXPECT_OPENCL_SHA256 = "401d5b32bc160b7971c5319323d3f02be1b460b4a462ccdbe49b2b49324516e5"

# --- libggml-hexagon.so: (文件偏移 -> (原字节, 补丁字节)) ---
HEXAGON_ANCHORS = {
    0xC6544: (bytes.fromhex("28212b39"), bytes.fromhex("3f212b39")),
    0xC997C: (bytes.fromhex("28212b39"), bytes.fromhex("3f212b39")),
}

# --- libggml-opencl.so 补丁点（全部为文件偏移） ---
CL3_DYNSTR_OFF  = 0xF19D     # clCreateBufferWithProperties -> clCreateBuffer
CL3_CALLSITE_OFF = 0x331270  # bl -> nop
CSG_DYNSTR_OFF  = 0xF20C     # clGetKernelSubGroupInfo -> clGetDeviceInfo
CSG_CALL1_OFF   = 0x3394AC   # bl -> mov w0,#1
CSG_CALL2_OFF   = 0x339560   # bl -> mov w0,#1

CL3_NAME_OLD = b"clCreateBufferWithProperties\x00"        # 29 bytes
CL3_NAME_NEW = b"clCreateBuffer\x00" + b"\x00" * 14       # 29 bytes（等长）
CSG_NAME_OLD = b"clGetKernelSubGroupInfo\x00"             # 24 bytes
CSG_NAME_NEW = b"clGetDeviceInfo\x00" + b"\x00" * 8       # 24 bytes（等长）

CL3_CALL_OLD = bytes.fromhex("00fd0094")   # bl clCreateBufferWithProperties@plt
CL3_CALL_NEW = bytes.fromhex("1f2003d5")   # nop
CSG_CALL1_OLD = bytes.fromhex("85dc0094")  # bl clGetKernelSubGroupInfo@plt
CSG_CALL2_OLD = bytes.fromhex("58dc0094")
CSG_CALL_NEW = bytes.fromhex("20008052")   # mov w0, #1  (非 CL_SUCCESS)

# fix4: repack 编译失败降级（fatal=1 -> 0；4 处 CL_CHECK 失败跳转 -> nop）
FIX4_PATCH_SET = [
    (0x3405F4, bytes.fromhex("24"),       bytes.fromhex("04"),       "fatal flag"),
    (0x340640, bytes.fromhex("e3ab0535"), bytes.fromhex("1f2003d5"), "cbnz->nop #1"),
    (0x340660, bytes.fromhex("a3ad0535"), bytes.fromhex("1f2003d5"), "cbnz->nop #2"),
    (0x340680, bytes.fromhex("63af0535"), bytes.fromhex("1f2003d5"), "cbnz->nop #3"),
    (0x3406A0, bytes.fromhex("23b10535"), bytes.fromhex("1f2003d5"), "cbnz->nop #4"),
]
EXPECT_FIXED_OPENCL_SHA256 = "ac6bb2091f331ad024cbbf3a587a7982a686389ee44916d31d93ff21444adb76"

REPLACE_ASSETS = ["assets/app.js", "assets/index.html", "assets/bench.js"]


def sha256_file(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def patch_hexagon(data):
    assert hashlib.sha256(data).hexdigest() == EXPECT_HEXAGON_SHA256, "hexagon .so sha256 mismatch"
    buf = bytearray(data)
    for off, (old, new) in HEXAGON_ANCHORS.items():
        cur = bytes(buf[off:off + 4])
        assert cur == old, "[hexagon] anchor mismatch @%#x: %s" % (off, cur.hex())
        buf[off:off + 4] = new
    return bytes(buf)


def patch_opencl(data):
    assert hashlib.sha256(data).hexdigest() == EXPECT_OPENCL_SHA256, "opencl .so sha256 mismatch"
    d = bytearray(data)

    # a1) dynstr 改名（仅 dynstr 一处；等长，不影响后续字符串）
    cur = bytes(d[CL3_DYNSTR_OFF:CL3_DYNSTR_OFF + len(CL3_NAME_OLD)])
    assert cur == CL3_NAME_OLD, "[opencl] CL3 dynstr anchor mismatch @%#x: %r" % (CL3_DYNSTR_OFF, cur)
    d[CL3_DYNSTR_OFF:CL3_DYNSTR_OFF + len(CL3_NAME_OLD)] = CL3_NAME_NEW
    assert bytes(d).count(b"clCreateBufferWithProperties") == 2, "[opencl] CL3 leftover != 2"
    # a2) 调用点 -> nop
    cur = bytes(d[CL3_CALLSITE_OFF:CL3_CALLSITE_OFF + 4])
    assert cur == CL3_CALL_OLD, "[opencl] CL3 callsite mismatch @%#x: %s" % (CL3_CALLSITE_OFF, cur.hex())
    d[CL3_CALLSITE_OFF:CL3_CALLSITE_OFF + 4] = CL3_CALL_NEW

    # b1) dynstr 改名（占位名；调用点已短路）
    cur = bytes(d[CSG_DYNSTR_OFF:CSG_DYNSTR_OFF + len(CSG_NAME_OLD)])
    assert cur == CSG_NAME_OLD, "[opencl] CSG dynstr anchor mismatch @%#x: %r" % (CSG_DYNSTR_OFF, cur)
    d[CSG_DYNSTR_OFF:CSG_DYNSTR_OFF + len(CSG_NAME_OLD)] = CSG_NAME_NEW
    assert bytes(d).count(b"clGetKernelSubGroupInfo") == 2, "[opencl] CSG leftover != 2"
    # b2) 两个调用点 -> mov w0,#1（返回失败 → 既有降级路径）
    for off, old in ((CSG_CALL1_OFF, CSG_CALL1_OLD), (CSG_CALL2_OFF, CSG_CALL2_OLD)):
        cur = bytes(d[off:off + 4])
        assert cur == old, "[opencl] CSG callsite mismatch @%#x: %s" % (off, cur.hex())
        d[off:off + 4] = CSG_CALL_NEW

    # c) fix4: repack 编译失败降级
    for off, old, new, tag in FIX4_PATCH_SET:
        cur = bytes(d[off:off + len(old)])
        assert cur == old, "[opencl] FIX4 %s mismatch @%#x: %s" % (tag, off, cur.hex())
        d[off:off + len(new)] = new
    out = bytes(d)
    assert hashlib.sha256(out).hexdigest() == EXPECT_FIXED_OPENCL_SHA256, \
        "opencl fixed sha256 mismatch (must equal device-verified build)"
    return out


def main():
    official, moddir, out = sys.argv[1], sys.argv[2], sys.argv[3]
    digest = sha256_file(official)
    assert digest == EXPECT_APK_SHA256, "source APK sha256 mismatch: %s" % digest
    print("source apk ok:", digest)

    repl = {}
    for a in REPLACE_ASSETS:
        with open(os.path.join(moddir, a), "rb") as f:
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
            elif name == HEXAGON:
                data = patch_hexagon(zin.read(name))
                patched += 1
                print("patched: hexagon DMA64 off, offsets",
                      ", ".join("%#x" % o for o in HEXAGON_ANCHORS))
            elif name == OPENCL:
                data = patch_opencl(zin.read(name))
                patched += 1
                print("patched: opencl compat (CL3+CSG symbols, wmm-repack compile degrade)")
            else:
                data = zin.read(name)
                kept += 1
            zi = zipfile.ZipInfo(name, date_time=it.date_time)
            zi.compress_type = it.compress_type
            zi.external_attr = it.external_attr
            zi.internal_attr = it.internal_attr
            zi.create_system = it.create_system
            zout.writestr(zi, data)
        for a in new_assets:
            zi = zipfile.ZipInfo(a)
            zi.compress_type = zipfile.ZIP_DEFLATED
            zout.writestr(zi, repl[a])
            replaced += 1
            print("added:", a)

    assert replaced == len(REPLACE_ASSETS), "asset replace count %d" % replaced
    assert patched == 2, "so patch count %d" % patched

    # 从产物回读校验
    z2 = zipfile.ZipFile(out)
    so = z2.read(HEXAGON)
    for off, (old, new) in HEXAGON_ANCHORS.items():
        assert so[off:off + 4] == new, "verify hexagon failed @%#x" % off
    oc = z2.read(OPENCL)
    assert oc[CL3_DYNSTR_OFF:CL3_DYNSTR_OFF + 15] == b"clCreateBuffer\x00"
    assert oc[CL3_CALLSITE_OFF:CL3_CALLSITE_OFF + 4] == CL3_CALL_NEW
    assert oc[CSG_DYNSTR_OFF:CSG_DYNSTR_OFF + 16] == b"clGetDeviceInfo\x00"
    assert oc[CSG_CALL1_OFF:CSG_CALL1_OFF + 4] == CSG_CALL_NEW
    assert oc[CSG_CALL2_OFF:CSG_CALL2_OFF + 4] == CSG_CALL_NEW
    for off, old, new, tag in FIX4_PATCH_SET:
        assert oc[off:off + len(new)] == new, "verify fix4 failed @%#x (%s)" % (off, tag)
    assert z2.read("assets/bench.js").find(b"benchStart") >= 0
    arsc = [i for i in z2.infolist() if i.filename == "resources.arsc"][0]
    assert arsc.compress_type == 0, "resources.arsc must stay stored"

    size = os.path.getsize(out)
    print("repacked: %s (%d bytes), kept=%d replaced=%d patched=%d sig_removed=%d"
          % (out, size, kept, replaced, patched, skipped_sig))
    print("verify: hexagon + opencl(10 pts) + bench.js + stored arsc  OK")


if __name__ == "__main__":
    main()
