# ⚡ 快速开始指南

5 分钟内运行 Tech News Aggregator！

## 📋 前置要求

- Node.js >= 18.0.0
- npm >= 9.0.0

检查版本：
```bash
node --version
npm --version
```

## 🚀 三步启动

### 方法一：使用启动脚本 (推荐)

```bash
# 1. 进入项目目录
cd tech-news-aggregator

# 2. 赋予脚本执行权限
chmod +x start.sh

# 3. 运行启动脚本
./start.sh
```

脚本会自动：
- 检查 Node.js 环境
- 安装所有依赖
- 启动后端服务
- 启动前端服务

### 方法二：手动启动

**终端 1 - 后端服务：**
```bash
cd backend
npm install
npm run dev
```

看到以下输出表示成功：
```
🚀 Starting Tech News Aggregator...
✅ Initial news fetch completed
🌐 Server running on http://localhost:3000
📰 News will be refreshed every 6 hours
```

**终端 2 - 前端应用：**
```bash
cd frontend
npm install
npm run dev
```

看到以下输出表示成功：
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🌐 访问应用

打开浏览器访问: **http://localhost:5173**

你将看到：
- 🎨 现代化的渐变背景界面
- 📰 来自 4 个平台的最新技术新闻
- 🔄 右上角的刷新按钮
- 📊 各数据源的统计标签

## 🎯 快速测试

### 测试后端 API

```bash
# 健康检查
curl http://localhost:3000/api/health

# 获取新闻列表
curl http://localhost:3000/api/news

# 手动刷新新闻
curl -X POST http://localhost:3000/api/news/refresh
```

### 测试前端功能

1. **查看新闻**: 页面加载后自动显示最新新闻
2. **手动刷新**: 点击右上角"刷新"按钮
3. **查看详情**: 点击任意新闻卡片在新标签页打开原文
4. **响应式测试**: 调整浏览器窗口大小查看自适应效果

## 📱 界面功能说明

### 头部区域
- **标题**: Tech News Aggregator 🚀
- **刷新按钮**: 立即获取最新新闻
- **更新时间**: 显示上次更新的时间
- **数据源标签**: 显示所有接入的数据源

### 新闻卡片
- **来源标识**: 彩色标签显示新闻来源
- **标题**: 新闻标题（最多两行）
- **描述**: 简短摘要（如有）
- **元数据**: 作者、点赞数、评论数、编程语言等
- **标签**: 相关主题标签
- **发布时间**: 相对时间显示（如"2小时前"）

## ⚙️ 配置选项

### 修改轮询间隔

编辑 `backend/src/index.js`:

```javascript
// 当前: 每 6 小时
cron.schedule('0 */6 * * *', async () => {

// 改为每 3 小时
cron.schedule('0 */3 * * *', async () => {

// 改为每小时
cron.schedule('0 * * * *', async () => {
```

### 修改端口

**后端端口**:
```bash
# 方式1: 环境变量
PORT=4000 npm start

# 方式2: 创建 .env 文件
echo "PORT=4000" > backend/.env
```

**前端端口**:
编辑 `frontend/vite.config.js`:
```javascript
server: {
  port: 8080  // 改为你想要的端口
}
```

### 添加新数据源

参考 [DEVELOPMENT.md](DEVELOPMENT.md#添加新数据源) 了解详细步骤。

## 🐛 常见问题

### Q1: npm install 失败

**解决方案**:
```bash
# 清理缓存
npm cache clean --force

# 删除 node_modules 重新安装
rm -rf node_modules package-lock.json
npm install
```

### Q2: 端口被占用

**解决方案**:
```bash
# 查找占用端口的进程
lsof -i :3000  # 或 :5173

# 杀死进程
kill -9 <PID>

# 或使用不同端口
PORT=4000 npm start
```

### Q3: 前端无法连接后端

**解决方案**:
1. 确保后端服务正在运行
2. 检查浏览器控制台是否有 CORS 错误
3. 确认后端端口为 3000
4. 检查 `vite.config.js` 中的代理配置

### Q4: 某些新闻源不显示

这是正常的，可能原因：
- 网络问题
- API 限流
- 源网站暂时不可用

应用设计为容错，单个源失败不影响其他源。

## 📚 下一步

- 阅读 [README.md](README.md) 了解项目详情
- 查看 [DEVELOPMENT.md](DEVELOPMENT.md) 学习开发指南
- 参考 [DEPLOYMENT.md](DEPLOYMENT.md) 部署到生产环境

## 🎉 成功运行！

如果你看到了新闻列表，恭喜！应用已成功运行。

现在你可以：
1. ✅ 浏览最新的技术新闻
2. 🔄 点击刷新获取最新内容
3. 🔗 点击新闻卡片阅读详情
4. 🛠️ 开始自定义和扩展功能

---

**需要帮助？** 查看详细文档或提交 Issue。

**喜欢这个项目？** 给个 Star ⭐ 支持一下！
