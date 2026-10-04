# mod/ — PocketOrca-LLM v1.4.0 修复包（v1.4.0-fix5）

PocketOrca-LLM 上游 v1.4.0 在 NPU/GPU 启动环节存在兼容性问题（issue #1 之类），本目录是对其官方 APK 的"手术式"修复层 —— 仅修改 4 类条目、其余与官方 v1.4.0 逐字节一致。fix5 = fix4 全部内容 + 自选测速 + 状态胶囊 UI 精简 + 日志轮询性能优化。

> 上游：https://github.com/PocketOrca/PocketOrca-LLM  ·  本 fork：https://github.com/308532806/PocketOrca-LLM

---

## 修改内容（fix1 → fix5 累积）

| # | 类别 | 文件 | 说明 |
|---|---|---|---|
| 1 | NPU(HTP) 启动崩溃 | `lib/arm64-v8a/libggml-hexagon.so`（2 字节补丁） | 关闭 `opt_dma64`，避免新 DMA64 映射与旧 `libcdsprpc.so` 不兼容（exit 134） |
| 2 | GPU(OpenCL) 旧驱动兼容 | `lib/arm64-v8a/libggml-opencl.so`（10 字节补丁） | 去掉 CL 3.0 / CL 2.1 强符号依赖；wmm-repack kernel 编译失败由 fatal 降级为忽略（该 kernel 组永不被使用） |
| 3 | 自选测速 | `assets/bench.js` + UI（fix5） | 三引擎测速改为按勾选顺序依次实测；选择用 localStorage 记忆；不勾任何引擎时给提示 |
| 4 | 状态胶囊 UI 精简 | `assets/index.html` + `assets/app.js`（fix5） | 移除冗余指示灯 / 外框 / 底色；文字与开关垂直基线对齐；滑块行程对称；错误态用红色 |
| 5 | 日志轮询性能优化 | `assets/app.js`（fix5） | 500ms 轮询改为仅日志页可见时运行；其它页面零开销 |
| 6 | i18n + 版本号 | `assets/index.html` + `assets/app.js` | 新增 4 条中文词条；verLine 改为 `1.4.0 fix5 · 自选测速` |
| — | 其余全部 | classes.dex / manifest / 其它 35 个原生库 / 其它资源 | 与官方 v1.4.0 逐字节一致 |

> 修复后 libggml-hexagon.so SHA-256 = `277130…a7596`（与 issue 报告一致，证明等价）；修复后 libggml-opencl.so SHA-256 = `ac6bb2091f331ad024cbbf3a587a7982a686389ee44916d31d93ff21444adb76`（独立进程 GPU 实测可用）。

---

## 目录结构

```
mod/
├── assets/
│   ├── app.js              ← patch_appjs.py 输出
│   ├── index.html          ← 手改 UI（含 fix5 胶囊/勾选 chips）
│   └── bench.js            ← 自选测速脚本（新增）
├── tools/
│   ├── build_mod.py        ← APK 手术主脚本（zipfile 级，无 dex 重编译）
│   ├── patch_appjs.py      ← app.js 修改记录（可重放）
│   ├── verify_mod_apk.py   ← CI 校验（修复锚点 + 哈希 + 资源完整性）
│   └── test_bench_smoke.js ← Node 冒烟测试（4 场景）
├── release-notes/
│   └── v1.4.0-fix5.md      ← 当前版本发布说明
├── mod/build.sh            ← CI 入口脚本
└── .github/workflows/
    └── mod-build.yml       ← CI：下载官方 APK → 手术 → 重签名 → 发 Release
```

---

## 本地构建

依赖 Python 3.10+ 与 Node 18+。SDK / build-tools / apksigner 由 CI 提供，本地不强求。

```bash
# 1. 准备
ln -s /path/to/PocketOrca-LLM-v1.4.0.apk up.apk       # 官方原版

# 2. 构建
python3 mod/tools/build_mod.py up.apk mod out.apk
python3 mod/tools/verify_mod_apk.py out.apk            # 断言全过

# 3. 测速脚本冒烟
node mod/tools/test_bench_smoke.js                     # 4 场景全绿

# 4. 签名 + 校验（需要 build-tools）
zipalign -f -p 4 out.apk aligned.apk
apksigner sign --ks keystore.jks --ks-key-alias porca aligned.apk
apksigner verify --print-certs aligned.apk
```

---

## 关于"防休眠"

应用**已内置**防休眠机制（ServerService.java）：

- 前台服务 + `PARTIAL_WAKE_LOCK`
- `WifiManager.WIFI_MODE_FULL_HIGH_PERF`
- 首次启动引导申请电池优化豁免

fix5 **未新增** 防休眠代码 —— 因为不需要。若仍遇息屏断连，请确认系统设置里本应用为"不受限"。

---

## 已知限制

- 骁龙 765G / 8GB RAM 等"小内存/老 Adreno"设备：**禁止在 App 内跑 GPU 完整测速**（实测曾触发系统保护性重启）。独立进程测试可用。建议在 UI 上只勾 CPU。
- 部分机型无可用 NPU（7 系旧平台），NPU 测速必然失败，属正常。

---

## 与上游 / 其它 fork 的关系

- 改动仅在 fork 上提交，**永远不向 upstream 提 PR**（涉及签名密钥、CI 上传、用户资产，本就是社区侧的分发，不应回流）。
- 不改 dex、不改推理逻辑 —— 仅做"足以让 v1.4.0 在更多设备跑起来"的最小修复 + 用户体验改进。