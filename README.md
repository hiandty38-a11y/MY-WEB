# HGEF 基金会 · 内部存档网站

本项目世界观「人类辉光」的官方展示站，采用 SCP 基金会/Control 风格的冷峻档案视觉。

## 运行

```bash
node site/serve.mjs
```

然后打开：

```
http://localhost:4310/site/
```

`serve.mjs` 以当前目录为服务根。图片已收拢到本站 `images/` 文件夹内，因此 `site/` 目录可整体上传做静态托管，无需依赖项目其他目录。

## 页面

| 路径 | 内容 | 对应设定文件 |
| --- | --- | --- |
| `index.html` | 门厅 · 档案目录与重点档案 | — |
| `worldview.html` | 圣典 · 辉光信仰与创世经 | `世界观设定.md` |
| `manual.html` | 规程 · HGEF-PRO-001 | `HGEF基金会规程.md` |
| `operations.html` | 行动台账 · HGEF-PRO-002 | `HGEF异常处理记录.md` |
| `object.html` | 事件档案 · HGEF-ARC-001 | `HGEF异常处理记录.md` |
| `story.html` | 故事档案 · 兰陵花不再开放 | `兰陵花不再开放.md` |

## 结构

- `assets/style.css` — 全部视觉样式（档案风、密级章、遮蔽符、响应式）
- `assets/common.js` — 共享导航/页脚/状态栏注入、访问门禁、滚动显现、对象页接触闸门
- `assets/hgef-logo.jpg` — HGEF FOUNDATION 圆形徽记
- `images/hgef-arc-001/` — 本站使用的物证图档（已复制到此，自包含）
- `serve.mjs` — 轻量静态服务器

开发/自检用的浏览器脚本与渲染截图存放在仓库根目录的 `site-tools/`（与本站部署无关，无需上传）。

## 交互

- 首次访问会弹出「圣务接入」终端，输入识别号或直接点击「接入档案库」进入。
- 事件档案页（`object.html`）需先点击「确认接触 · 继续查阅」才会显示正文。
- 文本中的 `██` 遮蔽符悬停可暂时显隐（认知危害设定）。
- 首次进入后同一次会话不再重复弹出门禁。

## 上线

本站为纯静态站点，可整体上传到任意静态托管（Netlify / Vercel / Cloudflare Pages / GitHub Pages 等）。
上传 `site/` 文件夹内的全部内容即可；让 `index.html` 位于站点根目录。
