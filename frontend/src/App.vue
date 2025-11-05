<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <div class="container">
        <Header 
          @refresh="handleRefresh" 
          @search="handleSearch"
          @source-change="handleSourceChange"
          :loading="loading"
          :last-update="newsStore.lastUpdate"
        />
        <NewsList :items="filteredNews" :loading="loading" />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui';
import { useNewsStore } from './stores/news';
import Header from './components/Header.vue';
import NewsList from './components/NewsList.vue';

const newsStore = useNewsStore();
const loading = ref(false);
const searchKeyword = ref('');
const selectedSources = ref(['Hacker News', 'GitHub Trending', 'Dev.to', 'Reddit', 'CSDN']);

const filteredNews = computed(() => {
  let filtered = newsStore.news;
  
  if (selectedSources.value.length > 0) {
    filtered = filtered.filter(item => selectedSources.value.includes(item.source));
  }
  
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase().trim();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(keyword) ||
      (item.description && item.description.toLowerCase().includes(keyword)) ||
      (item.author && item.author.toLowerCase().includes(keyword))
    );
  }
  
  return filtered;
});

const fetchNews = async () => {
  loading.value = true;
  try {
    await newsStore.fetchNews();
  } finally {
    loading.value = false;
  }
};

const handleRefresh = async () => {
  loading.value = true;
  try {
    await newsStore.refreshNews();
  } finally {
    loading.value = false;
  }
};

const handleSearch = (keyword) => {
  searchKeyword.value = keyword;
};

const handleSourceChange = (sources) => {
  selectedSources.value = sources;
};

onMounted(() => {
  fetchNews();
});
</script>

<style scoped>
.container {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
