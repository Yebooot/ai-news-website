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

const FEEDS = [
    { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', category: 'Tech' },
    { url: 'https://venturebeat.com/category/ai/feed/', category: 'Business' },
    { url: 'https://news.google.com/rss/search?q=AI+Politics&hl=en-US&gl=US&ceid=US:en', category: 'Politics' },
    { url: 'https://news.google.com/rss/search?q=AI+Science&hl=en-US&gl=US&ceid=US:en', category: 'Science' },
    { url: 'https://news.google.com/rss/search?q=AI+Health&hl=en-US&gl=US&ceid=US:en', category: 'Health' },
    { url: 'https://news.google.com/rss/search?q=AI+Sports&hl=en-US&gl=US&ceid=US:en', category: 'Sports' }
];

const CATEGORY_IMAGES = {
    'Politics': [
        'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1529107336415-4ba2b6a831fb?auto=format&fit=crop&q=80&w=800&h=600'
    ],
    'Business': [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800&h=600'
    ],
    'Tech': [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=600'
    ],
    'Science': [
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=800&h=600'
    ],
    'Health': [
        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800&h=600'
    ],
    'Sports': [
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800&h=600',
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800&h=600'
    ]
};

const OUTPUT_PATH = path.join(__dirname, '../src/data/news.json');

// Helper to extract an image from an RSS item's obscure formats
function extractImage(item, category) {
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

    // Fallback AI placeholder images from Unsplash (so the UI never breaks, and images are extremely relevant)
    const placeholders = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['Tech'];

    // Use the title string length to deterministically pick an image so it doesn't swap on every reload
    const titleHash = (item.title || '').length || Math.floor(Math.random() * 10);
    return placeholders[titleHash % placeholders.length];
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
                    image: extractImage(item, feedConfig.category),
                    excerpt: (item.contentSnippet || item.description || '').replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
                    author: item.creator || item.author || 'AI Reporter'
                });
            });
        } catch (error) {
            console.error(`Failed to fetch ${feedConfig.url}:`, error.message);
        }
    }

    // Sort by date descending
    allParsedNews.sort((a, b) => new Date(b.time) - new Date(a.time));

    // Take the top 150 to ensure we have enough items for each category filter
    const latestNews = allParsedNews.slice(0, 150);

    await fs.outputJson(OUTPUT_PATH, latestNews, { spaces: 2 });
    console.log(`Successfully saved ${latestNews.length} articles to ${OUTPUT_PATH}`);
}

scrapeFeeds();
