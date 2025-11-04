import axios from 'axios';

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';
const MAX_ITEMS = 10;

export const fetchHackerNews = async () => {
  try {
    const topStoriesRes = await axios.get(`${HN_API_BASE}/topstories.json`);
    const topStoryIds = topStoriesRes.data.slice(0, MAX_ITEMS);

    const storyPromises = topStoryIds.map(id =>
      axios.get(`${HN_API_BASE}/item/${id}.json`)
    );

    const stories = await Promise.all(storyPromises);

    return stories.map(res => ({
      id: `hn-${res.data.id}`,
      title: res.data.title,
      url: res.data.url || `https://news.ycombinator.com/item?id=${res.data.id}`,
      source: 'Hacker News',
      sourceIcon: '🔶',
      author: res.data.by,
      points: res.data.score,
      comments: res.data.descendants || 0,
      publishedAt: new Date(res.data.time * 1000).toISOString(),
      tags: ['news']
    }));
  } catch (error) {
    console.error('Error fetching Hacker News:', error.message);
    return [];
  }
};
