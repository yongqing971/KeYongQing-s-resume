# KeYongQing-s-resume

柯永庆的在线简历网站（单页）· Online resume site of Ke Yongqing

线上地址：https://keyongqing.tech

## 简介 / About

商用密码 / 网络安全行业售后工程师的个人简历网站，单页静态站点，支持 **中文 / English / Tiếng Việt** 三种语言切换（顶栏下拉菜单，选择记忆在本地）。

A single-page static resume site for an after-sales engineer in commercial cryptography & cybersecurity. Supports Chinese / English / Vietnamese via the topbar language dropdown (choice persisted in localStorage).

## 目录结构 / Structure

```
├── index.html     # 主页面（内联 CSS/JS，含三语 i18n 字典）
├── 404.html       # 自定义 404 页
├── favicon.svg    # 站点图标
├── robots.txt     # 全站禁止搜索引擎收录（防爬联系方式）
└── assets/
    ├── avatar.jpg # 头像
    └── resume.pdf # PDF 简历（数据以此为准）
```

## 部署 / Deploy

- 基于 GitHub Pages 托管，自定义域名 `keyongqing.tech`（见 CNAME）。
- 修改后 push 到分支即可；若部署源为 `main`，需合并后再上线。
- 当前开发分支：`version/A`（多语言与站点优化改动均在此分支）。

## 隐私说明 / Privacy

- `robots.txt` 设置 `Disallow: /`，阻止搜索引擎收录，避免联系方式被抓取。
- 网页与 PDF 中的联系方式均已脱敏（手机号部分打码、邮箱 `#` 需替换为 `@`）。
- 站点仅通过不蒜子统计 PV/UV，不采集个人信息。

## 语言 / Languages

| 语言 | 切换方式 |
| --- | --- |
| 中文 | 顶栏下拉菜单选择「中文」，或 URL 加 `?lang=zh` |
| English | 顶栏下拉菜单选择「English」，或 URL 加 `?lang=en` |
| Tiếng Việt | 顶栏下拉菜单选择「Tiếng Việt」，或 URL 加 `?lang=vi` |

> 英文 / 越南语翻译为初稿，如需更正请基于《三语翻译对照表》校对后更新 `index.html` 内 I18N 字典。
