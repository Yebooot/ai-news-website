import './Sidebar.css';
import newsData from '../data/news.json';

// Use items 9 through 14 for the sidebar
const recommendedNews = newsData.slice(9, 14);

export default function Sidebar() {
    return (
        <aside className="sidebar-container">
            <div className="sidebar-header">
                <h2>Recommended</h2>
                <button className="view-all-btn">View All</button>
            </div>

            <div className="sidebar-news-list">
                {recommendedNews.map((news) => {
                    const timeAgo = new Date(news.time).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric'
                    });

                    return (
                        <article key={news.id} className="sidebar-news-item hover-lift" onClick={() => window.open(news.link, '_blank')}>
                            <div className="news-thumbnail">
                                <img src={news.image} alt={news.title} />
                                <div className="news-category-tag">{news.category}</div>
                            </div>
                            <div className="news-content">
                                <h3 className="news-title">{news.title}</h3>
                                <p className="news-meta">{timeAgo}</p>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Newsletter Signup widget could go here based on typical sidebars */}
            <div className="newsletter-widget">
                <h3>Stay Updated</h3>
                <p>Get the latest AI news directly to your inbox.</p>
                <div className="newsletter-input">
                    <input type="email" placeholder="Your email address" />
                    <button>Subscribe</button>
                </div>
            </div>
        </aside>
    );
}
