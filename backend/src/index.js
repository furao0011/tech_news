import express from 'express';
import cors from 'cors';
import cron from 'node-cron';
import newsRouter from './routes/news.js';
import { fetchAllNews } from './services/aggregator.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/news', newsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const initApp = async () => {
  console.log('🚀 Starting Tech News Aggregator...');
  
  await fetchAllNews();
  console.log('✅ Initial news fetch completed');
  
  cron.schedule('0 */6 * * *', async () => {
    console.log('⏰ Running scheduled news fetch...');
    await fetchAllNews();
    console.log('✅ Scheduled news fetch completed');
  });
  
  app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log('📰 News will be refreshed every 6 hours');
  });
};

initApp().catch(console.error);
