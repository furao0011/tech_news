<template>
  <div class="news-list">
    <n-spin :show="loading" size="large">
      <template v-if="items.length === 0 && !loading">
        <n-empty 
          description="暂无新闻数据" 
          size="large"
          style="padding: 60px 0"
        >
          <template #icon>
            <span style="font-size: 4rem">📰</span>
          </template>
        </n-empty>
      </template>
      
      <transition-group name="list" tag="div" class="news-grid">
        <NewsCard 
          v-for="item in items" 
          :key="item.id"
          :item="item"
        />
      </transition-group>
    </n-spin>
  </div>
</template>

<script setup>
import { NSpin, NEmpty } from 'naive-ui';
import NewsCard from './NewsCard.vue';

defineProps({
  items: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped>
.news-list {
  min-height: 400px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  padding: 10px 0;
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.list-leave-active {
  position: absolute;
}
</style>
