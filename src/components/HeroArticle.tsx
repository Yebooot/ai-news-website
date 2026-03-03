import './HeroArticle.css';
import newsData from '../data/news.json';

// Use the absolute latest article for the hero
const heroNews = newsData[0];

export default function HeroArticle() {
    if (!heroNews) return null;

    // Format date nicely
    const formattedDate = new Date(heroNews.time).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="hero-container fade-in">
            <div className="hero-filters">
                <button className="filter-chip active">All</button>
                <button className="filter-chip">New</button>
                <button className="filter-chip">Trending</button>
                <button className="filter-chip">Popular</button>
            </div>

            <div className="hero-content">
                <div className="hero-text-section">
                    <h1 className="hero-title">
                        <a href={heroNews.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                            {heroNews.title}
                        </a>
                    </h1>
                    <p className="hero-excerpt">
                        {heroNews.excerpt}
                    </p>
                    <div className="hero-meta">
                        <span className="author">By {heroNews.author || 'AI Reporter'}</span>
                        <span className="divider">•</span>
                        <span className="date">{formattedDate}</span>
                    </div>
                </div>

                <div className="hero-media-container">
                    <a href={heroNews.link} target="_blank" rel="noopener noreferrer">
                        <img
                            src={heroNews.image}
                            alt={heroNews.title}
                            className="hero-image"
                        />
                        <div className="play-button glass-panel">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
