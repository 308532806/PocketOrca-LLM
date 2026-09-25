# PocketOrca-LLM v1.4.0 Release Notes

[中文](RELEASE-NOTES-v1.4.0.md) | **English**

## Compatibility

- Added support for older CPUs in CPU mode — tested and verified on Snapdragon 865

## Fixes & Improvements

- Highlights: six Hexagon NPU updates — NPU now supports Q4_K / Q6_K quantization: Q4_K_M models can be fully offloaded to the NPU (including the KV cache) · HMX GDN acceleration: 1.5–3× NPU prefill speedup for Qwen3.5 / 3.6 series; measured on Qwen3.5-9B Q4_K_M: 7.25 t/s generation, 54.7 t/s prefill
- Fixed qwen3.5-series crash in CPU mode
- Context length now supports up to 64K
- llama.cpp baseline upgrade (58367713a)

## Install

- Download `PocketOrca-LLM-v1.4.0-release.apk`
- Requirements: Android 10 or later, arm64
- Signed with the same certificate as v1.3.8 — installs directly over the existing app
