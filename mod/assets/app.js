"use strict";
var I18N = {
        "zh-CN": null,
        "zh-TW": {
            "启动服务": "啟動服務",
            "停止服务": "停止服務",
            "启动中…": "啟動中…",
            "重试": "重試",
            "未运行 · 端口 ": "未運行 · 連接埠 ",
            "已复制": "已複製",
            "服务未运行": "服務未運行",
            "服务": "服務",
            "日志": "日誌",
            "自动滚动": "自動捲動",
            "清屏": "清屏",
            "导出": "匯出",
            "使用说明": "說明書",
            "使用说明详见 Github 发布页": "使用說明詳見 Github 發布頁",
            "系统设置": "系統設定",
            "主题": "主題",
            "白天": "日間",
            "黑夜": "夜間",
            "跟随": "跟隨",
            "语言 Language": "語言 Language",
            "跟随系统": "跟隨系統",
            "简体中文": "簡體中文",
            "繁體中文": "繁體中文",
            "检测更新": "檢查更新",
            "恢复缺省配置": "恢復預設配置",
            "清除全部缓存、设置与已存 Key": "清除全部快取、設定與已存 Key",
            "关于": "關於",
            "版本": "版本",
            "设置": "設定",
            "已清屏": "已清屏",
            "先选择模型文件": "先選擇模型檔案",
            "浏览选择 GGUF": "瀏覽選擇 GGUF",
            "未选择模型": "未選擇模型",
            "上下文": "上下文",
            "CPU 线程": "CPU 執行緒",
            "深度思考": "深度思考",
            "空闲自动卸载": "空閒自動卸載",
            "空闲后释放模型内存 · 下次请求自动重载": "空閒後釋放模型記憶體 · 下次請求自動重載",
            "关闭": "關閉",
            "结束思考": "結束思考",
            "思考": "思考",
            "深度思考 开": "深度思考 開",
            "深度思考 关": "深度思考 關",
            "已在下个 token 结束思考": "已在下個 token 結束思考",
            "结束思考失败": "結束思考失敗",
      "引擎测速": "引擎測速",
      "当前模型 · NPU/GPU/CPU/MTP 依次实测": "目前模型 · NPU/GPU/CPU/MTP 依序實測",
      "会短暂停止当前服务并逐一切换引擎，完成自动恢复": "會短暫停止目前服務並逐一切換引擎，完成後自動恢復",
      "开始测速": "開始測速",
      "停止测速": "停止測速",
      "测速进行中，请稍候": "測速進行中，請稍候",
      "准备中…": "準備中…",
      "等待中": "等待中",
      "启动中": "啟動中",
      "预热中…": "預熱中…",
      "测量中…": "測量中…",
      "启动失败": "啟動失敗",
      "本机无可用 NPU，已自动屏蔽": "本機無可用 NPU，已自動遮蔽",
      "本机无可用 NPU，MTP 不可用": "本機無可用 NPU，MTP 不可用",
      "当前模型不含 MTP 层，已自动屏蔽": "目前模型不含 MTP 層，已自動遮蔽",
      "内存扩展": "記憶體擴展",
      "闪存虚拟内存，防 OOM 但更慢": "快閃記憶體虛擬記憶體，防 OOM 但較慢",
      "模型较大（占内存超 6 成），已调低上下文防 OOM": "模型較大（佔記憶體超 6 成），已調低上下文防 OOM",
      "模型较小，已调高上下文": "模型較小，已調高上下文",
      "内存扩展已开启，上下文放宽一档（扩展内存较慢，超出物理内存部分会变慢）": "記憶體擴展已開啟，上下文放寬一檔（擴展記憶體較慢，超出實體記憶體部分會變慢）",
      "内存扩展已开启（已达上下文上限）": "記憶體擴展已開啟（已達上下文上限）",
      "去启动": "去啟動",
      "清空": "清空",
      "清空当前对话？": "清空目前對話？",
      "已清空": "已清空",
      "生成中，稍候再清空": "生成中，稍後再清空",
      "开始新的对话吧": "開始新的對話吧",
      "复制": "複製",
      "已复制": "已複製",
      "检查中…": "檢查中…",
      "检查超时，请稍后重试": "檢查逾時，請稍後重試",
      "未能获取版本信息": "未能取得版本資訊",
      "发现新版本 ": "發現新版本 ",
      "，当前 ": "，目前 ",
      "检查失败，请检查网络": "檢查失敗，請檢查網路",
      "提示处理": "提示處理",
      "查看日志": "查看日誌",
      "测速中": "測速中",
      "启动超时": "啟動逾時",
      "请求失败": "請求失敗",
      "无 timings 数据": "無 timings 資料",
      "BigMoE 模型不支持测速": "BigMoE 模型不支援測速",
      "测速完成": "測速完成",
      "最快": "最快",
      "全部失败": "全部失敗",
      "已取消": "已取消",
      "加载": "載入",
      " · 已恢复原引擎": " · 已恢復原引擎",
      "低内存/老机型建议只选 CPU（GPU 可能造成系统压力）": "低記憶體/舊機型建議只選 CPU（GPU 可能造成系統壓力）",
      "未选择任何引擎，请至少勾选一个": "未選擇任何引擎，請至少勾選一個",
            "端口": "連接埠",
            "引擎": "引擎",
            "模型": "模型",
            "参数": "參數",
            "服务端点": "服務端點",
            "发送": "發送",
            "请求中…": "請求中…",
            "Qwen3 系在 NPU 上会僵死，已切到 GPU": "Qwen3 系在 NPU 上會僵死，已切到 GPU",
            "取消": "取消",
            "仍要启动": "仍要啟動",
            "NPU 不支持（GPU/CPU 可用）": "NPU 不支援（GPU/CPU 可用）",
            "先输入 prompt": "先輸入 prompt",
            "端口被占用，请更换": "連接埠被佔用，請更換",
            "复制失败": "複製失敗",
            "⚠ 端口已被占用，请更换": "⚠ 連接埠已被佔用，請更換",
            "K 系量化": "K 系量化",
            "支持": "支援",
            "未知量化": "未知量化",
            "✓ NPU 支持 (": "✓ NPU 支援 (",
            "✓ GPU/CPU 支持 (": "✓ GPU/CPU 支援 (",
            "? 未知量化（NPU 档可能回退 CPU）": "? 未知量化（NPU 檔可能回退 CPU）",
            "正在启动…": "正在啟動…",
            "进程退出 code=": "處理程序已結束 code=",
            "\\n[进程已退出, exitCode=": "\\n[處理程序已結束, exitCode=",
            "已导出: ": "已匯出: ",
            "导出失败（无日志或无权限）": "匯出失敗（無日誌或無權限）",
            "K 系量化 — NPU 不支持，请改用 GPU/CPU": "K 系量化 — NPU 不支援，請改用 GPU/CPU",
            "先填 Base URL": "先填 Base URL",
            "停止": "停止",
            " · 首字 ": " · 首字 ",
            "(空回复)": "（空回覆）",
            "请求失败 (HTTP ": "請求失敗 (HTTP ",
            "已存 Key: sk-***": "已存 Key: sk-***",
            "Key 已清除": "Key 已清除",
            "Key 已加密保存: sk-***": "Key 已加密儲存: sk-***",
            "保存失败": "儲存失敗",
            "测试中…": "測試中…",
            "(无模型 — 手动填)": "（無模型 — 手動填）",
            "失败": "失敗",
            "✗ 失败 (": "✗ 失敗 (",
            " (401=Key 错) (": " (401=Key 錯) (",
            "运行中 · ": "執行中 · ",
            "未连接": "未連線",
            "请求发往 127.0.0.1:": "請求發往 127.0.0.1:",
            "/v1/chat/completions · 采样参数即时生效": "/v1/chat/completions · 取樣參數即時生效",
            "无": "無",
            "先连接测试选择模型": "先連線測試選擇模型",
            "【思考已折叠 ": "【思考已摺疊 ",
            " 字】\\n": " 字】\\n",
            "(空 content)": "（空 content）",
            "解析失败：": "解析失敗：",
            " 已复制": " 已複製",
            "已是最新 ": "已是最新 ",
            "检测更新：已是最新 ": "檢測更新：已是最新 ",
            "将清除全部设置、缓存与已保存的 API Key，并恢复欢迎页。确定继续？": "將清除全部設定、快取與已儲存的 API Key，並恢復歡迎頁。確定繼續？",
            "恢复缺省": "恢復預設",
            "未知": "未知",
            " 核": " 核",
            "关闭": "關閉",
            "KV 卸载": "KV 卸載",
            "NPU 下影响 CPU 侧辅助计算": "NPU 下影響 CPU 側輔助計算",
            "Qwen3 系 · 开启更慢更深": "Qwen3 系 · 開啟更慢更深",
            "单步计算 token 数 · 老机型 NPU 启动失败就调小": "單步計算 token 數 · 舊機型 NPU 啟動失敗就調小",
            "批处理宽度 ubatch": "批次處理寬度 ubatch",
            "(401=Key 错) ": "(401=Key 錯) ",
            "CLI / API 测试": "CLI / API 測試",
            "远程 API": "遠端 API",
            "粘贴 Key（Keystore 加密存储）": "貼上 Key（Keystore 加密儲存）",
            "保存 Key": "儲存 Key",
            "连接测试": "連線測試",
            "— 先连接测试 —": "— 先連線測試 —",
            "Server 未运行 · 请先到「服务」页启动": "Server 未執行 · 請先到「服務」頁啟動",
            "提示词": "提示詞",
            "输入单轮 prompt…": "輸入單輪 prompt…",
            "默认": "預設",
            "简洁": "簡潔",
            "详细": "詳細",
            "采样参数": "取樣參數",
            "改后对下一次请求生效": "修改後於下一次請求生效",
            "结果": "結果",
            "尚未请求": "尚未請求",
            "Key 为空": "Key 為空",
            "说点什么…": "說點什麼…",
            /* v1.4.2 多模态/会话 */
            "无法识别的附件": "無法識別的附件",
            "录音失败": "錄音失敗",
            "录音中…": "錄音中…",
            "会话已保存": "會話已保存",
            "保存失败": "保存失敗",
            "恢复会话": "恢復會話",
            "已删除": "已刪除",
            "附件 / 会话": "附件 / 會話",
            max_tok: "max_tok",
            "本地引擎": "本地引擎",
            "专为高通骁龙手机设计的本地大模型服务器": "專為高通驍龍手機設計的本地大模型伺服器",
            "我已知晓，开始使用": "我已知曉，開始使用",
            "本机设备": "本機裝置",
            "关于本软件": "關於本軟體",
            "使用须知": "使用須知",
            "机型": "機型",
            "骁龙 8 Elite": "驍龍 8 Elite",
            "骁龙 8 Gen 3": "驍龍 8 Gen 3",
            "骁龙 8 Gen 2": "驍龍 8 Gen 2",
            "骁龙 8+ Gen 1": "驍龍 8+ Gen 1",
            "骁龙 8 Gen 1": "驍龍 8 Gen 1",
            "骁龙 7+ Gen 3": "驍龍 7+ Gen 3",
            "骁龙 7s Gen 3": "驍龍 7s Gen 3",
            "骁龙 6s Gen 3": "驍龍 6s Gen 3",
            "骁龙 QCM6490": "驍龍 QCM6490",
            "基于 llama.cpp（MIT 协议）开发，充分发挥手机 SoC 的算力潜力——让 NPU、GPU 与 CPU 协同工作，在本地运行大语言模型。": "基於 llama.cpp（MIT 授權）開發，充分發揮手機 SoC 的算力潛力——讓 NPU、GPU 與 CPU 協同運作，在本機執行大語言模型。",
            "本软件仅在有限机型上完成测试，实际兼容性与性能因机型和系统版本而异，请以您的实测为准。": "本軟體僅在有限機型上完成測試，實際相容性與效能因機型和系統版本而異，請以您的實測為準。",
            "· 仅支持 GGUF 格式模型，软件本身不含任何模型文件，请自行下载": "· 僅支援 GGUF 格式模型，軟體本身不含任何模型檔案，請自行下載",
            "· 推理时长时间高负载占用 CPU / GPU / NPU，可能导致发热、降频、卡顿，极端情况下其他应用可能被系统终止": "· 推理時長時間高負載佔用 CPU / GPU / NPU，可能導致發熱、降頻、卡頓，極端情況下其他應用程式可能被系統終止",
            "· 长时间运行请保持通风散热，勿覆盖机身；出现过热告警请立即停止使用": "· 長時間執行請保持通風散熱，勿覆蓋機身；出現過熱警告請立即停止使用",
            "· 模型的质量与输出内容由所加载的模型决定，与本软件无关": "· 模型的品質與輸出內容由所載入的模型決定，與本軟體無關"
        },
        en: {
            "启动服务": "Start",
            "停止服务": "Stop",
            "启动中…": "Starting…",
            "重试": "Retry",
            "未运行 · 端口 ": "Idle · port ",
            "已复制": "Copied",
            "服务未运行": "Server not running",
            "服务": "Server",
            "日志": "Logs",
            "自动滚动": "Auto-scroll",
            "清屏": "Clear",
            "导出": "Export",
            "使用说明": "User Guide",
            "使用说明详见 Github 发布页": "See the GitHub release page for the full guide",
            "系统设置": "System",
            "主题": "Theme",
            "白天": "Light",
            "黑夜": "Dark",
            "跟随": "Auto",
            "语言 Language": "Language",
            "跟随系统": "System default",
            "简体中文": "Simplified Chinese",
            "繁體中文": "Traditional Chinese",
            "检测更新": "Check for updates",
            "恢复缺省配置": "Factory reset",
            "清除全部缓存、设置与已存 Key": "Erase cache, settings and saved keys",
            "关于": "About",
            "版本": "Version",
            "设置": "Settings",
            "已清屏": "Cleared",
            "先选择模型文件": "Pick a model first",
            "浏览选择 GGUF": "Browse GGUF",
            "未选择模型": "No model selected",
            "上下文": "Context",
            "CPU 线程": "CPU threads",
            "深度思考": "Thinking",
            "空闲自动卸载": "Sleep on idle",
            "空闲后释放模型内存 · 下次请求自动重载": "Frees model memory after idle · next request reloads",
            "关闭": "Off",
            "结束思考": "End thinking",
            "思考": "Think",
            "深度思考 开": "Thinking on",
            "深度思考 关": "Thinking off",
            "已在下个 token 结束思考": "Thinking ends at the next token",
            "结束思考失败": "End-thinking failed",
      "引擎测速": "Engine speed test",
      "当前模型 · NPU/GPU/CPU/MTP 依次实测": "Current model · NPU / GPU / CPU / MTP measured in turn",
      "会短暂停止当前服务并逐一切换引擎，完成自动恢复": "Temporarily stops the server and switches engines; restores it when done",
      "开始测速": "Run speed test",
      "停止测速": "Stop test",
      "测速进行中，请稍候": "Speed test running — please wait",
      "准备中…": "Preparing…",
      "等待中": "Waiting",
      "启动中": "Starting",
      "预热中…": "Warming up…",
      "测量中…": "Measuring…",
      "启动失败": "Start failed",
      "本机无可用 NPU，已自动屏蔽": "No usable NPU on this device, hidden automatically",
      "本机无可用 NPU，MTP 不可用": "No usable NPU on this device, MTP unavailable",
      "当前模型不含 MTP 层，已自动屏蔽": "Current model has no MTP layers, hidden automatically",
      "内存扩展": "RAM extension",
      "闪存虚拟内存，防 OOM 但更慢": "Flash-based virtual RAM: prevents OOM but slower",
      "模型较大（占内存超 6 成），已调低上下文防 OOM": "Large model (>60% of RAM): context lowered to avoid OOM",
      "模型较小，已调高上下文": "Small model: context raised",
      "内存扩展已开启，上下文放宽一档（扩展内存较慢，超出物理内存部分会变慢）": "RAM extension on: context raised one tier (extended RAM is slower)",
      "内存扩展已开启（已达上下文上限）": "RAM extension on (context already at max)",
      "去启动": "Go start",
      "清空": "Clear",
      "清空当前对话？": "Clear current chat?",
      "已清空": "Cleared",
      "生成中，稍候再清空": "Generating, try later",
      "开始新的对话吧": "Start a new chat",
      "复制": "Copy",
      "已复制": "Copied",
      "检查中…": "Checking…",
      "检查超时，请稍后重试": "Check timed out, retry later",
      "未能获取版本信息": "Couldn't get version info",
      "发现新版本 ": "New version ",
      "，当前 ": ", current ",
      "检查失败，请检查网络": "Check failed, check network",
      "提示处理": "Prompt",
      "查看日志": "View logs",
      "测速中": "Benchmarking",
      "启动超时": "Start timed out",
      "请求失败": "Request failed",
      "无 timings 数据": "No timings in response",
      "BigMoE 模型不支持测速": "Speed test is unavailable for BigMoE models",
      "测速完成": "Speed test done",
      "最快": "fastest",
      "全部失败": "all engines failed",
      "已取消": "Cancelled",
      "加载": "load",
      " · 已恢复原引擎": " · previous engine restored",
      "低内存/老机型建议只选 CPU（GPU 可能造成系统压力）": "On low-memory / older devices prefer CPU (GPU may stress the system)",
      "未选择任何引擎，请至少勾选一个": "No engine selected — pick at least one",
            "端口": "Port",
            "引擎": "Engine",
            "模型": "Model",
            "参数": "Params",
            "服务端点": "Endpoint",
            "发送": "Send",
            "请求中…": "Working…",
            "Qwen3 系在 NPU 上会僵死，已切到 GPU": "Qwen3 hangs on NPU — switched to GPU",
            "取消": "Cancel",
            "仍要启动": "Start anyway",
            "NPU 不支持（GPU/CPU 可用）": "Not supported on NPU (use GPU/CPU)",
            "先输入 prompt": "Enter a prompt first",
            "端口被占用，请更换": "Port busy — pick another",
            "复制失败": "Copy failed",
            "⚠ 端口已被占用，请更换": "⚠ Port busy — pick another",
            "K 系量化": "K-quant",
            "支持": "supported",
            "未知量化": "Unknown quant",
            "✓ NPU 支持 (": "✓ NPU supported (",
            "✓ GPU/CPU 支持 (": "✓ GPU/CPU supported (",
            "? 未知量化（NPU 档可能回退 CPU）": "? Unknown quant (NPU may fall back to CPU)",
            "正在启动…": "Starting…",
            "进程退出 code=": "Process exited, code=",
            "\\n[进程已退出, exitCode=": "\\n[Process exited, exitCode=",
            "已导出: ": "Exported: ",
            "导出失败（无日志或无权限）": "Export failed (no log or no permission)",
            "K 系量化 — NPU 不支持，请改用 GPU/CPU": "K-quant — not supported on NPU, use GPU/CPU",
            "先填 Base URL": "Enter Base URL first",
            "停止": "Stop",
            " · 首字 ": " · first tok ",
            "(空回复)": "(empty response)",
            "请求失败 (HTTP ": "Request failed (HTTP ",
            "已存 Key: sk-***": "Key saved: sk-***",
            "Key 已清除": "Key cleared",
            "Key 已加密保存: sk-***": "Key encrypted & saved: sk-***",
            "保存失败": "Save failed",
            "测试中…": "Testing…",
            "(无模型 — 手动填)": "(no model — fill manually)",
            "失败": "Failed",
            "✗ 失败 (": "✗ Failed (",
            " (401=Key 错) (": " (401=bad key) (",
            "运行中 · ": "Running · ",
            "未连接": "Not connected",
            "请求发往 127.0.0.1:": "Request to 127.0.0.1:",
            "/v1/chat/completions · 采样参数即时生效": "/v1/chat/completions · sampling applies live",
            "无": "None",
            "先连接测试选择模型": "Run connection test to list models",
            "【思考已折叠 ": "[thinking collapsed: ",
            " 字】\\n": " chars]\\n",
            "(空 content)": "(empty content)",
            "解析失败：": "Parse failed: ",
            " 已复制": " copied",
            "已是最新 ": "Up to date ",
            "检测更新：已是最新 ": "Update check: up to date ",
            "将清除全部设置、缓存与已保存的 API Key，并恢复欢迎页。确定继续？": "Erase all settings, cache and saved API keys, and show the welcome screen again? Continue?",
            "恢复缺省": "Reset",
            "未知": "Unknown",
            " 核": " cores",
            "关闭": "Off",
            "KV 卸载": "KV offload",
            "NPU 下影响 CPU 侧辅助计算": "Affects CPU-side helper work under NPU",
            "Qwen3 系 · 开启更慢更深": "Qwen3 series · slower, deeper when on",
            "单步计算 token 数 · 老机型 NPU 启动失败就调小": "Tokens per step · lower it if NPU startup fails on older devices",
            "批处理宽度 ubatch": "ubatch (micro-batch)",
            "(401=Key 错) ": "(401=bad key) ",
            "CLI / API 测试": "CLI / API Test",
            "本地引擎": "Local engine",
            "远程 API": "Remote API",
            "粘贴 Key（Keystore 加密存储）": "Paste key (encrypted in Keystore)",
            "保存 Key": "Save key",
            "连接测试": "Test",
            "— 先连接测试 —": "— connect to list —",
            "Server 未运行 · 请先到「服务」页启动": "Server not running · start it on the Server page",
            "提示词": "Prompt",
            "输入单轮 prompt…": "Enter a one-shot prompt…",
            "默认": "Default",
            "简洁": "Concise",
            "详细": "Detailed",
            "采样参数": "Sampling",
            "改后对下一次请求生效": "applies to the next request",
            "结果": "Result",
            "尚未请求": "No request yet",
            max_tok: "max_tok",
            "Key 为空": "Key is empty",
            "说点什么…": "Say something…",
            /* v1.4.2 multimodal/session */
            "无法识别的附件": "Unrecognized attachment",
            "录音失败": "Recording failed",
            "录音中…": "Recording…",
            "会话已保存": "Chat saved",
            "保存失败": "Save failed",
            "恢复会话": "Restore chat",
            "已删除": "Deleted",
            "附件 / 会话": "Attachments / Sessions",
            "专为高通骁龙手机设计的本地大模型服务器": "Local LLM server, built for Snapdragon phones",
            "我已知晓，开始使用": "Got it, start",
            "本机设备": "This device",
            "关于本软件": "About",
            "使用须知": "Before you start",
            "机型": "Model",
            "骁龙 8 Elite": "Snapdragon 8 Elite",
            "骁龙 8 Gen 3": "Snapdragon 8 Gen 3",
            "骁龙 8 Gen 2": "Snapdragon 8 Gen 2",
            "骁龙 8+ Gen 1": "Snapdragon 8+ Gen 1",
            "骁龙 8 Gen 1": "Snapdragon 8 Gen 1",
            "骁龙 7+ Gen 3": "Snapdragon 7+ Gen 3",
            "骁龙 7s Gen 3": "Snapdragon 7s Gen 3",
            "骁龙 6s Gen 3": "Snapdragon 6s Gen 3",
            "骁龙 QCM6490": "Snapdragon QCM6490",
            "基于 llama.cpp（MIT 协议）开发，充分发挥手机 SoC 的算力潜力——让 NPU、GPU 与 CPU 协同工作，在本地运行大语言模型。": "Built on llama.cpp (MIT license) to unlock your phone's SoC — NPU, GPU and CPU working together to run LLMs locally.",
            "本软件仅在有限机型上完成测试，实际兼容性与性能因机型和系统版本而异，请以您的实测为准。": "Tested on a limited range of devices. Compatibility and performance vary by model and OS version — judge by your own results.",
            "· 仅支持 GGUF 格式模型，软件本身不含任何模型文件，请自行下载": "· GGUF models only. The app ships no model files — download your own.",
            "· 推理时长时间高负载占用 CPU / GPU / NPU，可能导致发热、降频、卡顿，极端情况下其他应用可能被系统终止": "· Inference keeps CPU / GPU / NPU under heavy load for long stretches: expect heat, throttling and lag; other apps may be killed by the system in extreme cases.",
            "· 长时间运行请保持通风散热，勿覆盖机身；出现过热告警请立即停止使用": "· Keep the device ventilated during long runs — don't cover it. Stop immediately if an overheat warning appears.",
            "· 模型的质量与输出内容由所加载的模型决定，与本软件无关": "· Output quality and content depend entirely on the model you load — not on this app."
        }
    },
    LANG = function() {
        try {
            var e = localStorage.getItem("npullmLang");
            if (e && I18N[e]) return e
        } catch (e) {}
        var t = navigator.language || "zh-CN";
        return I18N[t] ? t : /^zh/i.test(t) ? "zh-CN" : "en"
    }();

function T(e) {
    var t = I18N[LANG];
    return t && null != t[e] ? t[e] : e
}
var state = "ready",
    model = null,
    profileId = "htp",
    ctxSize = 8192,
    ubatch = 1024,
    threads = 4,
    confirmPending = null,
    autoScroll = !0,
    localIp = null,
    portBusy = !1,
    $ = function(e) {
        return document.getElementById(e)
    };

/* fix12: toast 分级 + 时长按文案长度动态（1600~4200ms），零轮询 */
function toast(e, lvl) {
    var t = $("toast");
    t.classList.remove("act"), t.textContent = e, t.className = "show " + (lvl || "");
    clearTimeout(t._t);
    var ms = Math.min(4200, Math.max(1600, String(e).length * 55));
    t._t = setTimeout(function() { t.className = ""; }, ms);
}

function toastT(e) {
    toast(T(e))
}
function toastOk(e) { toast(T(e), "ok"); }
function toastErr(e) { toast(T(e), "err"); }

/* fix12: 可点击的 toast —— 文案 + 动作按钮（如"服务未运行 → 去启动"） */
function toastAct(msg, label, fn) {
    var t = $("toast");
    t.innerHTML = "";
    var s = document.createElement("span"); s.textContent = msg; t.appendChild(s);
    var b = document.createElement("button"); b.className = "toast-act"; b.textContent = label;
    b.onclick = function(ev) { ev.stopPropagation(); t.className = ""; try { fn(); } catch (e) {} };
    t.appendChild(b);
    t.className = "show act";
    clearTimeout(t._t), t._t = setTimeout(function() { t.className = ""; }, 3600);
}

/* fix12: 按 page id 跳 tab（switchTab 要的是 tab 元素） */
function goTab(page) {
    var el = document.querySelector('.tab[data-page="' + page + '"]');
    if (el) switchTab(el);
}

function toggleRec() {
  var e = $("recCard"),
    t = !e.classList.contains("open");
  e.classList.toggle("open", t), $("recDrawer").style.display = t ? "flex" : "none";
  try { localStorage.setItem("npullmRecOpen", t ? "1" : "0"); } catch (e) {}
}
function toggleParams() {
    var e = $("paramsCard"),
        t = !e.classList.contains("open");
    e.classList.toggle("open", t), $("params").style.display = t ? "flex" : "none";
    try {
        localStorage.setItem("npullmParamsOpen", t ? "1" : "0")
    } catch (e) {}
}

function bridge(e) {
    try {
        return AndroidBridge[e].apply(AndroidBridge, [].slice.call(arguments, 1))
    } catch (e) {
        return null
    }
}

function qwen3Model() {
    return !!(model && model.name && /qwen3/i.test(model.name))
}

function switchTab(e) {
    for (var t = document.querySelectorAll(".tab"), n = 0; n < t.length; n++) t[n].classList.remove("active");
    e.classList.add("active"), document.querySelectorAll(".page").forEach(function(e) {
        e.classList.remove("active")
    }), $(e.dataset.page).classList.add("active")
}

function refreshEndpoint() {
    var e = $("epUrl"),
        t = port();
    "running" === state ? (e.textContent = "http://" + (localIp || "<IP>") + ":" + t, e.classList.remove("idle")) : (e.textContent = T("未运行 · 端口 ") + t, e.classList.add("idle"))
}

function copyEndpoint() {
    if ("running" === state) {
        var e = $("epUrl").textContent,
            t = function() {
                var e = $("btnCopy");
                e.classList.add("done"), toastT("已复制"), setTimeout(function() {
                    e.classList.remove("done")
                }, 1200)
            };
        navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(e).then(t, function() {
            fallbackCopy(e, t)
        }) : fallbackCopy(e, t)
    } else toastT("服务未运行")
}

function fallbackCopy(e, t) {
    var n = document.createElement("textarea");
    n.value = e, n.style.position = "fixed", n.style.opacity = "0", document.body.appendChild(n), n.select();
    try {
        document.execCommand("copy"), t()
    } catch (e) {
        toastT("复制失败")
    }
    document.body.removeChild(n)
}

function checkPort() {
    setPortHint("running" !== state && "starting" !== state && !0 === bridge("isPortBusy", port()))
}

function setPortHint(e) {
    portBusy = e;
    var t = $("portHint");
    e ? (t.textContent = T("⚠ 端口已被占用，请更换"), t.classList.add("warn")) : (t.textContent = "", t.classList.remove("warn"))
}

function setState(e, t) {
    state = e, $("stateMsg").textContent = t || "";
  var _sp = $("statusPill");
  _sp && (_sp.classList.toggle("running", "running" === e), _sp.classList.toggle("starting", "starting" === e), _sp.classList.toggle("error", "error" === e));
    var n = $("btnMain");
    n.classList.remove("stop", "retry"), n.disabled = !1, "starting" === e ? (n.textContent = T("启动中…"), n.disabled = !0) : "running" === e ? (n.textContent = T("停止服务"), n.classList.add("stop")) : "error" === e ? (n.textContent = T("重试"), n.classList.add("retry")) : n.textContent = T("启动服务"), n.setAttribute("data-i18n", n.textContent), refreshEndpoint(), checkPort()
}

function renderCard() {
    var e = model && model.path;
    if ($("mcEmpty").style.display = e ? "none" : "block", $("mcBody").style.display = e ? "block" : "none", "bmoe" === profileId) return $("rowThinking").style.display = "none", void applyQwen3Guard();
    if (!e) return $("rowThinking").style.display = "none", void applyQwen3Guard();
    $("mcName").textContent = model.name;
    var t = (model.sizeBytes / 1073741824).toFixed(2);
    // fix7 bug3: 附加当前生效参数（ctx/线程/ubatch/KV），一目了然
  var _ctxK = ctxSize >= 1024 ? (ctxSize / 1024) + "K" : ctxSize;
  var _kv = $("kvoff") && $("kvoff").checked ? "KV开" : "KV关";
  $("mcMeta").textContent = t + " GB · ctx " + _ctxK + " · " + threads + "t · ub " + (ubatch || "off") + " · " + _kv;
    var n = $("mcQuant");
    n.className = "quant", n.style.display = "none", $("rowThinking").style.display = qwen3Model() ? "flex" : "none", applyQwen3Guard()
}

function applyQwen3Guard() {}

function setProfile(e, t) {
  if (benchRunning) return;
  // fix10: 能力门控 —— 不可用引擎拦截（t 为真时静默，用于启动恢复）
  if (typeof engineAllowed === "function") {
    var _cap = engineAllowed(e);
    if (!_cap.ok) {
      var _fb = "cpu";
      try { if (deviceCaps().npu) _fb = "htp"; } catch (_e) {}
      if (!t && typeof toastT === "function") toastT(_cap.reason);
      if (e !== _fb) setProfile(_fb, true);
      return;
    }
  }
  var _seg = $("engineSeg");
  if (_seg) { _seg.style.opacity = "0.5"; _seg.style.pointerEvents = "none"; }
  setTimeout(function() { if (_seg) { _seg.style.opacity = ""; _seg.style.pointerEvents = ""; } }, 600);
    if (_bmoeOn || "bmoe" !== e) {
        profileId = e;
        for (var n = document.querySelectorAll("#engineSeg button"), a = 0; a < n.length; a++) n[a].classList.toggle("active", n[a].dataset.profile === e);
        var o = $("bmoeCard");
        o && (o.style.display = "bmoe" === e ? "block" : "none");
        var r = $("rowPort");
        r && (r.style.display = "bmoe" === e ? "none" : "flex");
        var l = $("rowCtx");
        l && (l.style.display = "bmoe" === e ? "none" : "block");
        var i = $("rowSleepIdle");
        i && (i.style.display = "bmoe" === e ? "none" : "flex"), 65536 === ctxSize && "mtp" === e && setCtx(32768);
        var s = $("rowUbatch");
        s && (s.style.display = "bmoe" === e ? "none" : "flex"), "bmoe" === e && bmoeRefresh && bmoeRefresh(), save(), renderCard()
    }
}

function setCtx(e) {
    ctxSize = parseInt(e, 10) || 8192;
    for (var t = document.querySelectorAll("#ctxSeg button"), n = 0; n < t.length; n++) t[n].classList.toggle("active", parseInt(t[n].dataset.ctx, 10) === ctxSize);
    save(), renderCard()
}

function stepUbatch(e) {
    var t = [0, 32, 64, 128, 256, 512, 1024],
        n = t.indexOf(ubatch);
    n < 0 && (n = 1);
    var a = t[Math.min(t.length - 1, Math.max(0, n + e))];
    ubatch = a, $("ubatchVal").textContent = ubatch, save(), renderCard()
}

function stepThreads(e) {
    threads = Math.min(8, Math.max(0, threads + e)), $("threadsVal").textContent = threads, save(), renderCard()
}

function save() {
    try {
        localStorage.setItem("npullm", JSON.stringify({
            profileId: profileId,
            ctxSize: ctxSize,
            ubatch: ubatch,
            threads: threads,
            kvflag: $("kvoff").checked,
            port: $("port").value,
            reasoning: void 0 !== $("reasoning").checked && $("reasoning").checked,
            sleepIdle: window._sleepIdle || 0
        }))
    } catch (e) {}
}

function restoreParams() {
    try {
        var e = JSON.parse(localStorage.getItem("npullm") || "null");
        e || (e = {}), e.profileId && (profileId = e.profileId), e.ctxSize && (ctxSize = e.ctxSize), null != e.ubatch && [0, 32, 64, 128, 256, 512, 1024].some(function(t) {
            return t === e.ubatch
        }) && (ubatch = e.ubatch), "number" == typeof e.threads && (threads = Math.min(8, Math.max(0, parseInt(e.threads, 10) || 0))), "boolean" == typeof e.kvflag && ($("kvoff").checked = e.kvflag), e.port && ($("port").value = e.port), "boolean" == typeof e.reasoning && ($("reasoning").checked = e.reasoning)
    } catch (e) {}
    "number" == typeof e.sleepIdle && e.sleepIdle >= 0 && (window._sleepIdle = e.sleepIdle), $("threadsVal").textContent = threads, $("ubatchVal").textContent = ubatch || T("关闭"), $("paramsCard").classList.toggle("open", "1" === localStorage.getItem("npullmParamsOpen")), $("params").style.display = $("paramsCard").classList.contains("open") ? "flex" : "none";
  try { var _ro = "1" === localStorage.getItem("npullmRecOpen"); $("recCard").classList.toggle("open", _ro), $("recDrawer").style.display = _ro ? "flex" : "none"; } catch (_re) {}
  (function() {
            var e = 0;
            try {
                var t = bridge("sleepIdleGet");
                null != t && "" !== t && (e = parseInt(t, 10) || 0)
            } catch (e) {}
            window._sleepIdle = e;
            for (var n = document.querySelectorAll("#sleepIdleSeg button"), a = 0; a < n.length; a++) n[a].classList.toggle("active", parseInt(n[a].dataset.si, 10) === e)
        })();
  setProfile(profileId, !0), setCtx(ctxSize)
}

function port() {
    var e = parseInt($("port").value, 10);
    return e >= 1024 && e <= 65535 || (e = 8080, $("port").value = e), e
}

function doStart(e) {
    // fix10: 能力门控防御（bench 内由 benchNext 预过滤，此处测速中静默跳过）
    if (typeof engineAllowed === "function" && !(typeof benchRunning !== "undefined" && benchRunning)) {
        var _cap2 = engineAllowed(e.profileId);
        if (!_cap2.ok) { if (typeof toastT === "function") toastT(_cap2.reason); return false; }
    }
    setState("starting", "正在启动…"), bridge("startServer", e.modelPath, e.profileId, e.port, e.ctx, e.reasoning, e.threads, e.noKvOffload, e.ub, window._sleepIdle || 0)
    return true;
}

function onMainButton() {
  if (benchRunning) { toastT("测速进行中，请稍候"); return; }
    if ("running" !== state)
        if ("error" !== state) {
            if ("starting" !== state) {
                if (!model || !model.path) return setState("error", T("先选择模型文件")), void setTimeout(function() {
                    setState("ready")
                }, 1500);
                if ("bmoe" === profileId) return save(), void doStart({
                    modelPath: model.path,
                    profileId: profileId,
                    port: port(),
                    ctx: ctxSize,
                    ub: 0,
                    reasoning: "off",
                    threads: threads,
                    noKvOffload: !1
                });
                if (portBusy) toastT("端口被占用，请更换");
                else save(), doStart({
                    modelPath: model.path,
                    profileId: profileId,
                    port: port(),
                    ctx: ctxSize,
                    ub: ubatch,
                    reasoning: $("reasoning").checked ? "on" : "off",
                    threads: threads,
                    noKvOffload: $("kvoff").checked
                })
            }
        } else setState("ready");
    else bridge("stopServer")
}

function confirmCancel() {
    confirmPending = null, $("confirmdlg").style.display = "none", setState("ready")
}

function confirmOk() {
    var e = window._pendingReset, c = window._pendingChatClear;
    if (window._pendingReset = !1, window._pendingChatClear = !1, $("confirmOkBtn").textContent = T("仍要启动"), $("confirmdlg").style.display = "none", e) doFactoryReset();
    else if (c) doChatClear();
    else {
        var t = confirmPending;
        confirmPending = null, t && doStart(t)
    }
}

/* fix12: Chat 清空 / 新对话（confirm 复用现有对话框） */
function chatClearAsk() {
    if (chatStreaming) { toastT("生成中，稍候再清空"); return; }
    $("confirmText").textContent = T("清空当前对话？"), $("confirmOkBtn").textContent = T("清空"), $("confirmdlg").style.display = "flex", window._pendingChatClear = !0;
}
function doChatClear() {
    chatMsgs.length = 0; window._mdCode = {};
    try { localStorage.removeItem("npullmChatHist"); } catch (e) {} /* v1.4.2: 同步清除持久化历史 */
    try { bridge("chatHistPush", "[]"); } catch (e) {}
    var s = $("chatScroll");
    if (s) s.innerHTML = '<div class="empty-hint" id="chatEmpty">' + T("开始新的对话吧") + "</div>";
    var st = $("chatStats"); if (st) st.textContent = "";
    toastT("已清空");
}
$("sleepIdleSeg").addEventListener("click", function(e) {
    if (e.target && e.target.dataset && null != e.target.dataset.si) {
        window._sleepIdle = parseInt(e.target.dataset.si, 10) || 0;
        for (var t = document.querySelectorAll("#sleepIdleSeg button"), n = 0; n < t.length; n++) t[n].classList.toggle("active", parseInt(t[n].dataset.si, 10) === window._sleepIdle);
        bridge("sleepIdleSet", window._sleepIdle)
    }
}), window.onServerState = function(e, t) {
    setState(e, t)
}, window.onServerDied = function(e) {
    window._bmoeTurn = !1, setState("ready", T("进程退出 code=") + e), appendLog("\n[" + T("进程退出 code=") + "exitCode=" + e + "]\n")
}, window.onModelPicked = function(e) {
    model = e, e.path && renderCard()
};
var lastSnap = "";

function appendLog(e) {
    var t = $("log"),
        n = autoScroll && t.scrollTop + t.clientHeight >= t.scrollHeight - 24;
    t.textContent += e, t.textContent.length > 2e5 && (t.textContent = t.textContent.slice(-1e5)), n && (t.scrollTop = t.scrollHeight)
}

function clearLog() {
    bridge("clearLog"), $("log").textContent = "", lastSnap = "", toastT("已清屏")
}

function exportLog() {
    var e = bridge("exportLog");
    toast(e ? T("已导出: ") + e : T("导出失败（无日志或无权限）"))
}
setInterval(function() {
    if (!$("pageLogs").classList.contains("active")) return;
    if ("ready" !== state || 0 !== $("log").textContent.length) {
        var e = bridge("getLog");
        null != e && e !== lastSnap && (lastSnap && 0 === e.indexOf(lastSnap) ? appendLog(e.slice(lastSnap.length)) : ($("log").textContent = e, $("log").scrollTop = $("log").scrollHeight), lastSnap = e)
    }
}, 500), $("port").addEventListener("change", function() {
    save(), refreshEndpoint(), checkPort()
}), setInterval(function(){if($("pageSrv").classList.contains("active"))checkPort()},10000), $("log").addEventListener("scroll", function() {
    var e = this;
    autoScroll = e.scrollTop + e.clientHeight >= e.scrollHeight - 24, $("autoScrollBadge").classList.toggle("on", autoScroll)
}), $("engineSeg").addEventListener("click", function(e) {
    e.target && e.target.dataset && e.target.dataset.profile && !e.target.disabled && setProfile(e.target.dataset.profile)
}), $("ctxSeg").addEventListener("click", function(e) {
    e.target && e.target.dataset && e.target.dataset.ctx && setCtx(e.target.dataset.ctx)
});
/* fork add-on: 引擎测速状态（实现见 bench.js） */
var benchRunning = false;
var chatMsgs = [],
    chatStreaming = !1,
    chatThink = "",
    chatBody = "",
    thinkOn = !1,
    chatStaged = [],     /* v1.4.2: 待发送附件 [{label, ref}] */
    chatSlotFile = null, /* v1.4.2: 会话槽位文件 */
    chatRec99 = !1;      /* v1.4.2: 录音中 */

function chatAddBubble(e, t) {
    var n = $("chatScroll"),
        a = $("chatEmpty");
    a && a.remove();
    var o = document.createElement("div");
    return o.className = "bubble " + ("user" === e ? "user" : "bot"), o.textContent = t, n.appendChild(o), n.scrollTop = n.scrollHeight, chatFollow = !0, chatUpdateFollowBtn(), o
}

function chatStreamBubble() {
    var e = $("chatScroll"),
        t = $("chatEmpty");
    t && t.remove();
    var n = document.createElement("div");
    n.className = "bubble bot";
    var a = document.createElement("span");
    a.className = "think", a.style.display = "none", a.onclick = function() {
        a.classList.toggle("open")
    };
    var o = document.createElement("span"),
        r = document.createElement("span");
    return r.className = "cursor", n.appendChild(a), n.appendChild(o), n.appendChild(r), e.appendChild(n), e.scrollTop = e.scrollHeight, chatFollow = !0, chatUpdateFollowBtn(), {
        bubble: n,
        think: a,
        body: o,
        cur: r
    }
}

/* v1.4.2: 多模态附件栏 —— 显示待发送附件 chip / 会话槽位（上游移植） */
function chatAttachBar() {
    var t = $("chatAttachBar");
    if (!t) return;
    var e = "";
    for (var n = 0; n < chatStaged.length; n++) {
        e += '<span class="chat-attach-chip">' + chatStaged[n].label + ' <b data-del="' + n + '">×</b></span>';
    }
    if (chatSlotFile) e += '<span class="chat-attach-chip slot">💾 ' + chatSlotFile + ' <b data-delslot="1">×</b></span>';
    t.innerHTML = e;
    t.style.display = e ? "flex" : "none";
}

/* fix12: 轻量 markdown 子集 —— 只在消息完成时渲染一次，流式阶段保持纯文本（零额外开销） */
window._mdCode = {};
window._mdSeq = 0;
function mdCodeStore(lang, code) {
    var id = "md" + (Date.now() % 100000) + "_" + (++window._mdSeq);
    window._mdCode[id] = { lang: lang, code: code };
    return id;
}
function mdRender(src) {
    var esc = function(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
    var inline = function(s) {
        return esc(s)
            .replace(/`([^`\n]+)`/g, "<code>$1</code>")
            .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
            .replace(/(^|[\s(\[{])\*([^*\n]+)\*/g, "$1<i>$2</i>");
    };
    // 1) 按行提走代码块（存原文供复制；未闭合也收）
    var raw = String(src).split("\n"), body = [], i, fLang = "", fBuf = null;
    for (i = 0; i < raw.length; i++) {
        var ln0 = raw[i];
        if (fBuf === null) {
            var fm = ln0.match(/^```([a-zA-Z0-9+#-]*)\s*$/);
            if (fm) { fLang = fm[1] || ""; fBuf = []; }
            else body.push(ln0);
        } else if (/^```\s*$/.test(ln0)) {
            body.push("\x00" + mdCodeStore(fLang, fBuf.join("\n").replace(/\n+$/, "")) + "\x00");
            fBuf = null;
        } else fBuf.push(ln0);
    }
    if (fBuf !== null) body.push("\x00" + mdCodeStore(fLang, fBuf.join("\n").replace(/\n+$/, "")) + "\x00");
    // 2) 块级解析（行内转义统一在 inline() 里做一次，不双重转义）
    var lines = body, out = [], n = lines.length;
    i = 0;
    while (i < n) {
        var ln = lines[i], cb = ln.match(/^\x00([^\x00]+)\x00$/), h, q, um, om, u2, o2, items;
        if (cb) {
            var rec = window._mdCode[cb[1]] || { lang: "", code: "" };
            out.push('<div class="cblock"><div class="chead"><span>' + esc(rec.lang || "code") + '</span><button class="cpcopy" data-cid="' + cb[1] + '">' + T("复制") + "</button></div><pre><code>" + esc(rec.code) + "</code></pre></div>");
            i++; continue;
        }
        if (/^\s*$/.test(ln)) { i++; continue; }
        h = ln.match(/^(#{1,3})\s+(.+)$/);
        if (h) { out.push("<h" + h[1].length + ' class="mdh">' + inline(h[2]) + "</h" + h[1].length + ">"); i++; continue; }
        if (/^---+\s*$/.test(ln)) { out.push("<hr>"); i++; continue; }
        q = ln.match(/^>\s?(.*)$/);
        if (q) { out.push("<blockquote>" + inline(q[1]) + "</blockquote>"); i++; continue; }
        um = ln.match(/^[-*]\s+(.+)$/);
        if (um) { items = []; while (i < n) { u2 = lines[i].match(/^[-*]\s+(.+)$/); if (!u2) break; items.push("<li>" + inline(u2[1]) + "</li>"); i++; } out.push("<ul>" + items.join("") + "</ul>"); continue; }
        om = ln.match(/^\d{1,3}[.)]\s+(.+)$/);
        if (om) { items = []; while (i < n) { o2 = lines[i].match(/^\d{1,3}[.)]\s+(.+)$/); if (!o2) break; items.push("<li>" + inline(o2[1]) + "</li>"); i++; } out.push("<ol>" + items.join("") + "</ol>"); continue; }
        out.push("<p>" + inline(ln) + "</p>");
        i++;
    }
    return out.join("");
}
function chatMdApply(n, st) {
    try {
        if (n && n.body && "200" === st && chatBody) n.body.innerHTML = mdRender(chatBody);
    } catch (e) { try { n.body.textContent = chatBody; } catch (e2) {} }
}
/* 代码块复制：chatScroll 上一次事件委托，常驻零开销 */
try {
    document.getElementById("chatScroll").addEventListener("click", function(ev) {
        var b = ev.target;
        if (!b || !b.classList || !b.classList.contains("cpcopy")) return;
        var _cr = window._mdCode[b.getAttribute("data-cid")];
        var code = (_cr && _cr.code) || "";
        var done = function() { b.textContent = T("已复制"); setTimeout(function() { b.textContent = T("复制"); }, 1200); };
        var fb = function() { var ta = document.createElement("textarea"); ta.value = code; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); done(); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code).then(done, fb);
        else fb();
    });
} catch (e) {}

function chatSend() {
    if (!chatStreaming) {
        var e = null;
        try {
            e = JSON.parse(bridge("getStatus") || "null")
        } catch (e) {}
        var t = profileId && "bmoe" === profileId && e && e.running;
        if ("remote" === localStorage.getItem("npullmCliMode") || e && e.running) {
            var n = $("chatInput"),
                a = n.value.trim();
            if (a && !chatRec99) { /* v1.4.2: 录音中禁止发送 */
                var o = "remote" === localStorage.getItem("npullmCliMode"),
                    r = o ? remoteNormalizeBase($("rBase").value || localStorage.getItem("npullmRemoteBase") || "") : null;
                if (o && !r) return void toast(T("先填 Base URL"));
                n.value = "";
                var _cl = a; /* 气泡显示文本 */
                /* v1.4.2: 附件 ref / 会话槽位拼接到 content */
                if (chatStaged.length) for (var _ci = 0; _ci < chatStaged.length; _ci++) a += "\n" + chatStaged[_ci].ref;
                if (chatSlotFile) { a += "\n💾SLOT:" + chatSlotFile; _cl += " · " + chatSlotFile; }
                chatAddBubble("user", _cl), chatMsgs.push({
                    role: "user",
                    content: a
                });
                var l = readSampling(),
                    i = [];
                l.systemPrompt && i.push({
                    role: "system",
                    content: l.systemPrompt
                });
                for (var s = 0; s < chatMsgs.length; s++) i.push(chatMsgs[s]);
                if (t) {
                    chatStreaming = !0, chatThink = "", chatBody = "";
                    var c = chatStreamBubble();
                    return window._chatUI = c, window._chatT0 = Date.now(), $("btnChatSend").textContent = T("停止"), bridge("bmoeChatStart", JSON.stringify({
                        messages: i,
                        max_tokens: l.maxTokens
                    })), void(window._bmoeTurn = !0)
                }
                var d = o ? function() {
                    var e = {
                            messages: i,
                            max_tokens: l.maxTokens,
                            temperature: l.temperature,
                            stream: !0
                        },
                        t = $("rModel").value;
                    return t && 0 !== t.indexOf("—") && (e.model = t), JSON.stringify(e)
                }() : JSON.stringify({
                    messages: i,
                    max_tokens: l.maxTokens,
                    temperature: l.temperature,
                    top_k: l.topK,
                    top_p: l.topP,
                    min_p: l.minP,
                    repeat_penalty: l.repeatPenalty,
                    stream: !0,
                    chat_template_kwargs: {
                        enable_thinking: thinkOn
                    }
                });
                chatStreaming = !0, chatThink = "", chatBody = "", c = chatStreamBubble(), window._chatUI = c, window._chatT0 = Date.now(), $("btnChatSend").textContent = T("停止"),
                chatSlotFile && (bridge("chatSlotAction", "restore", chatSlotFile), chatSlotFile = null, chatAttachBar()), /* v1.4.2: 会话恢复 */
                bridge("chatStart", d = d.replace(/💾SLOT:[^\"]*/g, ""), o ? r + "/chat/completions" : null), /* v1.4.2: 剥离槽位标记 */
                chatStaged = [], chatAttachBar() /* v1.4.2: 发送后清空附件 */
            }
        } else toastAct(T("服务未运行"), T("去启动"), function() { goTab("pageServer"); });
    }
}

function readSampling() {
    return {
        temperature: +$("temp").value,
        topK: +$("topk").value,
        topP: +$("topp").value,
        minP: +$("minp").value,
        repeatPenalty: +$("rep").value,
        maxTokens: parseInt($("maxtok").value, 10) || 1024,
        systemPrompt: "string" == typeof sysPrompt ? sysPrompt : ""
    }
}
/* v1.4.2: 聊天历史持久化 —— localStorage + 推送给 Java 层（上游移植） */
function chatHistSave() {
    try { localStorage.setItem("npullmChatHist", JSON.stringify(chatMsgs)); } catch (e) {}
    try { bridge("chatHistPush", JSON.stringify(chatMsgs)); } catch (e) {}
}

/* v1.4.2: 多模态/会话回调（上游移植） */
window.onChatAttached = function(t) {
    if (!t) return toastT(T("无法识别的附件"));
    var e;
    try { e = JSON.parse(bridge("chatMediaDescribe", t) || "{}"); } catch (e) {}
    var n = (e && e.kind) ? e.kind : "image";
    chatStaged.push({ ref: t, kind: n, label: "image" === n ? "🖼" : "video" === n ? "🎬" : "🎙" });
    chatAttachBar();
};
window.onChatAttachError = function(t) { toastT(t || T("无法识别的附件")); };
window.onChatRecStarted = function(t) {
    var e;
    try { e = JSON.parse(t || "{}"); } catch (e) {}
    if (e && e.ok) {
        chatRec99 = !0;
        var b = $("btnChatAttach"); if (b) b.textContent = "⏹";
        toastT(T("录音中…"));
    } else toastT(T("录音失败"));
};
window.onChatRecStopped = function(t) {
    var e;
    try { e = JSON.parse(t || "{}"); } catch (e) {}
    chatRec99 = !1;
    var b = $("btnChatAttach"); if (b) b.textContent = "📎";
    if (!e || !e.ok) {
        if (e && e.error && e.error.indexOf("not recording") < 0) toastT(T("录音失败"));
        return;
    }
    if (e.ref) { chatStaged.push({ ref: e.ref, kind: "audio", label: "🎙" }); chatAttachBar(); }
};
window.onSlotPicked = function(t) { if (t) { chatSlotFile = t; chatAttachBar(); } };
window.onSlotDeleted = function(t) {
    if (t) {
        if (chatSlotFile === t) { chatSlotFile = null; chatAttachBar(); }
        toastT(T("已删除"));
    }
};
window.onSlotHistLoaded = function(t) {
    var e = null;
    try { e = JSON.parse(t); } catch (t) {}
    if (e && e.length) {
        chatMsgs = e;
        $("chatScroll").innerHTML = "";
        for (var n = 0; n < e.length; n++) chatAddBubble("user" === e[n].role ? "user" : "assistant", e[n].content || "");
        chatHistSave();
    }
    toastT(T("恢复会话"));
};
window.onSlotSaved = function(t) {
    var e;
    try { e = JSON.parse(t || "{}"); } catch (e) {}
    if (e && e.error) toastT(T("保存失败") + " · " + e.error);
    else toastT(T("会话已保存"));
};
window.chatApplyNewPending = function() {
    chatMsgs = []; chatStaged = []; chatSlotFile = null;
    $("chatScroll").innerHTML = ""; $("chatStats").textContent = "";
    chatAttachBar(); chatHistSave();
};

window.onChatChunk = function(e) {
    var t = window._chatUI;
    if (t && e) {
        var n = String(e);
        if (0 === n.indexOf("[THINKING_ID:")) {
            var a = n.slice(13, n.indexOf("]"));
            a && (window._thinkingId = a);
            var o = $("btnThinkEnd");
            o && (o.style.display = chatStreaming ? "inline-block" : "none")
        }
        chatBody += e, t.body.textContent = chatBody;
        var r = $("chatScroll");
        chatFollow ? r.scrollTop = r.scrollHeight : chatUpdateFollowBtn()
    }
}, window.onChatDone = function(e, t) {
    chatStreaming = !1, chatUpdateFollowBtn();
    var n = window._chatUI;
    $("btnChatSend").textContent = T("发送");
    var a = $("btnThinkEnd");
    a && (a.style.display = "none");
    var o = {};
    try {
        o = JSON.parse(t || "{}")
    } catch (e) {}
    if (n) {
        n.cur.remove();
        var r = Math.max(.1, (o.total_ms || Date.now() - window._chatT0) / 1e3),
            l = o.completion_tokens || 0,
            i = l > 0 ? (l / r).toFixed(1) + " t/s" : "",
            s = null != o.first_token_ms ? T(" · 首字 ") + Math.round(o.first_token_ms) + "ms" : "";
        $("chatStats").textContent = [l + " tok", i, s].filter(Boolean).join(" · "), "200" === e || chatBody ? chatBody || (n.body.textContent = T("(空回复)")) : n.body.textContent = T("请求失败 (HTTP ") + e + (o.error ? " · " + o.error : "") + ")", chatMdApply(n, e), chatMsgs.push({
            role: "assistant",
            content: chatBody
        }), chatHistSave() /* v1.4.2: 会话持久化 */
    }
}, $("chatInput").addEventListener("keydown", function(e) {
    "Enter" !== e.key || e.shiftKey || (e.preventDefault(), chatSend())
});
var CHAT_MAX_H = 168;
window.bmoeNewChat = function() {
    window._bmoeTurn = !0
}, $("chatInput").addEventListener("input", function() {
    this.style.height = "auto", this.style.height = Math.min(this.scrollHeight, CHAT_MAX_H) + "px", this.style.overflowY = this.scrollHeight > CHAT_MAX_H ? "auto" : "hidden"
}), $("btnChatSend").addEventListener("click", function() {
    chatStreaming ? bridge("chatAbort") : chatSend()
}), $("btnThink").addEventListener("click", function() {
    thinkOn = !thinkOn;
    var e = $("btnThink");
    e.style.background = thinkOn ? "var(--warn)" : "var(--surface2)", e.style.color = thinkOn ? "#0e1116" : "var(--dim)", toastT(thinkOn ? "深度思考 开" : "深度思考 关")
}), $("btnThinkEnd").addEventListener("click", function() {
    if (window._thinkingId && chatStreaming) {
        var e = bridge("reasoningEnd", window._thinkingId);
        try {
            JSON.parse(e || "{}").ok ? toastT("已在下个 token 结束思考") : toastT("结束思考失败")
        } catch (e) {
            toastT("结束思考失败")
        }
    }
});
var cliMode = "local",
    epLatency = 0;

function remoteInit() {
    try {
        if ("remote" === localStorage.getItem("npullmCliMode")) {
            cliMode = "remote";
            for (var e = document.querySelectorAll("#cliModeSeg button"), t = 0; t < e.length; t++) e[t].classList.toggle("active", "remote" === e[t].dataset.mode);
            $("remoteCfg").style.display = "block", $("localCfg").style.display = "none"
        }
        var n = localStorage.getItem("npullmRemoteBase");
        n && ($("rBase").value = n)
    } catch (e) {}
    var a = bridge("apiKeyFingerprint");
    a && ($("epTestResult").textContent = T("已存 Key: sk-***") + a)
}

function remoteSaveKey() {
    var e = $("rKey").value.trim();
    if (e) {
        var t = bridge("saveApiKey", e);
        try {
            var n = JSON.parse(t);
            n.ok ? ($("rKey").value = "", $("epTestResult").textContent = n.fingerprint ? T("已存 Key: sk-***") + n.fingerprint : T("Key 已清除"), toastT("已复制"), toast(T("Key 已加密保存: sk-***") + n.fingerprint)) : toastT("保存失败")
        } catch (e) {
            toastT("保存失败")
        }
    } else toastT("Key 为空")
}

function remoteNormalizeBase(e) {
    return (e = (e || "").trim().replace(/\/+$/, "")) && !/\/v\d+$/.test(e) && (e += "/v1"), e
}

function remoteTest() {
    var e = remoteNormalizeBase($("rBase").value);
    if (e) {
        try {
            localStorage.setItem("npullmRemoteBase", e)
        } catch (e) {}
        $("epTestResult").textContent = T("测试中…"), bridge("testEndpoint", e)
    } else toastT("先填 Base URL")
}
$("cliModeSeg").addEventListener("click", function(e) {
    var t = e.target;
    if (t.dataset && t.dataset.mode) {
        cliMode = t.dataset.mode;
        for (var n = document.querySelectorAll("#cliModeSeg button"), a = 0; a < n.length; a++) n[a].classList.toggle("active", n[a].dataset.mode === cliMode);
        $("remoteCfg").style.display = "remote" === cliMode ? "block" : "none", $("localCfg").style.display = "local" === cliMode ? "block" : "none";
        try {
            localStorage.setItem("npullmCliMode", cliMode)
        } catch (e) {}
    }
}), window.onEndpointTest = function(e, t, n) {
    epLatency = n;
    var a = $("epTestResult");
    if ("200" === e) {
        a.textContent = "✓ " + n + "ms";
        try {
            var o = JSON.parse(t),
                r = $("rModel");
            r.innerHTML = "";
            var l = (o.data || []).map(function(e) {
                return e.id
            });
            l.length || (l = [T("(无模型 — 手动填)")]);
            for (var i = 0; i < l.length; i++) {
                var s = document.createElement("option");
                s.value = l[i], s.textContent = l[i], r.appendChild(s)
            }
        } catch (e) {}
    } else if ("ERR" === e) try {
        a.textContent = "✗ " + (JSON.parse(t).error || T("失败")) + " (" + n + "ms)"
    } catch (e) {
        a.textContent = "✗ " + T("失败") + " (" + n + "ms)"
    } else a.textContent = "✗ HTTP " + e + " " + T("(401=Key 错) ") + "(" + n + "ms)"
};
var SP_MAP = {
        spDefault: "你是一个简洁、准确的中文助手。",
        spConcise: "用最少的话回答，直接给结论。",
        spDetail: "回答详尽，分点展开，给出推理过程。"
    },
    cliBusy = !1,
    sysPrompt = "";

function toggleParamsCli() {
    var e = $("paramsCliCard"),
        t = !e.classList.contains("open");
    e.classList.toggle("open", t), $("paramsCli").style.display = t ? "flex" : "none";
    try {
        localStorage.setItem("npullmParamsCliOpen", t ? "1" : "0")
    } catch (e) {}
}

function cliRefreshState() {
    var e = null;
    try {
        e = JSON.parse(bridge("getStatus") || "null")
    } catch (e) {}
    var t = !(!e || !e.running);
    return $("cliState").textContent = t ? T("运行中 · ") + ({
        htp: "Hexagon",
        ocl: "OpenCL",
        cpu: "CPU"
    } [e.profile] || (e.profile || "").toUpperCase()) + " · :" + e.port : T("未连接"), $("cliState").classList.toggle("ok", t), $("cliOffline").style.display = t ? "none" : "block", $("cliOnline").style.display = t ? "block" : "none", t && ($("cliMeta").textContent = T("请求发往 127.0.0.1:") + e.port + T("/v1/chat/completions · 采样参数即时生效"), e.sampling && cliLoadSampling(e.sampling)), t
}

function cliLoadSampling(e) {
    document.activeElement && "range" === document.activeElement.type || ($("temp").value = e.temperature, $("topk").value = e.topK, $("topp").value = e.topP, $("minp").value = e.minP, $("rep").value = e.repeatPenalty, cliLabels())
}

function pillToggle() {
    "running" !== state ? "starting" !== state && onMainButton() : bridge("stopServer")
}

function stepParam(e, t, n, a, o) {
    var r = $(e),
        l = parseFloat(r.value) || 0;
    l = Math.min(a, Math.max(n, +(l + t).toFixed(4))), r.value = o > 0 ? l.toFixed(o) : l, cliPushSampling()
}

function cliLabels() {
    $("vTemp").textContent = (+$("temp").value).toFixed(2), $("vTopk").textContent = $("topk").value, $("vTopp").textContent = (+$("topp").value).toFixed(2), $("vMinp").textContent = (+$("minp").value).toFixed(2), $("vRep").textContent = (+$("rep").value).toFixed(2)
}

function cliPushSampling() {
    cliLabels(), bridge("setSampling", +$("temp").value, parseInt($("topk").value, 10) || 0, +$("topp").value, +$("minp").value, +$("rep").value, sysPrompt);
    try {
        localStorage.setItem("npullmSampling", JSON.stringify({
            temperature: +$("temp").value,
            topK: +$("topk").value,
            topP: +$("topp").value,
            minP: +$("minp").value,
            repeatPenalty: +$("rep").value,
            systemPrompt: sysPrompt
        }))
    } catch (e) {}
}

function cliRestoreSampling() {
    try {
        var e = JSON.parse(localStorage.getItem("npullmSampling") || "null");
        if (!e) return;
        "number" == typeof e.temperature && ($("temp").value = e.temperature), "number" == typeof e.topK && ($("topk").value = e.topK), "number" == typeof e.topP && ($("topp").value = e.topP), "number" == typeof e.minP && ($("minp").value = e.minP), "number" == typeof e.repeatPenalty && ($("rep").value = e.repeatPenalty), "number" == typeof e.maxTokens && ($("maxtok").value = e.maxTokens), "string" == typeof e.systemPrompt && (sysPrompt = e.systemPrompt);
        for (var t = document.querySelectorAll("#sysPresets .chip"), n = 0; n < t.length; n++) t[n].classList.toggle("on", (SP_MAP[t[n].dataset.sp] || "") === sysPrompt)
    } catch (e) {}
    cliLabels()
}

function cliSend() {
    if (!cliBusy) {
        var e = $("cliPrompt").value.trim();
        if (e) {
            var t = readSampling(),
                n = [];
            t.systemPrompt && n.push({
                role: "system",
                content: t.systemPrompt
            }), n.push({
                role: "user",
                content: e
            });
            var a = JSON.stringify({
                messages: n,
                max_tokens: t.maxTokens,
                temperature: t.temperature,
                top_k: t.topK,
                top_p: t.topP,
                min_p: t.minP,
                repeat_penalty: t.repeatPenalty,
                chat_template_kwargs: {
                    enable_thinking: thinkOn
                }
            });
            if (cliBusy = !0, $("btnSend").disabled = !0, $("btnSend").textContent = T("请求中…"), $("cliTiming").textContent = "", $("cliRaw").style.display = "none", $("cliOut").textContent = "…", window._cliT0 = Date.now(), "remote" === cliMode) {
                var o = remoteNormalizeBase($("rBase").value);
                if (!o) return cliReset(), void toastT("先填 Base URL");
                var r = $("rModel").value;
                if (!r || 0 === r.indexOf("—")) return cliReset(), void toast(T("先连接测试选择模型"));
                var l = JSON.parse(a);
                l.model = r, delete l.chat_template_kwargs, bridge("httpPostRemote", o + "/chat/completions", JSON.stringify(l), 120)
            } else {
                if (!cliRefreshState()) return cliReset(), void toastT("服务未运行");
                bridge("httpPost", "http://127.0.0.1:" + port() + "/v1/chat/completions", a)
            }
        } else toastT("先输入 prompt")
    }
}

function cliReset() {
    cliBusy = !1, $("btnSend").disabled = !1, $("btnSend").textContent = T("发送")
}

function applyI18nDom() {
    var e = {
        tabServer: "服务",
        tabCli: "CLI",
        tabChat: "Chat",
        tabLogs: "日志",
        tabSettings: "设置"
    };
    for (var t in e) {
        var n = $(t);
        n && n.lastChild && 3 === n.lastChild.nodeType && (n.lastChild.textContent = T(e[t]))
    }
    for (var a = document.querySelectorAll("[data-i18n]"), o = 0; o < a.length; o++) a[o].textContent = T(a[o].getAttribute("data-i18n"));
    for (var r = document.querySelectorAll("[data-i18n-ph]"), l = 0; l < r.length; l++) r[l].placeholder = T(r[l].getAttribute("data-i18n-ph"));
    for (var i = document.querySelectorAll("[data-i18n-t]"), s = 0; s < i.length; s++) {
        var c = i[s];
        c.lastChild && 3 === c.lastChild.nodeType && (c.lastChild.textContent = T(c.getAttribute("data-i18n-t")))
    }
    var d = document.querySelectorAll("#confirmdlg button");
    d.length >= 2 && (d[0].textContent = T("取消"), d[1].textContent = T("仍要启动"));
    var p = $("btnClear");
    p && (p.textContent = T("清屏"));
    var m = $("autoScrollBadge");
    m && (m.textContent = T("自动滚动"));
    var u = $("btnMain");
    u && (u.textContent = T(u.getAttribute("data-i18n") || "启动服务"));
    var h = $("paramsCard");
    h && h.classList.contains("open") && ($("params").style.display = "flex");
    for (var g = document.querySelectorAll("[data-i18n-init]"), y = 0; y < g.length; y++) {
        var f = $(g[y].id);
        f && (f.textContent = T(g[y].getAttribute("data-i18n-init")) + (f.textContent.match(/\d+$/) || [""])[0])
    }
} ["temp", "topk", "topp", "minp", "rep"].forEach(function(e) {
    $(e).addEventListener("change", cliPushSampling)
}), $("maxtok").addEventListener("change", function() {
    var e = parseInt($("maxtok").value, 10);
    e >= 16 && e <= 4096 || (e = 1024, $("maxtok").value = e);
    try {
        var t = JSON.parse(localStorage.getItem("npullmSampling") || "{}");
        t.maxTokens = e, localStorage.setItem("npullmSampling", JSON.stringify(t))
    } catch (e) {}
}), $("sysPresets").addEventListener("click", function(e) {
    var t = e.target;
    if (t.dataset && t.classList.contains("chip")) {
        for (var n = document.querySelectorAll("#sysPresets .chip"), a = 0; a < n.length; a++) n[a].classList.remove("on");
        t.classList.add("on"), sysPrompt = SP_MAP[t.dataset.sp] || "", cliPushSampling()
    }
}), window.onHttpDone = function(e, t) {
    cliBusy = !1, $("btnSend").disabled = !1, $("btnSend").textContent = T("发送");
    var n = ((Date.now() - (window._cliT0 || Date.now())) / 1e3).toFixed(1);
    if ($("cliRaw").textContent = t && t.length > 4e3 ? t.slice(0, 4e3) + " …" : t || "(empty)", $("cliRaw").style.display = "block", "200" !== e) {
        $("cliOut").innerHTML = "";
        var a = document.createElement("div");
        return a.id = "cliErr", a.textContent = "HTTP " + e, void $("cliOut").appendChild(a)
    }
    try {
        var o = JSON.parse(t),
            r = o.choices && o.choices[0] && o.choices[0].message || {},
            l = r.content || "",
            i = r.reasoning_content || "",
            s = o.timings || {},
            c = s.predicted_per_second ? s.predicted_per_second.toFixed(1) + " t/s" : "",
            d = null != s.predicted_n ? s.predicted_n + " tok" : "";
        $("cliTiming").textContent = [n + "s", d, c].filter(Boolean).join(" · ");
        var p = (i ? T("【思考已折叠 ") + i.length + T(" 字】\n") : "") + (l || T("(空 content)"));
        $("cliOut").textContent = p
    } catch (e) {
        $("cliOut").textContent = T("解析失败：") + e.message
    }
}, setInterval(function(){if($("pageCli").classList.contains("active"))cliRefreshState()},3000);
var _bmoeOn = false,
    APP_VER = "1.4.2 fix1";

function applyTheme(e) {
    var t = "dark" === e || "auto" === e && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.body.classList.toggle("light", !t);
    for (var n = document.querySelectorAll("#themeSeg button"), a = 0; a < n.length; a++) n[a].classList.toggle("active", n[a].dataset.th === e)
}
if ($("themeSeg").addEventListener("click", function(e) {
        var t = e.target;
        if (t.dataset && t.dataset.th) {
            try {
                localStorage.setItem("npullmTheme", t.dataset.th)
            } catch (e) {}
            applyTheme(t.dataset.th)
        }
    }), window.matchMedia) try {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function() {
        var e = null;
        try {
            e = localStorage.getItem("npullmTheme")
        } catch (e) {}
        "auto" !== e && e || applyTheme(e || "auto")
    })
} catch (e) {}

function applyLang(e) {
    try {
        localStorage.setItem("npullmLang", e)
    } catch (e) {}
    if (void 0 !== LANG && "auto" !== e) {
        var t = navigator.language || "zh-CN";
        if ((e || (/^zh/i.test(t) ? "zh-TW" === t || "zh-HK" === t ? "zh-TW" : "zh-CN" : "en")) !== LANG) return void location.reload()
    }
    applyI18nDom()
}

/* fix12: 真查 GitHub Releases，不再是桩 */
function checkUpdate() {
    var hint = $("updHint");
    hint.textContent = T("检查中…");
    var cur = "v" + APP_VER.replace(" ", "-");
    var done = function(msg, lvl) { hint.textContent = msg; toast(msg, lvl); };
    var to = setTimeout(function() { done(T("检查超时，请稍后重试"), "warn"); }, 9000);
    try {
        fetch("https://api.github.com/repos/308532806/PocketOrca-LLM/releases/latest").then(function(r) { return r.json(); }).then(function(j) {
            clearTimeout(to);
            var tag = (j && j.tag_name) || "";
            if (!tag) return done(T("未能获取版本信息"), "warn");
            if (tag === cur) done(T("已是最新 ") + APP_VER, "ok");
            else done(T("发现新版本 ") + tag + T("，当前 ") + APP_VER, "warn");
        }).catch(function() { clearTimeout(to); done(T("检查失败，请检查网络"), "err"); });
    } catch (e) { clearTimeout(to); done(T("检查失败，请检查网络"), "err"); }
}

function factoryReset() {
    $("confirmText").textContent = T("将清除全部设置、缓存与已保存的 API Key，并恢复欢迎页。确定继续？"), $("confirmOkBtn").textContent = T("恢复缺省"), $("confirmdlg").style.display = "flex", window._pendingReset = !0
}

function doFactoryReset() {
    try {
        localStorage.clear()
    } catch (e) {}
    bridge("factoryReset"), location.reload()
}

function fillAbout() {
    $("aboutVer").textContent = APP_VER
    var vl = $("verLine")
    if (vl) vl.textContent = APP_VER + " · llama.cpp (MIT)"
}

function welcomeInit() {
    var e = null;
    try {
        e = JSON.parse(bridge("welcomeInfo") || "null")
    } catch (e) {}
    try { if (e) localStorage.setItem("npullmWelcome", JSON.stringify({ soc: e.soc || "", ramGB: e.ramGB || 0, cores: e.cores || 0, model: e.model || "" })); } catch (e2) {}
  e && e.shown || ($("wModel").textContent = e && e.model ? e.model : T("未知"), $("wSoc").textContent = e && e.soc ? T(e.soc) : T("未知"), $("wCores").textContent = e && e.cores ? e.cores + T(" 核") : T("未知"), $("wRam").textContent = e && e.ramGB ? e.ramGB + " GB" : T("未知"), applyI18nDom(), $("welcome").style.display = "flex")
}

function welcomeAccept() {
    bridge("welcomeDone"), $("welcome").style.display = "none"
}

function bmoeRefresh() {
    var e = null;
    try {
        e = JSON.parse(bridge("bmoeList") || "null")
    } catch (e) {}
    var t = $("bmoeList");
    if (t)
        if (e && e.models) {
            for (var n = [], a = 0; a < e.models.length; a++) {
                var o = e.models[a];
                n.push('<div style="display:flex;align-items:center;gap:6px;padding:2px 0"><span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + o.name + " · " + (o.sizeBytes / 1073741824).toFixed(2) + 'GB</span><button style="flex:none;min-width:52px;font-size:12px" onclick="bmoePick(\'' + o.name.replace(/'/g, "") + '\')">选用</button><button style="flex:none;min-width:40px;font-size:12px" onclick="bmoeDel(\'' + o.name.replace(/'/g, "") + "')\">删</button></div>")
            }
            t.innerHTML = n.length ? n.join("") : "（空 — 下载或导入）";
            var r = $("bmoeDlStat");
            e.freeBytes && (r.textContent = "可用 " + (e.freeBytes / 1073741824).toFixed(1) + "GB · /data 分区（O_DIRECT 必需）", r.style.display = "block")
        } else t.textContent = "读取失败"
}

function bmoePick(e) {
    var t = {
        name: e,
        path: "__bmoe__" + e
    };
    window.onModelPicked(t)
}

function bmoeDel(e) {
    var t = bridge("bmoeDelete", e);
    try {
        JSON.parse(t || "{}").ok ? toastT("已删除") : toastT("删除失败")
    } catch (e) {
        toastT("删除失败")
    }
    bmoeRefresh()
}

function bmoeDownload() {
    var e = ($("bmoeUrl").value || "").trim();
    if (e) {
        var t = bridge("bmoeDownload", e);
        if (t) try {
            var n = JSON.parse(t);
            n.error && toast(n.error)
        } catch (e) {} else toastT("已开始")
    } else toast("先填模型 URL")
}

function bmoeBrowse() {
    bridge("bmoeImportPick")
}
$("langSel").addEventListener("change", function() {
        applyLang(this.value)
    }),
    function() {
        if (!_bmoeOn) {
            var e = document.querySelector('#engineSeg button[data-profile="bmoe"]');
            e && (e.style.display = "none");
            var t = $("bmoeCard");
            t && (t.style.display = "none")
        }
    }(), setState("ready"), restoreParams(), applyI18nDom(), cliRestoreSampling(),
    function() {
        try {
            "1" === localStorage.getItem("npullmParamsCliOpen") && ($("paramsCliCard").classList.add("open"), $("paramsCli").style.display = "flex")
        } catch (e) {}
    }(), remoteInit(), welcomeInit(), fillAbout(),
    function() {
        var e = null;
        try {
            e = localStorage.getItem("npullmTheme")
        } catch (e) {}
        applyTheme(e || "auto");
        var t = null;
        try {
            t = localStorage.getItem("npullmLang")
        } catch (e) {}
        t && ($("langSel").value = t)
    }(),
    function() {
        try {
            var e = bridge("lastModelJson");
            e && window.onModelPicked(JSON.parse(e))
        } catch (e) {}
        localIp = bridge("getLocalIp"), refreshEndpoint(), checkPort();
    try {
      var _st = JSON.parse(bridge("getStatus") || "null");
      if (_st && _st.running) setState("running", T("运行中 · ") + (_st.port || port()));
      else if (_st && _st.state === "starting") setState("starting");
    } catch (_e) {}
    }(), window.onBmoeDlStatus = function(e) {
        var t = $("bmoeDlStat"),
            n = $("bmoeDlBar"),
            a = $("bmoeDlFill");
        if (t) {
            var o;
            try {
                o = JSON.parse(e || "{}")
            } catch (e) {
                return
            }
            if ("download" === o.phase || "import" === o.phase) {
                var r = o.total > 0 ? Math.min(100, Math.round(100 * o.bytes / o.total)) : 0;
                t.textContent = ("download" === o.phase ? "下载 " : "导入 ") + (o.idx || 1) + "/" + (o.count || 1) + " " + o.name + " " + r + "%" + (o.total > 0 ? " · " + (o.bytes / 1073741824).toFixed(2) + "/" + (o.total / 1073741824).toFixed(2) + "GB" : " · " + (o.bytes / 1073741824).toFixed(2) + "GB"), t.style.display = "block", n && (n.style.display = "block", a.style.width = r + "%", a.style.background = "var(--primary-hi)")
            } else "done" === o.phase ? (t.textContent = "完成 " + o.name, t.style.color = "var(--ok)", t.style.display = "block", n && (n.style.display = "block", a.style.width = "100%", a.style.background = "var(--ok)"), bmoeRefresh && bmoeRefresh(), setTimeout(function() {
                t.style.display = "none", n && (n.style.display = "none"), t.style.color = ""
            }, 6e3)) : "error" === o.phase ? (t.textContent = "失败：" + (o.error || "未知"), t.style.color = "var(--err)", t.style.display = "block", n && (n.style.display = "none"), setTimeout(function() {
                t.style.color = ""
            }, 6e3)) : o.error && (t.textContent = "失败：" + o.error, t.style.color = "var(--err)", t.style.display = "block", setTimeout(function() {
                t.style.color = ""
            }, 6e3))
        }
    }, setInterval(function() {
        $("bmoeDlStat");
        var e = $("bmoeCard");
        if (e && "none" !== e.style.display) {
            var t = bridge("bmoeDlStatus");
            t && window.onBmoeDlStatus && window.onBmoeDlStatus(t)
        }
    }, 3000);
/* ===== fix9: chat 跟随滚动 + 软键盘遮挡兜底（fork 新增，纯 Web 层） ===== */
var chatFollow = true;

function chatNearBottom() {
    var el = document.getElementById("chatScroll");
    return !!el && el.scrollTop + el.clientHeight >= el.scrollHeight - 24;
}

function chatUpdateFollowBtn() {
    var btn = document.getElementById("chatFollowBtn");
    if (btn) btn.style.display = (chatStreaming && !chatFollow) ? "block" : "none";
}

(function () {
    var el = document.getElementById("chatScroll");
    if (el && el.addEventListener) {
        el.addEventListener("scroll", function () {
            chatFollow = chatNearBottom();
            chatUpdateFollowBtn();
        });
    }
    var btn = document.getElementById("chatFollowBtn");
    if (btn && btn.addEventListener) {
        btn.addEventListener("click", function () {
            chatFollow = true;
            var sc = document.getElementById("chatScroll");
            if (sc) sc.scrollTop = sc.scrollHeight;
            chatUpdateFollowBtn();
        });
    }
})();

/* 软键盘弹起时若布局视口未收缩（旧 WebView / adjustPan），手动压缩 body 高度，保证输入行可见。
   新 WebView 上 viewport 的 interactive-widget=resizes-content 已处理，此处为兜底。 */
(function () {
    var vv = window.visualViewport;
    if (!vv || !vv.addEventListener) return;
    vv.addEventListener("resize", function () {
        var vh = vv.height;
        if (vh < window.innerHeight - 120) {
            document.body.style.height = vh + "px";
            var page = document.getElementById("pageChat");
            if (page && page.classList.contains("active")) {
                var row = document.getElementById("chatInputRow");
                if (row) setTimeout(function () { try { row.scrollIntoView({ block: "end" }); } catch (e) {} }, 60);
            }
        } else {
            document.body.style.height = "";
        }
    });
})();

/* v1.4.2: 启动恢复 —— 聊天历史回填 + 附件按钮接线 + 多模态可用性轮询（上游移植） */
(function () {
    try {
        var h = JSON.parse(localStorage.getItem("npullmChatHist") || "null");
        if (h && h.length) chatMsgs = h;
    } catch (e) {}
    try { bridge("chatHistPush", JSON.stringify(chatMsgs)); } catch (e) {}
    var ba = $("btnChatAttach");
    if (ba) ba.addEventListener("click", function () {
        if (chatRec99) bridge("chatRecStop", !0);
        else bridge("chatAttachMenu");
    });
    var bar = $("chatAttachBar");
    if (bar) bar.addEventListener("click", function (e) {
        var t = e.target;
        if (t && t.dataset) {
            var changed = !1;
            if (null != t.dataset.del) {
                var idx = +t.dataset.del;
                if (chatStaged[idx]) { bridge("chatAttachCancel", chatStaged[idx].ref); chatStaged.splice(idx, 1); changed = !0; }
            } else if (t.dataset.delslot) { chatSlotFile = null; changed = !0; }
            if (changed) chatAttachBar();
        }
    });
    /* 多模态/会话按钮只在服务运行且引擎支持时显示（3s 轮询，与 CLI 状态轮询同频） */
    setInterval(function () {
        var t = null;
        try { t = JSON.parse(bridge("getStatus") || "null"); } catch (e) {}
        var b = $("btnChatAttach");
        if (b) {
            var show = (t && t.running && bridge("chatMultimodalSupported")) || bridge("chatSlotsSupported");
            b.style.display = show ? "inline-block" : "none";
        }
    }, 3000);
})();
