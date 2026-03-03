import './NewsGrid.css';
import { NewsItem } from '../App';

interface NewsGridProps {
    newsData: NewsItem[];
}

export default function NewsGrid({ newsData }: NewsGridProps) {
    if (!newsData || newsData.length <= 1) return null;

    // Use items 1 through 8 for the grid (item 0 is in the hero)
    const gridNews = newsData.slice(1, 9);
    return (
        <div className="news-grid-container fade-in">
            <div className="grid-header">
                <h2>Latest Articles</h2>
                <div className="grid-controls">
                    <button className="grid-btn active">Grid view</button>
                    <button className="grid-btn">List view</button>
                </div>
            </div>

            <div className="news-grid">
                {gridNews.map(item => {
                    const timeAgo = new Date(item.time).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric'
                    });

                    return (
                        <article key={item.id} className="grid-card hover-lift" onClick={() => window.open(item.link, '_blank')}>
                            <div className="card-image-wrapper">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800&h=600';
                                    }}
                                />
                                <div className="card-tag glass-panel">{item.category}</div>
                            </div>
                            <div className="card-content">
                                <h3>{item.title}</h3>
                                <p>{timeAgo}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}
