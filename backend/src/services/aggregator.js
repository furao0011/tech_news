import { fetchHackerNews } from './sources/hackerNews.js';
import { fetchGitHubTrending } from './sources/github.js';
import { fetchDevTo } from './sources/devto.js';
import { fetchRedditProgramming } from './sources/reddit.js';

let newsCache = {
  items: [],
  lastUpdate: null
};

export const fetchAllNews = async () => {
  try {
    console.log('📡 Fetching news from all sources...');
    
    const [hackerNews, githubTrending, devToNews, redditNews] = await Promise.allSettled([
      fetchHackerNews(),
      fetchGitHubTrending(),
      fetchDevTo(),
      fetchRedditProgramming()
    ]);

    const allNews = [];

    if (hackerNews.status === 'fulfilled') {
      allNews.push(...hackerNews.value);
    } else {
      console.error('❌ Hacker News fetch failed:', hackerNews.reason);
    }

    if (githubTrending.status === 'fulfilled') {
      allNews.push(...githubTrending.value);
    } else {
      console.error('❌ GitHub Trending fetch failed:', githubTrending.reason);
    }

    if (devToNews.status === 'fulfilled') {
      allNews.push(...devToNews.value);
    } else {
      console.error('❌ Dev.to fetch failed:', devToNews.reason);
    }

    if (redditNews.status === 'fulfilled') {
      allNews.push(...redditNews.value);
    } else {
      console.error('❌ Reddit fetch failed:', redditNews.reason);
    }

    allNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    newsCache = {
      items: allNews,
      lastUpdate: new Date().toISOString()
    };

    console.log(`✅ Fetched ${allNews.length} news items`);
    return newsCache;
  } catch (error) {
    console.error('❌ Error fetching news:', error);
    throw error;
  }
};

export const getNews = () => {
  return newsCache;
};

export const refreshNews = async () => {
  return await fetchAllNews();
};
