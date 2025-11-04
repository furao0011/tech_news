import axios from 'axios';
import * as cheerio from 'cheerio';

const GITHUB_TRENDING_URL = 'https://github.com/trending';

export const fetchGitHubTrending = async () => {
  try {
    const response = await axios.get(GITHUB_TRENDING_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    const repos = [];

    $('article.Box-row').slice(0, 10).each((_, element) => {
      const $elem = $(element);
      const repoPath = $elem.find('h2 a').attr('href');
      const title = $elem.find('h2 a').text().trim().replace(/\s+/g, ' ');
      const description = $elem.find('p').text().trim();
      const stars = $elem.find('svg.octicon-star').parent().text().trim();
      const language = $elem.find('[itemprop="programmingLanguage"]').text().trim();

      if (repoPath) {
        repos.push({
          id: `gh-${repoPath.replace(/\//g, '-')}`,
          title: title,
          url: `https://github.com${repoPath}`,
          description: description || 'No description available',
          source: 'GitHub Trending',
          sourceIcon: '⭐',
          author: repoPath.split('/')[1],
          points: stars,
          language: language || 'Unknown',
          publishedAt: new Date().toISOString(),
          tags: ['repository', language.toLowerCase()].filter(Boolean)
        });
      }
    });

    return repos;
  } catch (error) {
    console.error('Error fetching GitHub Trending:', error.message);
    return [];
  }
};
