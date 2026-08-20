# 二刺猿笑传之猜猜呗（单机版）

一个猜动漫/游戏角色的网站，数据来源 [Bangumi](https://bgm.tv/)。单机玩法：一台电脑，朋友轮流猜，成绩记录在浏览器本地（localStorage），前十名可查。

## 部署

使用 Cloudflare Pages：

- 根目录：`client`
- 构建命令：`npm install`
- 部署命令：`npm run build`
- 输出目录：`dist`
- 生产分支：`main`

可选环境变量：`VITE_BGM_ACC_API_URL=/bgm`。设置后客户端直连官方 Bangumi API 失败时会自动切换到站内同源代理（`client/functions/bgm/[[path]].js`），解决 API 被墙或跨域问题。

## 开发

```bash
cd client
npm install
npm run dev
```

本地模拟 Pages 环境：

```bash
npm run build
npx wrangler pages dev dist
```

## 说明

本项目为单机版：无后端服务器。游戏数据来自 Bangumi API（官方直连，失败时自动切换到站内同源代理），成绩记录保存在浏览器本地。
