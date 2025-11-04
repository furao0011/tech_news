# 贡献指南

感谢你对 Tech News Aggregator 项目的关注！我们欢迎各种形式的贡献。

## 📋 目录

- [行为准则](#行为准则)
- [我能做什么贡献](#我能做什么贡献)
- [开发流程](#开发流程)
- [提交指南](#提交指南)
- [代码规范](#代码规范)
- [测试要求](#测试要求)
- [文档要求](#文档要求)

## 行为准则

### 我们的承诺

为了营造一个开放和友好的环境，我们承诺：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不可接受的行为

- 使用性暗示的语言或图像
- 人身攻击或侮辱性评论
- 骚扰行为
- 未经许可发布他人私人信息
- 其他在专业环境中不当的行为

## 我能做什么贡献

### 🐛 报告 Bug

发现 Bug？请创建 Issue 并包含：

- **清晰的标题**：简明扼要地描述问题
- **复现步骤**：详细的步骤说明
- **期望行为**：你期望发生什么
- **实际行为**：实际发生了什么
- **环境信息**：
  - 操作系统
  - Node.js 版本
  - 浏览器版本
- **截图/日志**：如果可能的话

**Bug 报告模板**：
```markdown
## Bug 描述
简要描述遇到的问题

## 复现步骤
1. 进入 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

## 期望行为
应该发生什么

## 实际行为
实际发生了什么

## 环境
- OS: [e.g. macOS 13.0]
- Node.js: [e.g. 18.17.0]
- Browser: [e.g. Chrome 120]

## 截图
如果适用，添加截图
```

### ✨ 提议新功能

有好的想法？我们很乐意听到！

创建 Feature Request Issue：

- **功能描述**：清楚地描述建议的功能
- **使用场景**：为什么需要这个功能
- **建议实现**：如果有想法的话
- **可选方案**：考虑过的其他方案

**功能请求模板**：
```markdown
## 功能描述
清晰简洁地描述你想要的功能

## 问题背景
这个功能解决了什么问题？

## 建议方案
你希望如何实现？

## 可选方案
你考虑过的其他解决方案

## 附加信息
其他相关的上下文或截图
```

### 📝 改进文档

文档永远不会完美！欢迎：

- 修正拼写错误
- 改进说明清晰度
- 添加使用示例
- 翻译文档
- 补充缺失的信息

### 💻 贡献代码

想要贡献代码？太棒了！

## 开发流程

### 1. Fork 和 Clone

```bash
# Fork 项目到你的 GitHub 账号

# Clone 你的 fork
git clone https://github.com/YOUR_USERNAME/tech-news-aggregator.git
cd tech-news-aggregator

# 添加上游仓库
git remote add upstream https://github.com/ORIGINAL_OWNER/tech-news-aggregator.git
```

### 2. 创建分支

```bash
# 获取最新代码
git checkout main
git pull upstream main

# 创建功能分支
git checkout -b feature/your-feature-name
# 或 bug 修复分支
git checkout -b fix/bug-description
```

**分支命名规范**：
- `feature/` - 新功能
- `fix/` - Bug 修复
- `docs/` - 文档更新
- `refactor/` - 代码重构
- `test/` - 测试相关
- `chore/` - 其他杂项

### 3. 开发

```bash
# 安装依赖
npm run install:all

# 启动开发服务器
# 终端 1
cd backend && npm run dev

# 终端 2
cd frontend && npm run dev
```

进行你的更改，确保：
- 遵循项目代码规范
- 添加必要的注释
- 更新相关文档
- 添加或更新测试

### 4. 提交更改

```bash
# 查看更改
git status

# 添加文件
git add .

# 提交（遵循提交信息规范）
git commit -m "feat: add new data source for Product Hunt"
```

### 5. 推送和创建 PR

```bash
# 推送到你的 fork
git push origin feature/your-feature-name
```

然后在 GitHub 上创建 Pull Request：
1. 进入你的 fork 仓库
2. 点击 "Compare & pull request"
3. 填写 PR 描述
4. 等待代码审查

## 提交指南

### Commit Message 规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型**：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行）
- `refactor`: 重构（既不是新功能也不是 Bug 修复）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**Scope 范围** (可选)：
- `backend`: 后端相关
- `frontend`: 前端相关
- `api`: API 相关
- `ui`: UI 相关
- `docs`: 文档相关

**示例**：

```bash
# 好的提交信息
git commit -m "feat(backend): add Product Hunt data source"
git commit -m "fix(frontend): correct news card layout on mobile"
git commit -m "docs: update deployment guide for Docker"

# 不好的提交信息
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

### Pull Request 指南

**PR 标题**：遵循 Commit Message 规范

**PR 描述**应包含：

```markdown
## 变更类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 代码重构
- [ ] 文档更新
- [ ] 其他

## 变更描述
清楚地描述这个 PR 做了什么

## 相关 Issue
Closes #issue_number

## 测试
描述如何测试这些更改

## 截图（如适用）
添加相关截图

## Checklist
- [ ] 代码遵循项目规范
- [ ] 已添加/更新测试
- [ ] 已更新文档
- [ ] 所有测试通过
- [ ] 已自我审查代码
```

## 代码规范

### JavaScript/Vue 规范

1. **使用 ES6+ 语法**
```javascript
// ✅ 好
const items = [...array];
const { name, age } = user;

// ❌ 差
var items = array.slice();
var name = user.name;
```

2. **使用 async/await**
```javascript
// ✅ 好
const data = await fetchData();

// ❌ 差
fetchData().then(data => {...});
```

3. **Vue 3 Composition API**
```vue
<!-- ✅ 好 -->
<script setup>
import { ref, computed } from 'vue';
const count = ref(0);
</script>

<!-- ❌ 差 -->
<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

4. **命名规范**
```javascript
// 组件名：PascalCase
NewsCard.vue
UserProfile.vue

// 函数名：camelCase
fetchNews()
getUserData()

// 常量：UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_COUNT = 3;
```

5. **注释规范**
```javascript
// ✅ 好：复杂逻辑添加注释
// 使用 Promise.allSettled 确保单个源失败不影响其他源
const results = await Promise.allSettled([...]);

// ❌ 差：显而易见的代码不需要注释
// 声明一个变量
const name = 'John';
```

### 代码组织

**后端文件结构**：
```javascript
// 1. 导入 Node.js 内置模块
import fs from 'fs';

// 2. 导入第三方模块
import express from 'express';
import axios from 'axios';

// 3. 导入本地模块
import { fetchNews } from './services/news.js';

// 4. 常量定义
const PORT = 3000;

// 5. 函数定义
const startServer = () => {...};

// 6. 执行
startServer();
```

**Vue 组件结构**：
```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup>
// 1. 导入
import { ref, computed } from 'vue';
import { NButton } from 'naive-ui';

// 2. Props 和 Emits
const props = defineProps({...});
const emit = defineEmits([...]);

// 3. 响应式数据
const count = ref(0);

// 4. 计算属性
const doubled = computed(() => count.value * 2);

// 5. 方法
const increment = () => {...};

// 6. 生命周期
onMounted(() => {...});
</script>

<style scoped>
/* 样式 */
</style>
```

### 错误处理

```javascript
// ✅ 好：完善的错误处理
export const fetchData = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return [];  // 返回默认值
  }
};

// ❌ 差：未处理错误
export const fetchData = async () => {
  const response = await axios.get(url);
  return response.data;
};
```

## 测试要求

### 编写测试

每个新功能都应该有对应的测试：

```javascript
// backend/tests/sources/hackerNews.test.js
import { fetchHackerNews } from '../../src/services/sources/hackerNews.js';

describe('Hacker News Source', () => {
  it('should fetch top stories', async () => {
    const news = await fetchHackerNews();
    expect(news).toBeInstanceOf(Array);
    expect(news.length).toBeGreaterThan(0);
  });

  it('should return standardized format', async () => {
    const news = await fetchHackerNews();
    const item = news[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('title');
    expect(item).toHaveProperty('source');
  });
});
```

### 运行测试

```bash
# 后端测试
cd backend
npm test

# 前端测试
cd frontend
npm test
```

## 文档要求

### 代码文档

复杂函数添加 JSDoc：

```javascript
/**
 * 从所有数据源获取新闻
 * @returns {Promise<Object>} 包含新闻数组和最后更新时间的对象
 * @throws {Error} 当所有数据源都失败时抛出错误
 */
export const fetchAllNews = async () => {
  // 实现...
};
```

### README 更新

如果添加了新功能，更新：
- README.md - 功能列表
- DEVELOPMENT.md - 开发指南
- DEPLOYMENT.md - 部署说明（如需要）

### CHANGELOG 更新

在 CHANGELOG.md 中记录你的更改。

## 审查流程

1. **自我审查**：提交前审查自己的代码
2. **自动检查**：CI/CD 会自动运行测试
3. **代码审查**：维护者会审查你的代码
4. **反馈修改**：根据反馈进行修改
5. **合并**：审查通过后合并到主分支

## 获得帮助

如果你有任何问题：

1. 查看 [QUICKSTART.md](QUICKSTART.md)
2. 阅读 [DEVELOPMENT.md](DEVELOPMENT.md)
3. 搜索现有的 Issues
4. 创建新的 Issue 询问

## 致谢

感谢你的贡献！每一个贡献都让这个项目变得更好。

---

**记住**: 没有愚蠢的问题，只有未被回答的问题。我们都曾是初学者，我们在这里互相帮助！

**祝你贡献愉快！** 🎉
