// */5 * * * 
import cron from 'node-cron';
import ReutersScraper from '../scripts/scraper.js';
import pushEmbeddings from '../scripts/jinaEmbedder.js';

cron.schedule('*/30 * * * *', async () => {
    console.log('Refreshing articles...');

    // Extract new articles in articles.json file
    const scraper = new ReutersScraper();
    const articles = await scraper.fetchNewsArticles();
    
    // Push embeddings to Qdrant
    console.log(articles)
    await pushEmbeddings(articles);

    console.log(`Refreshed ${articles.length} articles.`);
});