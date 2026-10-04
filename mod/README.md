# mod/ — PocketOrca-LLM v1.4.0 修复包（v1.4.0-fix4）

本目录是 **308532806/PocketOrca-LLM fork** 的修改层：基于官方 v1.4.0 **发布 APK** 做"手术式"修补，不重新编译 dex/native。

修复包内容（fix4 = fix3 + GPU 运行期兼容修复）：

| # | 修复 | 目标 | 说明 |
|---|---|---|---|
| 1 | NPU(HTP) 启动崩溃（[issue #1](https://github.com/PocketOrca/PocketOrca-LLM/issues/1)） | `libggml-hexagon.so` | 2 处 `strb w8→wzr` 强制关闭 `opt_dma64`（DMA64 映射与内置旧 `libcdsprpc.so` 不兼容 → `fastrpc_mmap` 0xe → exit 134） |
| 2 | GPU 加载失败：`clCreateBufferWithProperties`（CL 3.0） | `libggml-opencl.so` | 旧驱动不导出该符号 + `BIND_NOW` 加载期强依赖。dynstr 改名 + 调用点 `nop`（默认关闭的 X2 实验路径） |
| 3 | GPU 加载失败：`clGetKernelSubGroupInfo`（CL 2.1） | `libggml-opencl.so` | 两调用点返回"查询失败"（既有降级）+ dynstr 占位改名 |
| 4 | GPU 运行期闪退：`flash_attn_repack` kernel 编译失败 → `exit(1)` | `libggml-opencl.so` | 旧驱动缺 `cl_khr_3d_image_writes`；`fatal` 参数 `1→0` + 4 处 CL_CHECK 失败跳转 `cbnz→nop`（句柄保持 NULL；wmm prefill 路径不可达——bin 内核库不随包分发） |
| 5 | 状态胶囊开关滑块不动（上游 bug） | `assets/app.js` | `setState` 未同步 `#statusPill` 样式类；已补 |
| 6 | 三引擎测速（新增功能） | `assets/bench.js` + UI | 用当前模型依次实测 NPU/GPU/CPU 并展示 t/s 与加载耗时 |

## 真机验证（发布前）

在 **OPPO PDPM00（SM7250 骁龙 765G / Adreno 620 / Android 12）** 上完成：

- 独立进程（修复库 + 真实 OpenCL 驱动）：`-fa on` / `-fa off` 均完整启动到 `llama_server: model loaded / listening`，`/completion` 推理返回正常；
- App 内（JNI + sphal 路径）：安装后实测 GPU 引擎与三引擎测速（见 Release 说明）。

## 为什么是"APK 手术"而不是源码重建？

上游仓库的公开源码滞后于发布版（v1.3.8 / v1.4.0 的提交只同步了文档，`app/src` 仍停留在 v1.3.5，且 v1.4.0 实际 APK 含公开源码里没有的 BigMoE 等模块）。因此直接重建源码会**回退**功能。本修改层改为：以官方 v1.4.0 APK 为字节级基线，只替换/追加必要的文件，并用脚本对关键字节做校验，保证其余内容与官方逐字节一致。

## 内容

| 路径 | 说明 |
|---|---|
| `assets/app.js` | 由 v1.4.0 APK 内 assets/app.js 恢复为可读格式 + 8 处修改（i18n、版本号、测速 guard、状态胶囊修复） |
| `assets/index.html` | 同上来源；新增「引擎测速」卡片与样式、加载 bench.js |
| `assets/bench.js` | **新增**：三引擎（NPU/GPU/CPU）测速实现，只用现有 JS 桥 |
| `tools/build_mod.py` | 官方 APK → 打 .so 补丁（hexagon 2 处 + opencl 10 处）+ 替换/追加 assets → 未签名 APK（含双 .so sha256 断言、锚点断言、回读校验；opencl 产物 sha256 与真机验证版一致） |
| `tools/verify_mod_apk.py` | 对最终 APK 的校验（12 处补丁字节 / 资产标记 / 打包结构 / sha256） |
| `tools/patch_appjs.py` | app.js 全部 8 处修改的留档脚本（从原始 beautified 版可一键重现） |
| `tools/test_bench_smoke.js` | bench.js 状态机冒烟测试（stub DOM/bridge，`node tools/test_bench_smoke.js`） |
| `release-notes/` | 各版本发布说明（随 Release 发布） |

## 构建

```bash
# 1. 准备官方 v1.4.0 APK（sha256: 14885aadb8d38aee9fc3ebc9fc393f148788901a2d63cdc082ff8ac5008e5478）
curl -L -o official.apk https://github.com/PocketOrca/PocketOrca-LLM/releases/download/v1.4.0/PocketOrca-LLM-v1.4.0-release.apk

# 2. 打补丁并重打包（需要 python3，仅标准库）
python3 mod/tools/build_mod.py official.apk mod out/unsigned.apk

# 3. 对齐 + 签名（需 Android build-tools 与 JDK）
zipalign -f 4 out/unsigned.apk out/aligned.apk
apksigner sign --ks your.keystore --out PocketOrca-LLM-v1.4.0-fix4.apk out/aligned.apk

# 4. 校验
python3 mod/tools/verify_mod_apk.py PocketOrca-LLM-v1.4.0-fix4.apk
```

CI 上由 [`.github/workflows/mod-build.yml`](../.github/workflows/mod-build.yml) 自动构建：push 只生成 artifact；确认无误后手动 `workflow_dispatch`（`publish=true`）发布 Release。

## 修复依据

- [issue #1](https://github.com/PocketOrca/PocketOrca-LLM/issues/1)：NPU 启动崩溃（`fastrpc_mmap failed` / exit 134）的定位与二进制补丁方案（qwerkilo 报告）；
- llama.cpp PR #29197：DMA64 扩展映射改动（v1.4.0 基线 `58367713a` 引入）；
- llama.cpp `ggml/src/ggml-opencl/ggml-opencl.cpp`（同基线）：CL3/CL2.1 符号与 `flash_attn_repack` 构建（`fatal=true`）——对旧驱动均为兼容盲区，在 App JNI 进程内运行时表现为"dlopen 失败 / 整体闪退"。
