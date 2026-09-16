# PocketOrca-LLM v1.3.8 更新日志

[English](RELEASE-NOTES-v1.3.8.en.md) | **中文**

## 兼容性

- **最低系统要求 Android 13 → Android 10**：华为鸿蒙 4.x 等此前报「解析包错误」的机型可正常安装（Mate70 Pro 实测通过）
- 骁龙 8 Gen 2 GPU 乱码修复：8 Gen 2 机型 GPU 引擎已可用（仍推荐 CPU）
- NPU：修复支持 IQ4_NL 模型（实测三星 S25 在 NPU 模式下运行 Qwen3-8B-IQ4_NL.GGUF）

## 新功能

- Qwen3 系列解除 NPU 禁用：旧版僵死系上游 llama.cpp bug，已随升级修复（S25 实测 Qwen3-8B 正常）
- 新增通知栏运行状态显示：空闲 / 启动中 / 运行中三态；运行中显示 IP:端口、RAM、温度
- NPU 进阶调参入口：`Download/npullm-htp-env.json` 可向 NPU 引擎注入环境变量，保存后重启服务即生效

## 修复与改进

- Android 15 长会话崩溃修复：前台服务类型 dataSync → specialUse，移除 6 小时后台限额，当天长时间运行不再被系统中断
- Chat 默认最大生成 token 512 → 1024
- llama.cpp 升级（0905 → 0915，172 commits）

## 安装

- 下载 `PocketOrca-LLM-v1.3.8-vc72-release.apk`（约 45 MB，md5 `d2d8f96a`）
- 系统要求：Android 10 及以上，arm64
- 与 v1.3.5 同证书签名，可直接覆盖安装
