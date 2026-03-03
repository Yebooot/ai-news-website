import Parser from 'rss-parser';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parser = new Parser({
    customFields: {
        item: ['media:content', 'media:thumbnail', 'content:encoded', 'description']
    }
});

// Using a mix of tech/AI RSS feeds to get good coverage
const FEEDS = [
    { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: 'AI Industry' },
    { url: 'https://export.arxiv.org/rss/cs.AI', category: 'AI Research' },
    { url: 'https://venturebeat.com/category/ai/feed/', category: 'AI Business' }
];

const OUTPUT_PATH = path.join(__dirname, '../src/data/news.json');

// Helper to extract an image from an RSS item's obscure formats
function extractImage(item) {
    // Try <media:content>
    if (item['media:content'] && item['media:content'].$) {
        return item['media:content'].$.url;
    }
    // Try <media:thumbnail>
    if (item['media:thumbnail'] && item['media:thumbnail'].$) {
        return item['media:thumbnail'].$.url;
    }

    // Try to parse from HTML content if description exists
    const htmlContent = item['content:encoded'] || item.content || item.description || '';
    const imgMatch = htmlContent.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
    }

    // Fallback AI placeholder images from Unsplash (so the UI never breaks)
    const placeholders = [
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1678286742832-26543bb49959?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1531297172864-459c7ed8bf92?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=600'
    ];
    return placeholders[Math.floor(Math.random() * placeholders.length)];
}

async function scrapeFeeds() {
    console.log('Starting AI news scrape...');
    const allParsedNews = [];

    for (const feedConfig of FEEDS) {
        console.log(`Fetching: ${feedConfig.url}`);
        try {
            const feed = await parser.parseURL(feedConfig.url);

            feed.items.forEach(item => {
                allParsedNews.push({
                    id: item.guid || item.id || Date.now().toString() + Math.random(),
                    title: item.title,
                    link: item.link,
                    time: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
                    category: feedConfig.category,
                    image: extractImage(item),
                    excerpt: (item.contentSnippet || item.description || '').substring(0, 150) + '...',
                    author: item.creator || item.author || 'AI Reporter'
                });
            });
        } catch (error) {
            console.error(`Failed to fetch ${feedConfig.url}:`, error.message);
        }
    }

    // Sort by date descending
    allParsedNews.sort((a, b) => new Date(b.time) - new Date(a.time));

    // Take the top 30 to keep JSON small and snappy
    const latestNews = allParsedNews.slice(0, 30);

    await fs.outputJson(OUTPUT_PATH, latestNews, { spaces: 2 });
    console.log(`Successfully saved ${latestNews.length} articles to ${OUTPUT_PATH}`);
}

scrapeFeeds();
