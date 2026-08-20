# 动漫角色猜猜呗 - 纯前端版

## 🚀 快速部署

### Vercel（推荐）

1. 将代码推送到 GitHub
2. 访问 https://vercel.com/ 并登录
3. 导入仓库 → 点击 Deploy
4. 完成！获得专属域名

### Cloudflare Pages

1. 推送到 GitHub
2. 访问 https://dash.cloudflare.com/ → Workers & Pages
3. Connect to Git → 选择仓库
4. Build command: `npm run build`
5. Output directory: `dist`
6. 点击 Save and Deploy

详细步骤见 **部署指南.md**

## 📦 本地运行

```bash
npm install
npm run dev
```

访问 http://localhost:5173

## 🏗️ 构建

```bash
npm run build
```

生成的 `dist` 文件夹可部署到任何静态托管服务。

