# 🚀 Tech News Aggregator - 技术新闻聚合器

一个现代化的技术新闻聚合平台，实时收集并展示来自多个技术论坛和社交平台的最新技术资讯和工具新闻。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![Vue.js Version](https://img.shields.io/badge/vue-3.x-brightgreen)](https://vuejs.org/)

## 📚 文档导航

- 📖 [快速开始](QUICKSTART.md) - 5分钟内运行项目
- 💻 [开发指南](DEVELOPMENT.md) - 详细的开发文档
- 🚀 [部署指南](DEPLOYMENT.md) - 各种环境的部署教程
- 🤝 [贡献指南](CONTRIBUTING.md) - 如何为项目做贡献
- 📋 [项目结构](PROJECT_STRUCTURE.md) - 完整的目录结构说明
- ❓ [常见问题](FAQ.md) - 常见问题解答
- 📝 [更新日志](CHANGELOG.md) - 版本历史和更新记录

## ✨ 特性

- 🔄 **自动轮询更新**：每 6 小时自动抓取最新技术资讯
- 🖱️ **手动刷新**：支持用户手动触发立即刷新
- 🌐 **多源聚合**：集成多个主流技术平台
  - 🔶 Hacker News - 技术新闻和讨论
  - ⭐ GitHub Trending - 热门开源项目
  - 📝 Dev.to - 技术博客文章
  - 🤖 Reddit r/programming - 编程社区讨论
  - 💻 CSDN - 中文技术社区
- 🔍 **智能搜索**：支持关键词搜索新闻标题、描述和作者
- 🎛️ **源选择器**：用户可自主选择显示哪些数据源的内容
- 🎨 **现代化界面**：基于 Naive UI 的精美响应式设计（深色主题）
- 📱 **移动端适配**：完美支持各种屏幕尺寸
- ⚡ **高性能**：基于 Vue 3 和 Vite 的快速响应

## 🛠️ 技术栈

### 前端
- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Naive UI** - Vue 3 组件库
- **Pinia** - Vue 状态管理
- **Axios** - HTTP 客户端

### 后端
- **Node.js** - JavaScript 运行时
- **Express** - Web 应用框架
- **Node-cron** - 定时任务调度
- **Axios** - HTTP 请求库
- **Cheerio** - HTML 解析器（用于网页抓取）

## 📦 项目结构

```
tech-news-aggregator/
├── backend/                 # 后端服务
│   ├── src/
│   │   ├── index.js        # 应用入口
│   │   ├── routes/         # 路由定义
│   │   │   └── news.js
│   │   └── services/       # 业务逻辑
│   │       ├── aggregator.js
│   │       └── sources/    # 各数据源实现
│   │           ├── hackerNews.js
│   │           ├── github.js
│   │           ├── devto.js
│   │           └── reddit.js
│   └── package.json
│
├── frontend/               # 前端应用
│   ├── src/
│   │   ├── main.js        # 应用入口
│   │   ├── App.vue        # 根组件
│   │   ├── components/    # Vue 组件
│   │   │   ├── Header.vue
│   │   │   ├── NewsList.vue
│   │   │   └── NewsCard.vue
│   │   ├── stores/        # Pinia 状态管理
│   │   │   └── news.js
│   │   └── style.css      # 全局样式
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md              # 项目文档
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装依赖

#### 1. 安装后端依赖

```bash
cd backend
npm install
```

#### 2. 安装前端依赖

```bash
cd frontend
npm install
```

### 运行应用

#### 开发模式

**启动后端服务：**

```bash
cd backend
npm run dev
```

后端服务将在 `http://localhost:3000` 启动

**启动前端应用：**

在新的终端窗口中：

```bash
cd frontend
npm run dev
```

前端应用将在 `http://localhost:5173` 启动

现在打开浏览器访问 `http://localhost:5173` 即可看到应用界面。

#### 生产模式

**构建前端：**

```bash
cd frontend
npm run build
```

**启动后端：**

```bash
cd backend
npm start
```

## 📖 使用说明

### 基本使用

1. **自动更新**：应用启动后会立即抓取一次新闻，之后每 6 小时自动更新
2. **手动刷新**：点击界面右上角的"刷新"按钮可立即更新新闻
3. **关键词搜索**：在顶部搜索框输入关键词，实时过滤新闻内容
4. **数据源筛选**：勾选或取消勾选数据源复选框，自定义显示的新闻来源
5. **查看详情**：点击任意新闻卡片可在新标签页打开原文链接
6. **源标识**：每个新闻卡片顶部显示彩色标签标识其来源

### API 接口

后端提供以下 API 接口：

#### 获取新闻列表

```
GET /api/news
```

返回缓存的新闻数据。

**响应示例：**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "lastUpdate": "2024-01-01T00:00:00.000Z"
  }
}
```

#### 刷新新闻

```
POST /api/news/refresh
```

触发立即抓取最新新闻。

**响应示例：**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "lastUpdate": "2024-01-01T00:00:00.000Z"
  },
  "message": "News refreshed successfully"
}
```

#### 健康检查

```
GET /api/health
```

检查服务状态。

## 🔧 配置说明

### 后端配置

可以通过环境变量配置后端服务：

- `PORT`: 后端服务端口（默认：3000）

创建 `backend/.env` 文件：

```env
PORT=3000
```

### 前端配置

可以通过环境变量配置前端应用：

- `VITE_API_BASE`: API 基础路径（默认：/api）

创建 `frontend/.env` 文件：

```env
VITE_API_BASE=/api
```

### 修改轮询时间

在 `backend/src/index.js` 中修改 cron 表达式：

```javascript
// 当前：每 6 小时执行一次
cron.schedule('0 */6 * * *', async () => {
  // ...
});

// 示例：每 3 小时执行一次
cron.schedule('0 */3 * * *', async () => {
  // ...
});

// 示例：每小时执行一次
cron.schedule('0 * * * *', async () => {
  // ...
});
```

## 🎨 界面预览

应用采用现代化的渐变背景和卡片式布局：

- **响应式网格布局**：自动适配不同屏幕尺寸
- **深色主题**：使用 Naive UI 的深色主题
- **流畅动画**：页面切换和数据加载都有优雅的过渡效果
- **视觉层次**：通过颜色和标签区分不同来源的内容

## 🔍 数据源说明

### Hacker News
- 抓取前 10 条热门新闻
- 包含标题、链接、作者、点赞数、评论数

### GitHub Trending
- 抓取当天热门仓库前 10 个
- 包含项目名称、描述、Star 数、编程语言

### Dev.to
- 获取近 7 天最受欢迎的文章前 10 篇
- 包含标题、描述、作者、点赞数、封面图

### Reddit r/programming
- 抓取热门帖子前 10 条
- 包含标题、链接、作者、投票数、评论数

### CSDN
- 抓取首页热门技术文章前 10 篇
- 包含标题、链接、描述、作者、浏览数、评论数
- 提供中文技术内容，更适合国内开发者

## 🛡️ 错误处理

应用具有完善的错误处理机制：

- **数据源失败**：单个数据源失败不影响其他源
- **网络超时**：自动重试和降级处理
- **数据验证**：确保返回数据的完整性

## 🚧 后续优化方向

- [x] 实现新闻搜索和过滤功能
- [x] 添加数据源选择功能
- [x] 支持中文技术社区（CSDN）
- [ ] 添加数据库持久化存储
- [ ] 添加用户收藏和标记功能
- [ ] 支持更多数据源（掘金、思否、V2EX 等）
- [ ] 添加数据可视化分析
- [ ] 实现服务端渲染 (SSR)
- [ ] 添加单元测试和集成测试
- [ ] Docker 容器化部署
- [ ] 添加用户自定义关键词订阅功能
- [ ] 实现新闻推送通知

## 📝 开发规范

### 代码风格

- 使用 ES6+ 语法
- 遵循 Vue 3 Composition API 最佳实践
- 组件命名采用 PascalCase
- 文件命名采用 camelCase

### Git 提交规范

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或辅助工具变动

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 👨‍💻 作者

Tech News Aggregator Team

---

**⭐ 如果这个项目对你有帮助，请给一个 Star！**
