import axios from 'axios';

const REDDIT_API_BASE = 'https://www.reddit.com';
const MAX_ITEMS = 10;

export const fetchRedditProgramming = async () => {
  try {
    const response = await axios.get(`${REDDIT_API_BASE}/r/programming/hot.json`, {
      params: {
        limit: MAX_ITEMS
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    return response.data.data.children.map(post => ({
      id: `reddit-${post.data.id}`,
      title: post.data.title,
      url: post.data.url,
      source: 'Reddit r/programming',
      sourceIcon: '🤖',
      author: post.data.author,
      points: post.data.ups,
      comments: post.data.num_comments,
      publishedAt: new Date(post.data.created_utc * 1000).toISOString(),
      tags: ['programming', 'discussion']
    }));
  } catch (error) {
    console.error('Error fetching Reddit:', error.message);
    return [];
  }
};
