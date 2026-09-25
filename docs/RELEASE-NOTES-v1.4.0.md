# PocketOrca-LLM v1.4.0 更新日志

**中文**

## 兼容性

- CPU模式下增加了对老型号CPU的支持，测试骁龙865在CPU模式下使用正常

## 修复与改进

- 主要：Hexagon NPU 六项更新 · NPU 支持 Q4_K / Q6_K 量化：Q4_K_M 模型可完整卸载 NPU（含 KV cache） · HMX GDN 加速：Qwen3.5 / 3.6 系 NPU prefill 提速 1.5~3 倍，Qwen3.5-9B Q4_K_M：生成 7.25 t/s，prefill 54.7 t/s
- 修复 qwen3.5 系 CPU 模式崩溃
- 上下文最大支持64K
- llama.cpp 基线升级（58367713a）

## 安装

- 下载 `PocketOrca-LLM-v1.4.0-release.apk`
- 系统要求：Android 10 及以上，arm64
- 与 v1.3.8 同证书签名，可直接覆盖安装
