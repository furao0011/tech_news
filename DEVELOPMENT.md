# 开发指南

本文档提供项目的详细开发信息和最佳实践。

## 项目架构

### 技术选型理由

#### 前端
- **Vue 3**: 使用 Composition API，提供更好的代码组织和类型推断
- **Vite**: 极快的冷启动和热更新，提升开发体验
- **Naive UI**: 完整的 Vue 3 组件库，支持 TypeScript，主题定制能力强
- **Pinia**: Vue 官方推荐的状态管理工具，API 简洁直观

#### 后端
- **Express**: 成熟稳定的 Node.js Web 框架
- **Node-cron**: 简单可靠的定时任务库
- **Cheerio**: 服务端 DOM 操作库，用于网页解析
- **Axios**: 功能强大的 HTTP 客户端

### 目录结构说明

```
backend/
├── src/
│   ├── index.js              # 应用入口，初始化服务器和定时任务
│   ├── routes/               # 路由层：定义 API 端点
│   │   └── news.js          # 新闻相关路由
│   └── services/             # 服务层：业务逻辑
│       ├── aggregator.js    # 聚合器：协调多个数据源
│       └── sources/          # 数据源：每个文件负责一个平台
│           ├── hackerNews.js
│           ├── github.js
│           ├── devto.js
│           ├── reddit.js
│           └── csdn.js      # 新增：CSDN 数据源

frontend/
├── src/
│   ├── main.js               # 应用入口
│   ├── App.vue              # 根组件：包含搜索和过滤逻辑
│   ├── components/           # Vue 组件
│   │   ├── Header.vue       # 头部组件：标题、刷新、搜索、源选择
│   │   ├── NewsList.vue     # 列表容器：负责布局
│   │   └── NewsCard.vue     # 卡片组件：单条新闻展示
│   ├── stores/               # Pinia 状态管理
│   │   └── news.js          # 新闻状态和 API 调用
│   └── style.css            # 全局样式
```

## 数据流

### 后端数据流
```
定时任务/API 请求
    ↓
aggregator.js (协调器)
    ↓
并发调用各数据源
    ├── hackerNews.js
    ├── github.js
    ├── devto.js
    ├── reddit.js
    └── csdn.js (新增)
    ↓
聚合、排序、缓存
    ↓
返回标准化数据
```

### 前端数据流
```
用户操作/页面加载
    ↓
Vue 组件触发 (App.vue)
    ↓
    ├── 关键词搜索 → 过滤标题/描述/作者
    ├── 源选择 → 过滤数据源
    └── computed 计算过滤后的新闻
    ↓
Pinia Store 调用 (news.js)
    ↓
HTTP 请求 → 后端 API
    ↓
更新 Store 状态
    ↓
组件响应式更新 (NewsList → NewsCard)
```

## 数据标准化

所有数据源返回的数据都会被标准化为统一格式：

```javascript
{
  id: string,              // 唯一标识符，格式: source-identifier
  title: string,           // 新闻标题
  url: string,            // 原文链接
  source: string,          // 来源名称
  sourceIcon: string,      // 来源图标 emoji
  author: string,          // 作者
  publishedAt: string,     // ISO 8601 格式时间
  
  // 可选字段
  description?: string,    // 描述/摘要
  points?: number,         // 点赞数/Star 数
  comments?: number,       // 评论数
  coverImage?: string,     // 封面图
  language?: string,       // 编程语言 (GitHub)
  tags?: string[]         // 标签
}
```

## 添加新数据源

### 1. 创建数据源文件

在 `backend/src/services/sources/` 创建新文件，例如 `producthunt.js`:

```javascript
import axios from 'axios';

const PRODUCT_HUNT_API = 'https://api.producthunt.com/v2/api/graphql';

export const fetchProductHunt = async () => {
  try {
    // 实现数据获取逻辑
    const response = await axios.get('...');
    
    // 返回标准化格式
    return response.data.map(item => ({
      id: `ph-${item.id}`,
      title: item.name,
      url: item.url,
      source: 'Product Hunt',
      sourceIcon: '🚀',
      author: item.user.name,
      points: item.votes_count,
      publishedAt: item.created_at,
      tags: item.topics
    }));
  } catch (error) {
    console.error('Error fetching Product Hunt:', error.message);
    return [];
  }
};
```

### 2. 集成到聚合器

在 `backend/src/services/aggregator.js` 中导入并使用：

```javascript
import { fetchProductHunt } from './sources/producthunt.js';

export const fetchAllNews = async () => {
  const [hn, gh, devto, reddit, ph] = await Promise.allSettled([
    fetchHackerNews(),
    fetchGitHubTrending(),
    fetchDevTo(),
    fetchRedditProgramming(),
    fetchProductHunt()  // 新增
  ]);
  
  // ... 处理结果
};
```

### 3. 更新前端显示

在 `frontend/src/components/Header.vue` 添加新的标签：

```vue
<n-tag type="primary" round>
  <span class="stat-icon">🚀</span> Product Hunt
</n-tag>
```

在 `frontend/src/components/NewsCard.vue` 的 `getSourceType` 函数中添加：

```javascript
const getSourceType = (source) => {
  // ...
  if (source.includes('Product Hunt')) return 'primary';
  return 'default';
};
```

## 开发最佳实践

### 错误处理

每个数据源都应该：
1. 使用 try-catch 捕获错误
2. 记录错误日志但不中断其他源
3. 返回空数组而不是抛出异常

```javascript
export const fetchSource = async () => {
  try {
    // 数据获取逻辑
  } catch (error) {
    console.error('Error fetching Source:', error.message);
    return [];  // 返回空数组
  }
};
```

### API 调用优化

1. **设置超时**: 避免请求挂起
```javascript
axios.get(url, { timeout: 10000 });
```

2. **并发控制**: 使用 `Promise.allSettled` 而不是 `Promise.all`
```javascript
const results = await Promise.allSettled([...]);
```

3. **请求头**: 设置合适的 User-Agent
```javascript
headers: {
  'User-Agent': 'Mozilla/5.0 ...'
}
```

### 组件开发

1. **使用 Composition API**: 更好的逻辑复用
```vue
<script setup>
import { ref, computed } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
</script>
```

2. **Props 验证**: 确保类型安全
```javascript
defineProps({
  item: {
    type: Object,
    required: true
  }
});
```

3. **事件命名**: 使用 kebab-case
```javascript
defineEmits(['update-news', 'delete-item']);
```

## 调试技巧

### 后端调试

1. **查看日志**:
```bash
cd backend
npm run dev
# 或查看日志文件
tail -f ../backend.log
```

2. **测试 API**:
```bash
# 获取新闻
curl http://localhost:3000/api/news

# 刷新新闻
curl -X POST http://localhost:3000/api/news/refresh

# 健康检查
curl http://localhost:3000/api/health
```

### 前端调试

1. **Vue DevTools**: 安装 Vue DevTools 浏览器扩展

2. **检查网络请求**: 打开浏览器开发工具的 Network 选项卡

3. **状态调试**: Pinia 支持时间旅行调试

## 性能优化

### 后端优化

1. **缓存策略**: 当前使用内存缓存，可扩展为 Redis
2. **限流**: 避免频繁请求外部 API
3. **数据压缩**: 启用 gzip 压缩

```javascript
import compression from 'compression';
app.use(compression());
```

### 前端优化

1. **懒加载**: 大组件使用动态导入
```javascript
const BigComponent = defineAsyncComponent(() =>
  import('./components/BigComponent.vue')
);
```

2. **虚拟滚动**: 大列表使用虚拟滚动
3. **图片优化**: 使用懒加载和 WebP 格式

## 测试

### 后端测试示例

```javascript
// tests/aggregator.test.js
import { fetchAllNews } from '../src/services/aggregator.js';

describe('News Aggregator', () => {
  it('should fetch news from all sources', async () => {
    const result = await fetchAllNews();
    expect(result.items).toBeInstanceOf(Array);
    expect(result.items.length).toBeGreaterThan(0);
  });
});
```

### 前端测试示例

```javascript
// tests/NewsCard.spec.js
import { mount } from '@vue/test-utils';
import NewsCard from '../src/components/NewsCard.vue';

describe('NewsCard', () => {
  it('renders news title', () => {
    const wrapper = mount(NewsCard, {
      props: {
        item: {
          title: 'Test News',
          source: 'Test Source'
        }
      }
    });
    expect(wrapper.text()).toContain('Test News');
  });
});
```

## 部署

### Docker 部署

创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 安装依赖
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/
RUN cd backend && npm ci
RUN cd frontend && npm ci

# 复制源代码
COPY backend ./backend
COPY frontend ./frontend

# 构建前端
RUN cd frontend && npm run build

# 暴露端口
EXPOSE 3000

# 启动后端
CMD ["node", "backend/src/index.js"]
```

### 环境变量

生产环境需要设置：

```bash
NODE_ENV=production
PORT=3000
```

## 常见问题

### Q: 某个数据源返回 403 错误？
A: 检查 User-Agent 头，某些网站会阻止爬虫。使用真实浏览器的 User-Agent。

### Q: 定时任务不执行？
A: 检查 cron 表达式是否正确，使用 https://crontab.guru/ 验证。

### Q: 前端无法连接后端？
A: 确保后端服务已启动，检查 CORS 配置和代理设置。

### Q: 构建失败？
A: 清理 node_modules 和缓存：
```bash
rm -rf node_modules package-lock.json
npm install
```

## 贡献指南

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/new-source`
3. 提交更改: `git commit -m 'Add new source'`
4. 推送分支: `git push origin feature/new-source`
5. 提交 Pull Request

## 资源链接

- [Vue 3 文档](https://vuejs.org/)
- [Vite 文档](https://vitejs.dev/)
- [Naive UI 组件](https://www.naiveui.com/)
- [Express 文档](https://expressjs.com/)
- [Node-cron 语法](https://github.com/node-cron/node-cron)
