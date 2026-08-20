# 二刺猿笑传之猜猜呗（单机版 · Cloudflare Pages 部署）

一个猜动漫/游戏角色的网站。**本版本已精简为单机玩法**：没有联机房间、没有服务器、没有账号系统——一台电脑打开网页，和朋友轮流猜，看谁用的次数少。数据来源 [Bangumi](https://bgm.tv/)。

## ✂️ 相比原版精简了什么

| 已删除 | 说明 |
|---|---|
| 多人联机（房间/大厅/观战/同步模式） | 本机轮流玩不需要 |
| 后端服务器（Express + Socket.io + MongoDB） | 整个 `server/` 目录已移除 |
| 全局排行榜 / 角色热度统计 | 需要服务器数据库 |
| Bug 反馈 / 标签贡献 | 需要服务器存储 |
| 兑换码（头像） | 需要服务器数据库 |

**新增**：本机战绩榜（localStorage）——猜中后输入名字保存成绩，和朋友比谁猜得快，前十名记录在本机浏览器里。

## 🚀 部署到 Cloudflare Pages（唯一部署目标）

### 1. 准备工作

需要 Bangumi API 的图片/标签数据。客户端默认直连 `https://api.bgm.tv`，国内网络不稳定时可走**同源代理**（见下文第 3 步）。

### 2. 部署前端

1. 把本目录推送到 GitHub（或任意 Git 仓库）
2. Cloudflare Dashboard → **Workers 和 Pages** → **创建** → **Pages** → **连接到 Git**
3. 选择仓库，构建配置：
   - **生产分支**：`main`
   - **构建命令**：`npm install && npm run build`（在 `client/` 目录下执行）
   - **构建输出目录**：`dist`
   - **根目录**：`client`
4. 部署完成后即可访问 `https://<项目名>.pages.dev`

### 3. （推荐）启用 Bangumi API 代理

项目自带一个 Pages Function（`client/functions/bgm/[[path]].js`），把 `api.bgm.tv` 转发到你的站点同源路径下，解决直连被墙/跨域问题。前端构建时设置环境变量即可启用（客户端会先直连官方 API，失败后自动走代理）：

- Pages 项目 → **设置** → **环境变量**（Production）：
  - `VITE_BGM_ACC_API_URL` = `/bgm`
  - （可选）`BGM_UPSTREAM` = `https://api.bgm.tv`（默认值，一般不用改）
- 保存后**重新部署**一次使构建环境变量生效

> 不设置 `VITE_BGM_ACC_API_URL` 也可以玩，游戏直接访问 `api.bgm.tv`，只要你的网络能通就行。

### 4. 本机开发

```bash
cd client
npm install
npm run dev          # 开发服务器 http://localhost:5173
npm run build        # 产物在 dist/
```

本地模拟 Pages Function（含代理）：

```bash
npm run build
npx wrangler pages dev dist
```

## 🎮 玩法

- 猜一个神秘角色：搜索角色 → 作出猜测
- 每次猜测后会给出该角色的信息作为反馈：
  - 🟢 绿色：正确或非常接近；🟡 黄色：有点接近
  - ↑ / ↓：该往高/低猜
- 看谁用**最少次数**猜中 —— 本机战绩榜见分晓

## 📁 项目结构

```
client/
├── functions/bgm/[[path]].js   # Bangumi API 代理（Pages Function）
├── public/
│   ├── assets/                 # 图标等静态资源
│   ├── data/                   # 额外标签数据
│   └── _redirects              # SPA 路由回退
└── src/
    ├── pages/                  # Home / SinglePlayer（多人页已移除）
    ├── components/             # 游戏组件（反馈/贡献类组件已移除）
    ├── data/                   # 角色标签、预设等本地数据
    └── utils/                  # bangumi API 封装、缓存、本地战绩榜
```

## 📜 许可

[MIT](LICENSE)。原项目：[kennylimz/anime-character-guessr](https://github.com/kennylimz/anime-character-guessr)
