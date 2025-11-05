# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-11-05

### Added

#### 新功能
- 🔍 **关键词搜索功能**：用户可以在搜索框输入关键词，实时过滤新闻标题、描述和作者
- 🎛️ **数据源选择器**：用户可以自主选择显示哪些数据源的内容，支持多选
- 💻 **CSDN 数据源**：新增中文技术社区 CSDN 作为数据源，提供国内技术资讯

#### 界面改进
- 🎨 **深色主题优化**：修复了白色文字在浅色背景上显示不清的问题
- 🎨 **现代化卡片设计**：使用深色半透明背景，提升视觉效果
- 🎨 **Header 组件增强**：添加搜索框和数据源筛选组件
- 🎨 **更好的对比度**：调整文字颜色以提供更好的可读性

#### 技术改进
- ⚡ **计算属性优化**：使用 Vue 3 computed 实现高效的过滤逻辑
- ⚡ **响应式搜索**：实时搜索，无需点击搜索按钮
- 🛡️ **CSDN 爬虫**：实现了稳定的 CSDN 首页热门文章抓取

### Changed
- 📱 移动端布局优化，数据源筛选在小屏幕上更易用
- 🎨 统一深色主题配色方案
- 📝 更新所有相关文档（README、DEVELOPMENT、CHANGELOG）

### Fixed
- 🐛 修复白色文字在浅色背景上不可见的问题
- 🐛 修复卡片 hover 效果在深色主题下不明显的问题
- 🎨 调整 border 和 shadow 颜色以适配深色主题

## [1.0.0] - 2024-11-04

### Added

#### 核心功能
- 🎉 初始版本发布
- 🔄 自动轮询机制：每 6 小时自动抓取最新技术资讯
- 🖱️ 手动刷新功能：用户可随时点击刷新按钮更新内容
- 📡 多数据源支持：
  - Hacker News - 技术新闻和讨论
  - GitHub Trending - 热门开源项目
  - Dev.to - 技术博客文章
  - Reddit r/programming - 编程社区讨论

#### 技术实现
- ✨ Vue 3 前端框架 with Composition API
- ⚡ Vite 构建工具提供快速开发体验
- 🎨 Naive UI 组件库实现现代化界面
- 🗄️ Pinia 状态管理
- 🚀 Express.js 后端服务
- ⏰ Node-cron 定时任务调度
- 🌐 RESTful API 设计

#### 用户界面
- 💎 渐变背景设计
- 📱 响应式布局，支持移动端
- 🎭 深色主题
- ✨ 流畅的动画效果
- 🏷️ 卡片式新闻展示
- 🔖 标签和元数据展示

#### 开发工具
- 📝 完整的项目文档
  - README.md - 项目概述
  - QUICKSTART.md - 快速开始指南
  - DEVELOPMENT.md - 开发指南
  - DEPLOYMENT.md - 部署指南
- 🔧 启动脚本 (start.sh)
- 🐳 Docker 支持
- 📋 CI/CD 示例配置

#### 数据特性
- 🔀 并发数据获取
- 🛡️ 错误容错机制
- 📊 数据标准化
- ⏱️ 相对时间显示
- 🏷️ 智能标签分类

### Technical Details

#### API 端点
- `GET /api/health` - 健康检查
- `GET /api/news` - 获取新闻列表
- `POST /api/news/refresh` - 手动刷新新闻

#### 项目结构
```
tech-news-aggregator/
├── backend/              # Node.js 后端
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   └── services/
│   └── package.json
├── frontend/             # Vue 3 前端
│   ├── src/
│   │   ├── components/
│   │   ├── stores/
│   │   └── App.vue
│   └── package.json
├── README.md
├── QUICKSTART.md
├── DEVELOPMENT.md
├── DEPLOYMENT.md
├── CHANGELOG.md
├── LICENSE
└── start.sh
```

#### 性能优化
- ✅ 内存缓存机制
- ✅ 并发请求优化
- ✅ 懒加载支持
- ✅ 组件级性能优化

#### 代码质量
- ✅ ES Modules 模块化
- ✅ 清晰的代码结构
- ✅ 统一的命名规范
- ✅ 完善的错误处理
- ✅ 详细的代码注释

### Known Limitations

- Reddit API 可能因 User-Agent 限制返回 403（已优化）
- 数据当前存储在内存中，重启后丢失
- 暂不支持用户认证和个性化
- CSDN 爬虫可能因网站结构变化需要调整

### Future Enhancements

计划在未来版本中添加：

#### v1.2.0 (计划中)
- [ ] 数据持久化 (PostgreSQL/MongoDB)
- [ ] 用户收藏功能
- [ ] 更多中文数据源（掘金、思否、V2EX）
- [ ] 单元测试和集成测试
- [ ] 关键词订阅和通知

#### v1.3.0 (计划中)
- [ ] 用户账户系统
- [ ] 个性化推荐
- [ ] RSS 订阅功能
- [ ] 邮件通知
- [ ] 数据可视化分析

#### v2.0.0 (长期规划)
- [ ] 服务端渲染 (SSR)
- [ ] PWA 支持
- [ ] 移动应用 (React Native)
- [ ] 机器学习推荐算法
- [ ] 多语言支持

## Release Notes

### 如何升级

从源代码升级：
```bash
git pull origin main
cd backend && npm install && cd ..
cd frontend && npm install && npm run build && cd ..
pm2 restart tech-news-aggregator
```

从 Docker 升级：
```bash
docker pull tech-news-aggregator:latest
docker stop tech-news-aggregator
docker rm tech-news-aggregator
docker run -d --name tech-news-aggregator -p 3000:3000 tech-news-aggregator:latest
```

## Contributors

感谢所有为这个项目做出贡献的开发者！

## Support

如果你遇到任何问题或有功能建议：
1. 查看 [QUICKSTART.md](QUICKSTART.md) 常见问题
2. 阅读 [DEVELOPMENT.md](DEVELOPMENT.md) 开发指南
3. 提交 GitHub Issue
4. 发送邮件反馈

---

**版本命名规则**:
- 主版本号：重大架构变更或不兼容更新
- 次版本号：新功能添加，向后兼容
- 修订号：Bug 修复和小改进

**Emoji 说明**:
- 🎉 新功能
- 🐛 Bug 修复
- 📝 文档更新
- 🔧 配置更改
- ⚡ 性能优化
- 🎨 UI/样式改进
- ♻️ 代码重构
- 🔒 安全更新
