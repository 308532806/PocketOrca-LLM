#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PocketOrca-LLM v1.4.2 修复包构建（APK surgery，不重编 dex）

基线：官方 PocketOrca-LLM-v1.4.2-release.apk
  sha256 09fd7462f29cd39088c1e4df42dce72e404fe6c2941fd29c14e24de76d0308d7

修改清单（相对官方 v1.4.2）：
 1) assets/app.js — 我们的全部 Web 改动（fix9~fix13）+ 上游 v1.4.2 多模态/会话 Web 层移植
      - fix9: 键盘遮挡修复、跟随滚动、MTP 失败原因
      - fix10: caps.js 能力检测门控
      - fix11: 模型感知推荐 + 内存扩展开关
      - fix12: markdown、清空按钮、btnMain 上移、真更新检查、toast 分级、测速优化
      - fix13: SoC 代号纠正、输入框提示词
      - v1.4.2 移植：附件栏/📎按钮/录音/会话回调、聊天历史持久化
 2) assets/index.html — 同上（含附件栏 CSS/按钮）
 3) assets/bench.js — 测速（含 MTP 引擎）
 4) assets/recommend.js — 智能推荐
 5) assets/caps.js — 能力检测与门控

.so 字节补丁（v1.4.1 时代）已全部退役：
 - hexagon DMA64 补丁：v1.4.2 官方重做了 DMA64 映射（"mitigated by default"），
   旧补丁字节在新 .so 中已不存在，无需也不再应用。
 - opencl 兼容补丁：v1.4.2 的 PLT 已不再引用 clCreateBufferWithProperties /
   clGetKernelSubGroupInfo（BIND_NOW 加载期问题上游已修），补丁根因消失。

用法: python3 build_mod.py <official_v1.4.2.apk> <mod_dir> <out_apk>
"""
import sys, os, zipfile, hashlib

EXPECT_APK_SHA256 = "09fd7462f29cd39088c1e4df42dce72e404fe6c2941fd29c14e24de76d0308d7"

REPLACE_ASSETS = ["assets/app.js", "assets/index.html", "assets/bench.js", "assets/recommend.js", "assets/caps.js"]


def sha256_file(p):
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


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
    new_assets = [a for a in REPLACE_ASSETS if a not in set(it.filename for it in zin.infolist())]
    kept = replaced = skipped_sig = 0
    with zipfile.ZipFile(out, "w") as zout:
        for it in zin.infolist():
            name = it.filename
            if name.startswith("META-INF/"):
                skipped_sig += 1
                continue
            if name in repl:
                data = repl[name]
                replaced += 1
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

    # 从产物回读校验
    z2 = zipfile.ZipFile(out)
    appjs = z2.read("assets/app.js")
    assert b"1.4.2 fix1" in appjs, "APP_VER not 1.4.2 fix1"
    assert b"chatAttachBar" in appjs, "v1.4.2 multimodal code missing"
    assert b"chatHistSave" in appjs, "v1.4.2 session code missing"
    assert b"mdRender" in appjs, "fix12 markdown missing"
    assert b"npullmMemExt" in z2.read("assets/recommend.js"), "fix11 memext missing"
    assert b"deviceCaps" in z2.read("assets/caps.js"), "fix10 caps missing"
    assert b'"sm8850"' in z2.read("assets/caps.js"), "fix13 SoC numbers missing"
    assert z2.read("assets/bench.js").find(b"benchStart") >= 0
    arsc = [i for i in z2.infolist() if i.filename == "resources.arsc"][0]
    assert arsc.compress_type == 0, "resources.arsc must stay stored"

    size = os.path.getsize(out)
    print("repacked: %s (%d bytes), kept=%d replaced=%d sig_removed=%d"
          % (out, size, kept, replaced, skipped_sig))
    print("verify: assets(5) + stored arsc  OK")


if __name__ == "__main__":
    main()
