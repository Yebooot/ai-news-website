import Parser from 'rss-parser';
const parser = new Parser({
    customFields: { item: ['media:content', 'media:thumbnail', 'image'] }
});
async function go() {
    try {
        console.log("Checking Bing News:");
        const feed = await parser.parseURL('https://www.bing.com/news/search?q=Artificial+Intelligence+Business&format=rss');
        if (feed.items.length > 0) {
            console.log(feed.items[0]);
        }

    } catch (e) {
        console.error(e);
    }
}
go();
