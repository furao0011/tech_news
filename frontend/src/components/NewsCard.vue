<template>
  <n-card 
    class="news-card"
    hoverable
    @click="openLink"
  >
    <template #cover v-if="item.coverImage">
      <img :src="item.coverImage" :alt="item.title" class="cover-image" />
    </template>
    
    <div class="card-header">
      <n-space align="center" justify="space-between">
        <n-tag :type="getSourceType(item.source)" size="small" round>
          {{ item.sourceIcon }} {{ item.source }}
        </n-tag>
        <span class="time">{{ formatTime(item.publishedAt) }}</span>
      </n-space>
    </div>
    
    <h3 class="news-title">{{ item.title }}</h3>
    
    <p v-if="item.description" class="news-description">
      {{ truncate(item.description, 100) }}
    </p>
    
    <div class="card-footer">
      <n-space size="small">
        <n-tag v-if="item.author" size="small" type="default">
          👤 {{ item.author }}
        </n-tag>
        <n-tag v-if="item.points" size="small" type="warning">
          ⬆️ {{ item.points }}
        </n-tag>
        <n-tag v-if="item.comments" size="small" type="info">
          💬 {{ item.comments }}
        </n-tag>
        <n-tag v-if="item.language" size="small" type="success">
          💻 {{ item.language }}
        </n-tag>
      </n-space>
      
      <div v-if="item.tags && item.tags.length" class="tags">
        <n-tag 
          v-for="tag in item.tags.slice(0, 3)" 
          :key="tag"
          size="small"
          type="default"
          round
        >
          #{{ tag }}
        </n-tag>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { NCard, NTag, NSpace } from 'naive-ui';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const openLink = () => {
  window.open(props.item.url, '_blank');
};

const getSourceType = (source) => {
  if (source.includes('Hacker News')) return 'warning';
  if (source.includes('GitHub')) return 'success';
  if (source.includes('Dev.to')) return 'info';
  if (source.includes('Reddit')) return 'error';
  return 'default';
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000 / 60);
  
  if (diff < 1) return '刚刚';
  if (diff < 60) return `${diff}分钟前`;
  if (diff < 1440) return `${Math.floor(diff / 60)}小时前`;
  return `${Math.floor(diff / 1440)}天前`;
};

const truncate = (text, length) => {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
};
</script>

<style scoped>
.news-card {
  height: 100%;
  transition: all 0.3s ease;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.cover-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-header {
  margin-bottom: 15px;
}

.time {
  font-size: 0.85rem;
  color: #999;
}

.news-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-description {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
