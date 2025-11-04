import express from 'express';
import { getNews, refreshNews } from '../services/aggregator.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const news = getNews();
    res.json({
      success: true,
      data: news,
      lastUpdate: news.lastUpdate
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    await refreshNews();
    const news = getNews();
    res.json({
      success: true,
      data: news,
      message: 'News refreshed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
