# 常见问题 (FAQ)

本文档回答关于 Tech News Aggregator 的常见问题。

## 📋 目录

- [一般问题](#一般问题)
- [安装和设置](#安装和设置)
- [使用问题](#使用问题)
- [开发问题](#开发问题)
- [部署问题](#部署问题)
- [性能和优化](#性能和优化)

## 一般问题

### Q: 这个项目是做什么的？

**A**: Tech News Aggregator 是一个技术新闻聚合平台，自动从多个来源（Hacker News、GitHub Trending、Dev.to、Reddit）收集最新的技术资讯，并以统一、美观的方式展示。

### Q: 支持哪些数据源？

**A**: 目前支持：
- 🔶 **Hacker News** - 技术新闻和讨论
- ⭐ **GitHub Trending** - 热门开源项目
- 📝 **Dev.to** - 技术博客文章
- 🤖 **Reddit r/programming** - 编程社区讨论

更多数据源正在计划中。

### Q: 这个项目是开源的吗？

**A**: 是的！使用 MIT 许可证，你可以自由使用、修改和分发。

### Q: 我可以在商业项目中使用吗？

**A**: 可以！MIT 许可证允许商业使用。

## 安装和设置

### Q: 需要什么环境？

**A**: 
- Node.js >= 18.0.0
- npm >= 9.0.0

检查版本：
```bash
node --version
npm --version
```

### Q: 如何安装依赖？

**A**: 
```bash
# 方式1: 一键安装
npm run install:all

# 方式2: 分别安装
cd backend && npm install
cd frontend && npm install
```

### Q: 安装时遇到 `npm ERR!` 错误怎么办？

**A**: 尝试以下步骤：
1. 清理 npm 缓存: `npm cache clean --force`
2. 删除 node_modules: `rm -rf node_modules package-lock.json`
3. 重新安装: `npm install`
4. 如果仍有问题，尝试使用不同的 Node.js 版本

### Q: 可以使用 Yarn 或 pnpm 吗？

**A**: 可以！项目兼容所有主流包管理器：
```bash
# Yarn
yarn install

# pnpm
pnpm install
```

## 使用问题

### Q: 如何启动应用？

**A**: 
```bash
# 使用启动脚本（推荐）
./start.sh

# 或手动启动
# 终端1: cd backend && npm run dev
# 终端2: cd frontend && npm run dev
```

### Q: 应用启动后在哪里访问？

**A**: 打开浏览器访问 http://localhost:5173

### Q: 如何更改轮询时间？

**A**: 编辑 `backend/src/index.js`，修改 cron 表达式：
```javascript
// 当前: 每 6 小时
cron.schedule('0 */6 * * *', async () => {

// 改为每 3 小时
cron.schedule('0 */3 * * *', async () => {

// 改为每小时
cron.schedule('0 * * * *', async () => {
```

Cron 表达式格式：`分 时 日 月 周`

参考：https://crontab.guru/

### Q: 可以只获取特定数据源的新闻吗？

**A**: 当前版本暂不支持，但你可以：
1. 在 `backend/src/services/aggregator.js` 中注释掉不需要的数据源
2. 或者在未来版本中，我们会添加前端过滤功能

### Q: 新闻数据保存在哪里？

**A**: 当前版本使用内存缓存。服务器重启后数据会重新获取。未来版本将支持数据库持久化。

### Q: 某些新闻源不显示内容？

**A**: 这是正常的，可能原因：
- 网络连接问题
- API 临时不可用
- 被限流或封禁

应用设计为容错，单个源失败不影响其他源。查看后端日志获取详细信息。

## 开发问题

### Q: 如何添加新的数据源？

**A**: 
1. 在 `backend/src/services/sources/` 创建新文件
2. 实现数据获取和标准化
3. 在 `aggregator.js` 中集成
4. 在前端添加相应的标签和样式

详细步骤见 [DEVELOPMENT.md](DEVELOPMENT.md#添加新数据源)

### Q: 如何调试后端？

**A**: 
```bash
cd backend
npm run dev

# 查看日志
tail -f ../backend.log

# 测试 API
curl http://localhost:3000/api/news
```

### Q: 如何调试前端？

**A**: 
1. 安装 Vue DevTools 浏览器扩展
2. 打开浏览器开发者工具
3. 在 Console 和 Network 选项卡查看日志和请求

### Q: 为什么修改代码后没有效果？

**A**: 
- **后端**: 确保使用 `npm run dev`（带 `--watch` 参数）
- **前端**: Vite 支持热更新，如果没效果尝试刷新浏览器
- 检查是否有编译错误
- 清除浏览器缓存（Ctrl+Shift+R / Cmd+Shift+R）

### Q: 如何修改样式？

**A**: 
- **全局样式**: 编辑 `frontend/src/style.css`
- **组件样式**: 在各组件的 `<style scoped>` 中修改
- **主题**: App.vue 中配置 Naive UI 主题

### Q: 如何修改 API 端口？

**A**: 
```bash
# 后端端口
PORT=4000 npm start

# 或创建 .env 文件
echo "PORT=4000" > backend/.env

# 前端代理配置
# 编辑 frontend/vite.config.js
```

### Q: 代码规范是什么？

**A**: 
- ES6+ 语法
- ES Modules (import/export)
- Vue 3 Composition API
- 组件使用 PascalCase
- 函数使用 camelCase

详见 [CONTRIBUTING.md](CONTRIBUTING.md#代码规范)

## 部署问题

### Q: 如何部署到生产环境？

**A**: 
1. 构建前端: `cd frontend && npm run build`
2. 配置后端提供静态文件
3. 使用 PM2 管理进程
4. 配置 Nginx 反向代理
5. 设置 HTTPS

详细步骤见 [DEPLOYMENT.md](DEPLOYMENT.md)

### Q: 可以用 Docker 部署吗？

**A**: 可以！项目包含 Dockerfile 示例：
```bash
docker build -t tech-news-aggregator .
docker run -d -p 3000:3000 tech-news-aggregator
```

详见 [DEPLOYMENT.md#docker-部署](DEPLOYMENT.md#docker-部署)

### Q: 支持哪些云平台？

**A**: 支持所有主流云平台：
- **Vercel** - 前端
- **Railway** - 全栈
- **AWS EC2/ECS** - 完整部署
- **阿里云** - 完整部署
- **Heroku** - 全栈

### Q: 需要数据库吗？

**A**: 当前版本不需要。使用内存缓存。如果需要持久化，可以集成 PostgreSQL 或 MongoDB。

### Q: 如何设置环境变量？

**A**: 
```bash
# 后端 (.env)
PORT=3000
NODE_ENV=production

# 前端 (.env)
VITE_API_BASE=/api
```

### Q: 如何配置 HTTPS？

**A**: 使用 Let's Encrypt 免费证书：
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 性能和优化

### Q: 应用的性能如何？

**A**: 
- 后端响应时间: < 100ms（缓存命中）
- 前端首屏加载: < 2s（取决于网络）
- 内存占用: ~50-100MB

### Q: 如何提升性能？

**A**: 
- 添加 Redis 缓存
- 启用 Gzip 压缩
- 使用 CDN 分发静态资源
- 实现代码分割
- 配置负载均衡

### Q: 支持多少并发用户？

**A**: 单实例可支持数百个并发用户。如需更高并发：
- 使用 PM2 集群模式
- 配置负载均衡
- 使用容器编排（Kubernetes）

### Q: 数据获取会很慢吗？

**A**: 不会。使用并发请求 (`Promise.allSettled`)，所有数据源同时获取，总时间取决于最慢的那个源，通常 2-5 秒。

### Q: 会消耗很多内存吗？

**A**: 不会。缓存的新闻数据通常只有几 MB。如果担心内存，可以：
- 减少每个源的获取数量
- 添加数据过期清理
- 使用 Redis 外部缓存

## 故障排查

### Q: `Error: listen EADDRINUSE: address already in use`

**A**: 端口被占用，解决方法：
```bash
# 查找占用进程
lsof -i :3000

# 杀死进程
kill -9 <PID>

# 或使用不同端口
PORT=4000 npm start
```

### Q: `Cannot GET /api/news`

**A**: 
1. 确保后端服务正在运行
2. 检查端口号是否正确
3. 查看后端日志是否有错误
4. 验证路由配置

### Q: 前端页面空白

**A**: 
1. 打开浏览器控制台查看错误
2. 确认后端 API 可访问
3. 检查网络请求是否失败
4. 清除浏览器缓存

### Q: `npm ERR! 404 Not Found`

**A**: 
1. 检查 npm 源配置
2. 尝试使用国内镜像:
```bash
npm config set registry https://registry.npmmirror.com
```

### Q: Reddit 数据源返回 403？

**A**: 这是正常的，Reddit 对爬虫限制严格。已经设置了浏览器 User-Agent，但有时仍会被限制。其他数据源不受影响。

### Q: GitHub Trending 获取失败？

**A**: GitHub 偶尔会限流。这是正常的，等待一段时间后会恢复。

## 数据和隐私

### Q: 数据是实时的吗？

**A**: 不是完全实时。数据每 6 小时自动更新一次，你也可以手动刷新。

### Q: 是否收集用户数据？

**A**: 本项目不收集任何用户数据。完全客户端渲染，无用户追踪。

### Q: 是否会被第三方平台封禁？

**A**: 
- 使用公开 API 的源（Hacker News, Dev.to, Reddit）：合规
- GitHub Trending 使用网页爬取：有风险但常见做法
- 建议自己部署时遵守各平台的 robots.txt 和服务条款

## 贡献和支持

### Q: 如何贡献代码？

**A**: 
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

详见 [CONTRIBUTING.md](CONTRIBUTING.md)

### Q: 发现 Bug 怎么办？

**A**: 在 GitHub 上创建 Issue，提供详细信息：
- Bug 描述
- 复现步骤
- 环境信息
- 错误日志

使用 [Bug 报告模板](.github/ISSUE_TEMPLATE/bug_report.md)

### Q: 如何提议新功能？

**A**: 在 GitHub 上创建 Feature Request Issue，描述：
- 功能需求
- 使用场景
- 预期效果

使用[功能请求模板](.github/ISSUE_TEMPLATE/feature_request.md)

### Q: 在哪里获得帮助？

**A**: 
1. 查看项目文档
2. 搜索现有 Issues
3. 创建新 Issue
4. 参与讨论

### Q: 项目的路线图是什么？

**A**: 查看 [CHANGELOG.md](CHANGELOG.md) 中的 "Future Enhancements" 部分。

## 高级话题

### Q: 如何集成数据库？

**A**: 
1. 安装数据库驱动（pg / mongoose）
2. 创建 `backend/src/services/database.js`
3. 修改 aggregator.js 使用数据库
4. 添加数据迁移脚本

### Q: 如何添加用户认证？

**A**: 
1. 选择认证策略（JWT / Session）
2. 安装相关包（jsonwebtoken / passport）
3. 创建用户模型和路由
4. 前端集成登录组件

### Q: 如何实现 SSR？

**A**: 可以使用 Nuxt 3（Vue SSR 框架）重构前端，或使用 Vite 的 SSR 插件。

### Q: 如何添加单元测试？

**A**: 
```bash
# 后端: 使用 Jest
npm install --save-dev jest

# 前端: 使用 Vitest
npm install --save-dev vitest @vue/test-utils
```

详见 [DEVELOPMENT.md#测试](DEVELOPMENT.md#测试要求)

### Q: 如何监控生产环境？

**A**: 集成监控服务：
- **错误追踪**: Sentry
- **性能监控**: Datadog, New Relic
- **日志**: ELK Stack, Logtail
- **正常运行时间**: UptimeRobot

## 其他

### Q: 项目名称的由来？

**A**: 简单直接 - "Tech News Aggregator" 清楚地表达了项目的目的。

### Q: 为什么选择 Vue 3 而不是 React？

**A**: 
- Vue 3 学习曲线更平缓
- Composition API 简洁优雅
- 更好的中文文档
- 项目需求下两者都合适

### Q: 有移动应用吗？

**A**: 当前只有 Web 应用（响应式设计，支持移动浏览器）。移动原生应用在长期规划中。

### Q: 支持多语言吗？

**A**: 当前只支持中文界面。国际化 (i18n) 在未来版本规划中。

### Q: 可以自定义主题吗？

**A**: 可以！Naive UI 支持主题定制。编辑 `frontend/src/App.vue` 中的主题配置。

---

## 没找到答案？

如果你的问题没有在这里列出：

1. 📖 查看其他文档:
   - [README.md](README.md) - 项目概述
   - [QUICKSTART.md](QUICKSTART.md) - 快速开始
   - [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南
   - [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南

2. 🔍 搜索 [GitHub Issues](https://github.com/your-repo/issues)

3. 💬 创建新 Issue 提问

4. 📧 联系维护者

---

**记住**: 没有愚蠢的问题！我们都是从新手开始的。

**欢迎提问，祝使用愉快！** 🎉
