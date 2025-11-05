# 项目结构

本文档展示 Tech News Aggregator 的完整目录结构。

## 📁 完整目录树

```
tech-news-aggregator/
│
├── 📄 README.md                    # 项目主文档
├── 📄 QUICKSTART.md                # 快速开始指南
├── 📄 DEVELOPMENT.md               # 开发指南
├── 📄 DEPLOYMENT.md                # 部署指南
├── 📄 CONTRIBUTING.md              # 贡献指南
├── 📄 CHANGELOG.md                 # 版本变更日志
├── 📄 PROJECT_STRUCTURE.md         # 本文档
├── 📄 REQUIREMENTS_CLARIFICATION.md # 需求澄清文档 (新增)
├── 📄 LICENSE                      # MIT 许可证
├── 📄 package.json                 # 根项目配置
├── 🔧 start.sh                     # 启动脚本
├── 🔒 .gitignore                   # Git 忽略配置
│
├── 📁 .github/                     # GitHub 配置
│   ├── 📁 workflows/
│   │   └── 📄 ci.yml.example       # CI/CD 示例配置
│   └── 📁 ISSUE_TEMPLATE/
│       ├── 📄 bug_report.md        # Bug 报告模板
│       └── 📄 feature_request.md   # 功能请求模板
│
├── 📁 backend/                     # 后端服务 (Node.js + Express)
│   ├── 📄 package.json             # 后端依赖配置
│   ├── 📄 package-lock.json        # 依赖锁定文件
│   ├── 🔒 .gitignore               # 后端 Git 忽略配置
│   │
│   └── 📁 src/                     # 后端源代码
│       ├── 📄 index.js             # 应用入口
│       │                           # - Express 服务器初始化
│       │                           # - 定时任务配置
│       │                           # - 启动逻辑
│       │
│       ├── 📁 routes/              # API 路由层
│       │   └── 📄 news.js          # 新闻相关路由
│       │                           # - GET  /api/news
│       │                           # - POST /api/news/refresh
│       │
│       └── 📁 services/            # 业务逻辑层
│           ├── 📄 aggregator.js    # 新闻聚合器
│           │                       # - 协调多个数据源
│           │                       # - 数据标准化
│           │                       # - 缓存管理
│           │
│           └── 📁 sources/         # 数据源实现
│               ├── 📄 hackerNews.js    # Hacker News API
│               ├── 📄 github.js        # GitHub Trending 爬虫
│               ├── 📄 devto.js         # Dev.to API
│               ├── 📄 reddit.js        # Reddit API
│               └── 📄 csdn.js          # CSDN 爬虫 (新增)
│
└── 📁 frontend/                    # 前端应用 (Vue 3 + Vite)
    ├── 📄 package.json             # 前端依赖配置
    ├── 📄 package-lock.json        # 依赖锁定文件
    ├── 📄 index.html               # HTML 模板
    ├── 📄 vite.config.js           # Vite 配置
    ├── 🔒 .gitignore               # 前端 Git 忽略配置
    │
    └── 📁 src/                     # 前端源代码
        ├── 📄 main.js              # 应用入口
        │                           # - Vue 实例创建
        │                           # - Pinia 初始化
        │                           # - Naive UI 集成
        │
        ├── 📄 App.vue              # 根组件
        │                           # - 主布局
        │                           # - 主题配置
        │                           # - 搜索和过滤逻辑 (新增)
        │
        ├── 📄 style.css            # 全局样式
        │                           # - 基础样式
        │                           # - 动画效果
        │
        ├── 📁 components/          # Vue 组件
        │   ├── 📄 Header.vue       # 头部组件
        │   │                       # - 标题和介绍
        │   │                       # - 刷新按钮
        │   │                       # - 搜索框 (新增)
        │   │                       # - 数据源筛选器 (新增)
        │   │                       # - 数据源标签
        │   │
        │   ├── 📄 NewsList.vue     # 新闻列表容器
        │   │                       # - 网格布局
        │   │                       # - 加载状态
        │   │                       # - 空状态处理
        │   │
        │   └── 📄 NewsCard.vue     # 新闻卡片
        │                           # - 卡片样式
        │                           # - 元数据显示
        │                           # - 交互逻辑
        │
        └── 📁 stores/              # Pinia 状态管理
            └── 📄 news.js          # 新闻状态
                                    # - 新闻数据
                                    # - API 调用
                                    # - 状态管理
```

## 📊 文件统计

### 代码文件

| 类型 | 数量 | 说明 |
|------|------|------|
| JavaScript | 9 | 后端逻辑 + 前端配置 |
| Vue 组件 | 4 | 前端 UI 组件 |
| CSS | 1 | 全局样式 |
| **总计** | **14** | **源代码文件** |

### 文档文件

| 文件 | 说明 |
|------|------|
| README.md | 项目概述、功能介绍、使用说明 |
| QUICKSTART.md | 5分钟快速上手指南 |
| DEVELOPMENT.md | 详细的开发指南和最佳实践 |
| DEPLOYMENT.md | 各种环境的部署教程 |
| CONTRIBUTING.md | 贡献指南和代码规范 |
| CHANGELOG.md | 版本历史和更新日志 |
| PROJECT_STRUCTURE.md | 项目结构说明（本文档） |
| **总计** | **7 个主要文档** |

### 配置文件

| 文件 | 用途 |
|------|------|
| package.json (3个) | npm 依赖管理 |
| vite.config.js | Vite 构建配置 |
| .gitignore (3个) | Git 版本控制 |
| start.sh | 启动脚本 |
| ci.yml.example | CI/CD 示例 |

## 🔍 关键文件说明

### 后端核心文件

#### `backend/src/index.js`
- **作用**: 应用入口，服务器初始化
- **关键功能**:
  - Express 服务器配置
  - CORS 中间件
  - 路由注册
  - 定时任务设置（6小时）
  - 启动时初始数据获取

#### `backend/src/services/aggregator.js`
- **作用**: 新闻聚合器核心
- **关键功能**:
  - 并发调用多个数据源
  - 错误容错处理
  - 数据标准化
  - 内存缓存管理
  - 按时间排序

#### `backend/src/services/sources/*.js`
- **作用**: 各个数据源的具体实现
- **每个文件负责**:
  - API 调用或网页爬取
  - 数据解析
  - 转换为标准格式
  - 错误处理

### 前端核心文件

#### `frontend/src/App.vue`
- **作用**: 应用根组件
- **关键功能**:
  - 全局布局
  - 主题配置（深色）
  - 消息提示容器
  - 数据加载协调

#### `frontend/src/stores/news.js`
- **作用**: 新闻数据状态管理
- **关键功能**:
  - 状态定义（news, loading, error）
  - API 调用封装
  - 数据 getters
  - 响应式更新

#### `frontend/src/components/NewsCard.vue`
- **作用**: 新闻卡片展示
- **关键功能**:
  - 卡片样式
  - 元数据格式化
  - 时间相对显示
  - 点击打开链接
  - 悬停动画效果

## 📦 依赖关系

### 后端依赖

```javascript
{
  "express": "Web 框架",
  "cors": "跨域资源共享",
  "axios": "HTTP 客户端",
  "node-cron": "定时任务",
  "cheerio": "HTML 解析器",
  "rss-parser": "RSS 解析器"
}
```

### 前端依赖

```javascript
{
  "vue": "渐进式框架",
  "vite": "构建工具",
  "pinia": "状态管理",
  "naive-ui": "UI 组件库",
  "axios": "HTTP 客户端"
}
```

## 🔄 数据流向

```
用户浏览器
    ↓
Vue 组件 (NewsCard, NewsList, Header)
    ↓
Pinia Store (news.js)
    ↓
HTTP 请求 → Vite 代理
    ↓
Express 路由 (routes/news.js)
    ↓
聚合器 (aggregator.js)
    ↓
并发调用数据源
    ├── hackerNews.js → Hacker News API
    ├── github.js → GitHub 网站爬虫
    ├── devto.js → Dev.to API
    └── reddit.js → Reddit API
    ↓
数据标准化、排序、缓存
    ↓
返回 JSON 响应
    ↓
更新 Pinia Store
    ↓
Vue 响应式更新 UI
```

## 📝 代码行数统计

```bash
# 后端代码
backend/src/**/*.js     ~400 行

# 前端代码
frontend/src/**/*.{vue,js,css}     ~700 行

# 文档
*.md     ~3000 行

# 总计：约 4100 行
```

## 🎯 扩展点

### 添加新数据源
1. 在 `backend/src/services/sources/` 创建新文件
2. 实现 `fetch<SourceName>` 函数
3. 在 `aggregator.js` 中集成
4. 在前端添加对应标签

### 添加新功能
- **搜索**: 在 `frontend/src/components/` 添加 SearchBar.vue
- **过滤**: 扩展 `stores/news.js` 添加过滤逻辑
- **收藏**: 添加 `stores/favorites.js` 和持久化
- **通知**: 集成 Web Notification API

### 数据持久化
1. 添加数据库模块（PostgreSQL/MongoDB）
2. 在 `backend/src/services/` 创建 `database.js`
3. 修改 `aggregator.js` 使用数据库而非内存缓存

## 🔐 环境变量

### 后端
```bash
PORT=3000                    # 服务端口
NODE_ENV=production          # 环境
DATABASE_URL=postgresql://   # 数据库连接（可选）
REDIS_URL=redis://           # Redis 连接（可选）
```

### 前端
```bash
VITE_API_BASE=/api          # API 基础路径
```

## 📈 性能考虑

### 后端
- ✅ 使用 `Promise.allSettled` 并发请求
- ✅ 内存缓存减少 API 调用
- ⭐ 可添加 Redis 分布式缓存
- ⭐ 可添加请求限流

### 前端
- ✅ 组件级代码分割
- ✅ CSS 动画使用 GPU 加速
- ✅ 图片懒加载
- ⭐ 可添加虚拟滚动

## 🧪 测试结构（计划）

```
tests/
├── backend/
│   ├── unit/
│   │   ├── aggregator.test.js
│   │   └── sources/
│   │       ├── hackerNews.test.js
│   │       └── ...
│   └── integration/
│       └── api.test.js
│
└── frontend/
    ├── unit/
    │   └── components/
    │       ├── NewsCard.spec.js
    │       └── ...
    └── e2e/
        └── app.spec.js
```

## 📊 构建输出

### 开发模式
```
内存中运行，支持热更新
- Backend: http://localhost:3000
- Frontend: http://localhost:5173
```

### 生产构建
```
frontend/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
```

---

**维护提示**: 添加新文件后请更新本文档，保持项目结构清晰可见。
