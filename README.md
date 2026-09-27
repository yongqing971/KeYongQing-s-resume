# KeYongQing-s-resume

柯永庆的在线简历网站（单页）· Online resume site of Ke Yongqing

线上地址：https://keyongqing.tech

## 简介 / About

商用密码 / 网络安全行业产品交付与售后工程师的个人简历网站，单页静态站点，支持 **中文 / English / Tiếng Việt** 三种语言一键切换，**浅色 / 深色**双主题一键切换（选择均记忆在本地）。

A single-page static resume site for a product-delivery & after-sales engineer in commercial cryptography & cybersecurity. Supports Chinese / English / Vietnamese one-click language switching and light / dark theme switching (both persisted in localStorage).

## 目录结构 / Structure

```
├── index.html          # 主页面（结构层，样式与逻辑拆分到 assets）
├── 404.html            # 自定义 404 页（跟随黑白新拟态视觉）
├── favicon.svg         # 站点图标（黑白 + 信号青绿）
├── robots.txt          # 全站禁止搜索引擎收录（防爬联系方式）
└── assets/
    ├── avatar.jpg      # 头像（皮卡丘）
    ├── 柯永庆_简历.pdf          # 中文简历 PDF（中文界面下下载）
    ├── Ke_Yongqing_Resume_EN.pdf  # 英文简历 PDF（English 界面下下载）
    ├── Ke_Yongqing_Resume_VI.pdf  # 越南语简历 PDF（Tiếng Việt 界面下下载）
    ├── css/
    │   └── style.css   # 全站样式：黑白新拟态 token、深浅双主题、响应式、打印样式
    └── js/
        ├── i18n.js     # 三语 i18n 字典（zh / en / vi）
        └── main.js     # 交互：主题切换、语言、数据 count-up、终端打字、项目筛选、滚动渐显
```

## 功能亮点 / Highlights

- 黑白两色主导 + 信号青绿（#00BE77 / #00D68F）衬托，新拟态双光源凹凸质感。
- 数据条数字滚动 count-up；终端卡打字动画；项目经验按 银行 / 政务 / 医疗 筛选。
- 三语（中 / 英 / 越）一次性全量，URL `?lang=` → localStorage → 默认中文。
- 深浅模式：跟随系统 + 手动切换；`prefers-reduced-motion` 全部兜底。

## 部署 / Deploy

- 基于 GitHub Pages 托管，自定义域名 `keyongqing.tech`（见 CNAME）。
- 纯静态多文件站点，拆分后依旧可直接发布 GitHub Pages（相对路径引用）。
- 当前开发分支：`version/B`（V2 黑白新拟态改版；`version/A` 为 V1 版本，`main` 保留历史）。

## 隐私说明 / Privacy

- `robots.txt` 设置 `Disallow: /`，阻止搜索引擎收录，避免联系方式被抓取。
- 网页中的联系方式均已脱敏（手机号部分打码、邮箱 `#` 需替换为 `@`）；下载附件为原版 PDF。
- 站点仅通过不蒜子统计 PV/UV，不采集个人信息。

## 语言 / Languages

| 语言 | 切换方式 |
| --- | --- |
| 中文 | 顶栏语言下拉框「中文」，或 URL 加 `?lang=zh` |
| English | 顶栏语言下拉框「English」，或 URL 加 `?lang=en` |
| Tiếng Việt | 顶栏语言下拉框「Tiếng Việt」，或 URL 加 `?lang=vi` |

> 下载简历随界面语言联动：中文 → `柯永庆_简历.pdf`，English → `Ke_Yongqing_Resume_EN.pdf`，Tiếng Việt → `Ke_Yongqing_Resume_VI.pdf`；页脚声明中的文件名同步显示。

> 英文 / 越南语翻译为初稿，如需更正请基于《三语翻译对照表》校对后更新 `assets/js/i18n.js` 字典。
