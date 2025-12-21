import axios from 'axios';
import * as cheerio from 'cheerio';
import xml2js from 'xml2js';
import { promises as fs } from 'fs';

class ReutersScraper {
  constructor() {
    this.articles = [];
    this.maxArticles = 50;
  }

  async fetchSitemapUrls() {
    try {
      console.log('Fetching Reuters sitemap...');
      
      // Get the sitemap index first
      const sitemapIndex = 'https://www.reuters.com/arc/outboundfeeds/sitemap-index/?outputType=xml';
      const response = await axios.get(sitemapIndex);
      
      // Parse XML to get individual sitemaps
      const parser = new xml2js.Parser();
      const result = await parser.parseStringPromise(response.data);
      
      // Get the first news sitemap URL
      const sitemaps = result.sitemapindex.sitemap;
      const newsSitemapUrl = sitemaps.find(s => 
        s.loc[0].includes('news')
      )?.loc[0] || sitemaps[0].loc[0];
      
      console.log(`Fetching articles from: ${newsSitemapUrl}`);
      
      // Fetch the actual sitemap with article URLs
      const sitemapResponse = await axios.get(newsSitemapUrl);
      const sitemapData = await parser.parseStringPromise(sitemapResponse.data);
      
      // Extract URLs (limit to maxArticles)
      const urls = sitemapData.urlset.url
        .slice(0, this.maxArticles)
        .map(item => item.loc[0]);
      
      console.log(`Found ${urls.length} article URLs`);
      return urls;
      
    } catch (error) {
      console.error('Error fetching sitemap:', error.message);
      throw error;
    }
  }

  async scrapeArticle(url) {
    try {
      const hardenedHeaders = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:130.0) Gecko/20100101 Firefox/130.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.reuters.com/',
        'Cache-Control': 'no-cache',
        'Upgrade-Insecure-Requests': '1'
      };

      const rpcUrl = url.includes('rpc=401') ? url : `${url}?rpc=401&`;

      let response;

      try {
        response = await axios.get(rpcUrl, {
          headers: hardenedHeaders,
          timeout: 15000
        });
      } catch (err) {
        if (rpcUrl !== url) {
          response = await axios.get(url, {
            headers: hardenedHeaders,
            timeout: 15000
          });
        } else {
          throw err;
        }
      }

      let payload = this.extractArticlePayload(response?.data);

      if (!payload.html) {
        const fallbackResponse = await axios.get(url, {
          headers: hardenedHeaders,
          timeout: 15000
        });
        payload = this.extractArticlePayload(fallbackResponse?.data);
      }

      if (!payload.html) {
        console.warn(`No HTML content returned for ${url}`);
        return null;
      }

      const $ = cheerio.load(payload.html);
      
      // Extract article data (Reuters-specific selectors)
      const title = payload.title ||
                    $('h1').first().text().trim() || 
                    $('meta[property="og:title"]').attr('content') || '';
      
      // Build content from sequential data-testid="paragraph-<index>" elements
      let contentParts = [];
      let paragraphIndex = 0;
      
      while (true) {
        const selector = `[data-testid="paragraph-${paragraphIndex}"]`;
        const el = $(selector);
        
        if (el.length === 0) {
          break;
        }
        
        const text = el.text().trim();
        if (!text) {
          break;
        }
        
        contentParts.push(text);
        paragraphIndex += 1;
      }
      
      const content = contentParts.join('\n\n');
      
      if (!content) {
        console.warn(`No paragraph-* content found for ${url}`);
        return null;
      }
      
      const description = payload.description ||
                          $('meta[property="og:description"]').attr('content') || '';
      
      const publishedDate = payload.publishedDate ||
                           $('meta[property="article:published_time"]').attr('content') ||
                           $('time').attr('datetime') || 
                           new Date().toISOString();

      // Only return if we have meaningful content
      if (title && (content.length > 100 || description.length > 50)) {
        return {
          url,
          title,
          content: content || description,
          description,
          publishedDate,
          scrapedAt: new Date().toISOString()
        };
      }
      
      return null;
      
    } catch (error) {
      console.error(`Error scraping ${url}:`, error.message);
      return null;
    }
  }

  extractArticlePayload(data = null) {
    if (!data) {
      return { html: '', title: '', description: '', publishedDate: '' };
    }
    
    if (Buffer.isBuffer(data)) {
      return { html: data.toString('utf8'), title: '', description: '', publishedDate: '' };
    }
    
    if (typeof data === 'string') {
      return { html: data, title: '', description: '', publishedDate: '' };
    }
    
    const html = data?.article?.body ||
                 data?.article?.body_html ||
                 data?.story?.html ||
                 data?.story?.body ||
                 data?.result?.article?.body ||
                 '';
    
    const title = data?.article?.title || data?.story?.title || '';
    const description = data?.article?.description || data?.story?.description || '';
    const publishedDate = data?.article?.published_time ||
                          data?.story?.published_time ||
                          data?.article?.published ||
                          '';
    
    return { html, title, description, publishedDate };
  }
  
  async scrapeArticles(urls) {
    console.log(`Starting to scrape ${urls.length} articles...`);
    
    const articles = [];
    
    for (let i = 0; i < urls.length; i++) {
      console.log(`Scraping article ${i + 1}/${urls.length}...`);
      
      const article = await this.scrapeArticle(urls[i]);
      
      if (article) {
        articles.push(article);
        console.log(`✓ Scraped: ${article.title.substring(0, 60)}...`);
      }
      
      // Rate limiting: wait 1 second between requests
      if (i < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`\nSuccessfully scraped ${articles.length} articles`);
    return articles;
  }

  async fetchNewsArticles() {
    try {
      // Step 1: Get article URLs from sitemap
      const urls = await this.fetchSitemapUrls();
      
      // Step 2: Scrape each article
      const articles = await this.scrapeArticles(urls);
      
      // Step 3: Save to JSON file
      // Only to use in DEV environment

      // await fs.writeFile(
      //   'news_articles.json',
      //   JSON.stringify(articles, null, 2)
      // );
      
      console.log('\n✓ Articles saved to news_articles.json');
      console.log(`Total articles: ${articles.length}`);
      
      return articles;
      
    } catch (error) {
      console.error('Error in fetchNewsArticles:', error);
      throw error;
    }
  }
}


export default ReutersScraper;