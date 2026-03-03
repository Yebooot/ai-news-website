import './NewsGrid.css';
import newsData from '../data/news.json';

// Use items 1 through 8 for the grid (item 0 is in the hero)
const gridNews = newsData.slice(1, 9);

export default function NewsGrid() {
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
                                <img src={item.image} alt={item.title} />
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
