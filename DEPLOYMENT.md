# 部署指南

本文档详细说明如何将 Tech News Aggregator 部署到各种环境。

## 目录

- [本地部署](#本地部署)
- [Docker 部署](#docker-部署)
- [云平台部署](#云平台部署)
  - [Vercel](#vercel-前端)
  - [Railway](#railway-全栈)
  - [AWS](#aws)
  - [阿里云](#阿里云)

## 本地部署

### 开发环境

1. **克隆仓库**
```bash
git clone <repository-url>
cd tech-news-aggregator
```

2. **安装依赖**
```bash
# 一键安装所有依赖
npm run install:all

# 或分别安装
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

3. **启动开发服务器**

使用启动脚本：
```bash
./start.sh
```

或手动启动：
```bash
# 终端 1 - 后端
cd backend
npm run dev

# 终端 2 - 前端
cd frontend
npm run dev
```

4. **访问应用**
- 前端: http://localhost:5173
- 后端 API: http://localhost:3000

### 生产环境

1. **构建前端**
```bash
cd frontend
npm run build
# 生成 dist/ 目录
```

2. **配置后端静态文件服务**

修改 `backend/src/index.js`:
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 提供前端静态文件
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// 所有其他请求返回 index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});
```

3. **启动生产服务器**
```bash
cd backend
NODE_ENV=production PORT=3000 npm start
```

4. **使用 PM2 管理进程**
```bash
npm install -g pm2

# 启动应用
pm2 start backend/src/index.js --name tech-news-aggregator

# 查看状态
pm2 status

# 查看日志
pm2 logs tech-news-aggregator

# 开机自启
pm2 startup
pm2 save
```

## Docker 部署

### 单容器部署

1. **创建 Dockerfile**

在项目根目录创建 `Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# 复制依赖文件
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# 安装依赖
RUN cd backend && npm ci --only=production
RUN cd frontend && npm ci

# 复制源代码
COPY backend ./backend
COPY frontend ./frontend

# 构建前端
RUN cd frontend && npm run build

# 生产镜像
FROM node:18-alpine

WORKDIR /app

# 复制后端和构建好的前端
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

WORKDIR /app/backend

# 暴露端口
EXPOSE 3000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 启动应用
CMD ["node", "src/index.js"]
```

2. **创建 .dockerignore**

```
node_modules
npm-debug.log
.git
.gitignore
.env
dist
*.log
.DS_Store
.vscode
.idea
```

3. **构建和运行**

```bash
# 构建镜像
docker build -t tech-news-aggregator .

# 运行容器
docker run -d \
  --name tech-news-aggregator \
  -p 3000:3000 \
  --restart unless-stopped \
  tech-news-aggregator

# 查看日志
docker logs -f tech-news-aggregator
```

### Docker Compose 部署

创建 `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/api/health')"]
      interval: 30s
      timeout: 3s
      retries: 3

  # 可选：添加 Redis 缓存
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
    restart: unless-stopped
    volumes:
      - redis-data:/data

volumes:
  redis-data:
```

启动：
```bash
docker-compose up -d
```

## 云平台部署

### Vercel (前端)

Vercel 适合部署前端应用，后端需要部署到其他平台。

1. **安装 Vercel CLI**
```bash
npm install -g vercel
```

2. **配置 vercel.json**

在 `frontend/` 目录创建:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-backend-url.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

3. **部署**
```bash
cd frontend
vercel --prod
```

### Railway (全栈)

Railway 可以部署全栈应用。

1. **创建 railway.json**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node backend/src/index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **通过 Railway CLI 部署**
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

3. **或通过 GitHub 集成**
- 连接 GitHub 仓库
- Railway 自动检测并部署

### AWS (Amazon Web Services)

#### 使用 EC2

1. **启动 EC2 实例**
- 选择 Ubuntu 20.04 LTS
- 实例类型: t2.micro (免费套餐)
- 配置安全组: 开放 80, 443, 3000 端口

2. **连接并设置**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 PM2
sudo npm install -g pm2

# 克隆项目
git clone <your-repo>
cd tech-news-aggregator

# 安装依赖
npm run install:all

# 构建前端
cd frontend && npm run build && cd ..

# 启动应用
pm2 start backend/src/index.js --name tech-news-aggregator
pm2 startup
pm2 save
```

3. **配置 Nginx 反向代理**
```bash
sudo apt-get install nginx

# 创建配置文件
sudo nano /etc/nginx/sites-available/tech-news-aggregator
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 启用站点
sudo ln -s /etc/nginx/sites-available/tech-news-aggregator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **配置 HTTPS (Let's Encrypt)**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

#### 使用 ECS (Elastic Container Service)

1. **推送 Docker 镜像到 ECR**
```bash
# 登录 ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com

# 构建和推送
docker build -t tech-news-aggregator .
docker tag tech-news-aggregator:latest your-account-id.dkr.ecr.us-east-1.amazonaws.com/tech-news-aggregator:latest
docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/tech-news-aggregator:latest
```

2. **创建 ECS 任务定义和服务**
- 通过 AWS Console 或 AWS CLI 配置
- 设置负载均衡器
- 配置自动扩展

### 阿里云

#### 使用 ECS

流程类似 AWS EC2，主要差异：

1. **选择镜像**: Ubuntu 20.04 或 CentOS 8
2. **配置安全组**: 入方向规则添加 80, 443, 3000 端口
3. **安装软件**: 同 AWS EC2 步骤

#### 使用容器服务 ACK

1. **创建集群**
2. **推送到阿里云容器镜像服务**
```bash
docker login --username=your-username registry.cn-hangzhou.aliyuncs.com
docker tag tech-news-aggregator:latest registry.cn-hangzhou.aliyuncs.com/your-namespace/tech-news-aggregator:latest
docker push registry.cn-hangzhou.aliyuncs.com/your-namespace/tech-news-aggregator:latest
```

3. **创建 Kubernetes 部署**

`deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: tech-news-aggregator
spec:
  replicas: 2
  selector:
    matchLabels:
      app: tech-news-aggregator
  template:
    metadata:
      labels:
        app: tech-news-aggregator
    spec:
      containers:
      - name: app
        image: registry.cn-hangzhou.aliyuncs.com/your-namespace/tech-news-aggregator:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
---
apiVersion: v1
kind: Service
metadata:
  name: tech-news-aggregator
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: tech-news-aggregator
```

## 环境变量配置

生产环境建议配置：

```bash
# 后端环境变量
NODE_ENV=production
PORT=3000

# 可选：如果使用 Redis
REDIS_URL=redis://localhost:6379

# 可选：数据库连接
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

## 监控和日志

### 使用 PM2 监控

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# 查看监控
pm2 monit
```

### 使用 Docker 日志

```bash
docker logs -f tech-news-aggregator
```

### 集成日志服务

考虑使用：
- Sentry (错误追踪)
- LogRocket (用户会话记录)
- Datadog (全面监控)

## 性能优化建议

1. **启用 Gzip 压缩**
2. **使用 CDN 分发静态资源**
3. **添加 Redis 缓存层**
4. **配置负载均衡**
5. **设置自动扩展规则**

## 安全建议

1. **使用 HTTPS**
2. **设置 CORS 策略**
3. **添加限流中间件**
4. **定期更新依赖**
5. **使用环境变量管理敏感信息**
6. **配置防火墙规则**

## 备份策略

1. **数据库备份** (如果使用)
```bash
# 每天自动备份
0 2 * * * pg_dump dbname > /backup/db_$(date +\%Y\%m\%d).sql
```

2. **代码备份**
- 使用 Git 版本控制
- 配置 CI/CD 自动部署

## 故障排查

### 应用无法启动

1. 检查端口是否被占用:
```bash
lsof -i :3000
```

2. 查看错误日志:
```bash
pm2 logs tech-news-aggregator --err
```

### API 请求失败

1. 检查网络连接
2. 验证 API 端点
3. 查看 CORS 设置

### 性能问题

1. 使用 `pm2 monit` 查看资源使用
2. 检查数据库查询效率
3. 分析慢日志

## 更新部署

### 零停机更新

使用 PM2:
```bash
cd /path/to/project
git pull
cd frontend && npm run build && cd ..
pm2 reload tech-news-aggregator
```

使用 Docker:
```bash
docker build -t tech-news-aggregator:new .
docker stop tech-news-aggregator
docker rm tech-news-aggregator
docker run -d --name tech-news-aggregator -p 3000:3000 tech-news-aggregator:new
```

## 回滚策略

```bash
# PM2
pm2 stop tech-news-aggregator
git checkout previous-version
cd frontend && npm run build && cd ..
pm2 start tech-news-aggregator

# Docker
docker stop tech-news-aggregator
docker run -d --name tech-news-aggregator -p 3000:3000 tech-news-aggregator:previous-tag
```

## 技术支持

如遇到部署问题，请：
1. 查看项目 Issues
2. 阅读相关文档
3. 提交详细的错误报告

---

**祝部署顺利！🚀**
