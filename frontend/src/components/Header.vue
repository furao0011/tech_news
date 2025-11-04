<template>
  <header class="header">
    <div class="header-content">
      <div class="title-section">
        <h1 class="title">
          <span class="icon">🚀</span>
          Tech News Aggregator
        </h1>
        <p class="subtitle">实时聚合最新技术资讯</p>
      </div>
      
      <div class="actions">
        <n-space>
          <n-button 
            type="primary" 
            @click="$emit('refresh')"
            :loading="loading"
            size="large"
            round
          >
            <template #icon>
              <span>🔄</span>
            </template>
            刷新
          </n-button>
          
          <n-tag v-if="lastUpdate" type="info" size="large" round>
            上次更新: {{ formatTime(lastUpdate) }}
          </n-tag>
        </n-space>
      </div>
    </div>
    
    <div class="stats">
      <n-space>
        <n-tag type="success" round>
          <span class="stat-icon">🔶</span> Hacker News
        </n-tag>
        <n-tag type="warning" round>
          <span class="stat-icon">⭐</span> GitHub Trending
        </n-tag>
        <n-tag type="info" round>
          <span class="stat-icon">📝</span> Dev.to
        </n-tag>
        <n-tag type="error" round>
          <span class="stat-icon">🤖</span> Reddit
        </n-tag>
      </n-space>
    </div>
  </header>
</template>

<script setup>
import { NButton, NSpace, NTag } from 'naive-ui';

defineProps({
  loading: Boolean,
  lastUpdate: String
});

defineEmits(['refresh']);

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000 / 60);
  
  if (diff < 1) return '刚刚';
  if (diff < 60) return `${diff} 分钟前`;
  if (diff < 1440) return `${Math.floor(diff / 60)} 小时前`;
  return `${Math.floor(diff / 1440)} 天前`;
};
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 20px;
}

.title-section {
  flex: 1;
  min-width: 250px;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.icon {
  font-size: 2.5rem;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.subtitle {
  font-size: 1rem;
  color: #666;
  margin-left: 55px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.stats {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.stat-icon {
  font-size: 1.1rem;
  margin-right: 5px;
}

@media (max-width: 768px) {
  .header {
    padding: 20px;
  }
  
  .title {
    font-size: 1.8rem;
  }
  
  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .actions {
    width: 100%;
  }
}
</style>
