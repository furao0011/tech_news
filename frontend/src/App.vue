<template>
  <n-config-provider :theme="darkTheme">
    <n-message-provider>
      <div class="container">
        <Header 
          @refresh="handleRefresh" 
          :loading="loading"
          :last-update="newsStore.lastUpdate"
        />
        <NewsList :items="newsStore.news" :loading="loading" />
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui';
import { useNewsStore } from './stores/news';
import Header from './components/Header.vue';
import NewsList from './components/NewsList.vue';

const newsStore = useNewsStore();
const loading = ref(false);

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
