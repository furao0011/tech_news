import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchCSDN = async () => {
  try {
    const response = await axios.get('https://blog.csdn.net/rank/list', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    const items = [];

    $('li.clearfix').slice(0, 10).each((index, element) => {
      const $item = $(element);
      
      const $link = $item.find('a').first();
      const title = $link.text().trim() || $item.find('.title').text().trim();
      const url = $link.attr('href');
      const author = $item.find('.nickname').text().trim() || 'CSDN作者';
      
      if (title && url) {
        const fullUrl = url.startsWith('http') ? url : `https://blog.csdn.net${url}`;
        
        items.push({
          id: `csdn-${Date.now()}-${index}`,
          title: title,
          url: fullUrl,
          description: '点击查看 CSDN 热门技术文章详情...',
          source: 'CSDN',
          sourceIcon: '💻',
          author: author,
          points: 0,
          comments: 0,
          publishedAt: new Date().toISOString(),
          tags: ['CSDN', '中文']
        });
      }
    });

    if (items.length === 0) {
      $('div[class*="title"], h3, h4').slice(0, 10).each((index, element) => {
        const $item = $(element);
        const $link = $item.find('a').first().length ? $item.find('a').first() : $item.closest('a').length ? $item.closest('a') : $item;
        
        const title = $link.text().trim() || $item.text().trim();
        const url = $link.attr('href') || $item.attr('href');
        
        if (title && url && title.length > 5) {
          const fullUrl = url.startsWith('http') ? url : `https://blog.csdn.net${url}`;
          
          items.push({
            id: `csdn-${Date.now()}-${index}`,
            title: title,
            url: fullUrl,
            description: '点击查看 CSDN 技术文章详情...',
            source: 'CSDN',
            sourceIcon: '💻',
            author: 'CSDN',
            points: 0,
            comments: 0,
            publishedAt: new Date().toISOString(),
            tags: ['CSDN', '中文']
          });
        }
      });
    }

    console.log(`✅ Fetched ${items.length} items from CSDN`);
    return items.slice(0, 10);
  } catch (error) {
    console.error('❌ Error fetching CSDN:', error.message);
    
    return [
      {
        id: `csdn-fallback-1`,
        title: 'CSDN - 中国专业IT社区',
        url: 'https://www.csdn.net/',
        description: 'CSDN是中国专业的IT技术社区，提供原创博客、问答、资讯、课程等服务',
        source: 'CSDN',
        sourceIcon: '💻',
        author: 'CSDN',
        points: 0,
        comments: 0,
        publishedAt: new Date().toISOString(),
        tags: ['CSDN', '中文', '技术社区']
      }
    ];
  }
};
