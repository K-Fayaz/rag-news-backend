import ReutersScraper from '../scripts/scraper.js';
import pushEmbeddings from '../scripts/jinaEmbedder.js';

const main = async () => {
    console.log('Refreshing articles...');

    // Extract new articles in articles.json file
    const scraper = new ReutersScraper();
    const articles = await scraper.fetchNewsArticles();
    
    // Push embeddings to Qdrant
    console.log(articles)
    await pushEmbeddings(articles);

    console.log(`Refreshed ${articles.length} articles.`);
};


main().then((result) => {
    console.log(result);
    process.exit(0);
})
.catch((error) => {
    console.log(error);
    process.exit(0);
})