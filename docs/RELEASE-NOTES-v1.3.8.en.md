# PocketOrca-LLM v1.3.8 Release Notes

**English** | [中文](RELEASE-NOTES-v1.3.8.md)

## Compatibility

- **Minimum requirement lowered from Android 13 to Android 10**: devices that previously reported "package parse error" — including Huawei HarmonyOS 4.x — now install normally (verified on Mate 70 Pro)
- Snapdragon 8 Gen 2 GPU garbled-output fix: the GPU engine is usable again on 8 Gen 2 devices (CPU still recommended)
- NPU: fixed support for IQ4_NL models (verified: Samsung S25 running Qwen3-8B-IQ4_NL.GGUF on the NPU engine)

## New

- Qwen3 family NPU restriction removed: the old hang was an upstream llama.cpp bug, fixed by the upgrade (verified on S25 with Qwen3-8B)
- New notification-bar status display: idle / starting / running; the running card shows IP:port, RAM and temperature
- Advanced NPU tuning hook: `Download/npullm-htp-env.json` injects environment variables into the NPU engine; takes effect after restarting the service

## Fixes & Improvements

- Android 15 long-session crash fix: foreground service type dataSync → specialUse, removing the 6-hour background quota so all-day sessions are no longer interrupted by the system
- Chat default max generation tokens 512 → 1024
- llama.cpp upgrade (0905 → 0915, 172 commits)

## Install

- Download `PocketOrca-LLM-v1.3.8-vc72-release.apk` (~45 MB, md5 `d2d8f96a`)
- Requires Android 10+, arm64
- Same signing certificate as v1.3.5 — install directly over the old version

## Building from source (notes)

- The NPU/GPU inference runtime `ocl-libs.tar` (~210 MB, md5 `aaba86b0`) is attached to this release; on Gitee it is split into 3 parts (100 MB per-file limit):

```bash
cat ocl-libs.tar.part.00 ocl-libs.tar.part.01 ocl-libs.tar.part.02 > ocl-libs.tar
md5sum ocl-libs.tar   # expect aaba86b0e99fe3f92b4383b3ba8f2377
tar xf ocl-libs.tar
```

- On GitHub the attachment is a single `ocl-libs.tar`.
