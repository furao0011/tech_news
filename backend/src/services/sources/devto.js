import axios from 'axios';

const DEVTO_API_BASE = 'https://dev.to/api';
const MAX_ITEMS = 10;

export const fetchDevTo = async () => {
  try {
    const response = await axios.get(`${DEVTO_API_BASE}/articles`, {
      params: {
        per_page: MAX_ITEMS,
        top: 7
      }
    });

    return response.data.map(article => ({
      id: `devto-${article.id}`,
      title: article.title,
      url: article.url,
      description: article.description,
      source: 'Dev.to',
      sourceIcon: '📝',
      author: article.user.name,
      points: article.positive_reactions_count,
      comments: article.comments_count,
      publishedAt: article.published_at,
      coverImage: article.cover_image,
      tags: article.tag_list
    }));
  } catch (error) {
    console.error('Error fetching Dev.to:', error.message);
    return [];
  }
};
