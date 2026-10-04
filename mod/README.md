# mod/ — PocketOrca-LLM v1.4.0 修复包（NPU 启动修复 + 三引擎测速)

本目录是 **308532806/PocketOrca-LLM fork** 的修改层：基于官方 v1.4.0 **发布 APK** 做"手术式"修补，不重新编译 dex/native。

## 为什么是"APK 手术"而不是源码重建？

上游仓库的公开源码滞后于发布版（v1.3.8 / v1.4.0 的提交只同步了文档，`app/src` 仍停留在 v1.3.5，且 v1.4.0 实际 APK 含公开源码里没有的 BigMoE 等模块）。因此直接重建源码会**回退**功能。本修改层改为：以官方 v1.4.0 APK 为字节级基线，只替换/追加必要的文件，并用脚本对关键字节做校验，保证其余内容与官方逐字节一致。

## 内容

| 路径 | 说明 |
|---|---|
| `assets/app.js` | 由 v1.4.0 APK 内 assets/app.js 恢复为可读格式，并做小量修改（i18n 词条、版本号、测速 guard） |
| `assets/index.html` | 同上来源；新增「引擎测速」卡片与样式、加载 bench.js |
| `assets/bench.js` | **新增**：三引擎（NPU/GPU/CPU）测速实现，只用现有 JS 桥 |
| `tools/build_mod.py` | 下载好的官方 APK → 打 NPU 补丁 + 替换/追加 assets → 输出未签名 APK（含锚点断言与回读校验） |
| `tools/verify_mod_apk.py` | 对最终 APK 的校验（补丁字节 / 资产标记 / 打包结构 / sha256） |
| `tools/patch_appjs.py` | app.js 修改的留档脚本（记录全部 7 处修改点） |
| `release-notes/v1.4.0-fix1.md` | 发布说明（随 Release 发布） |

## 构建

```bash
# 1. 准备官方 v1.4.0 APK（sha256: 14885aadb8d38aee9fc3ebc9fc393f148788901a2d63cdc082ff8ac5008e5478）
curl -L -o official.apk https://github.com/PocketOrca/PocketOrca-LLM/releases/download/v1.4.0/PocketOrca-LLM-v1.4.0-release.apk

# 2. 打补丁并重打包（需要 python3，仅标准库）
python3 mod/tools/build_mod.py official.apk mod out/unsigned.apk

# 3. 对齐 + 签名（需 Android build-tools 与 JDK）
zipalign -f 4 out/unsigned.apk out/aligned.apk
apksigner sign --ks your.keystore --out PocketOrca-LLM-v1.4.0-fix1.apk out/aligned.apk

# 4. 校验
python3 mod/tools/verify_mod_apk.py PocketOrca-LLM-v1.4.0-fix1.apk
```

CI 上由 [`.github/workflows/mod-fix1.yml`](../.github/workflows/mod-fix1.yml) 自动完成上述流程并发布 Release（签名密钥存于仓库 Secrets）。

## 修复依据

- [issue #1](https://github.com/PocketOrca/PocketOrca-LLM/issues/1)：NPU 启动崩溃（`fastrpc_mmap failed` / exit 134）的定位与二进制补丁方案（qwerkilo 报告）；
- llama.cpp PR #29197：DMA64 扩展映射改动（v1.4.0 基线 `58367713a` 引入），旧版内置 `libcdsprpc.so` 不兼容。

补丁后 `libggml-hexagon.so` sha256 `27713036999a9f76e1b4fafce02346504d787cab676158a11987ecc9c06b9bec` 与社区独立修复一致。
