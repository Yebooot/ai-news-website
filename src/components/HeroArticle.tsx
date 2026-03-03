import './HeroArticle.css';
import { NewsItem } from '../App';

interface HeroArticleProps {
    newsData: NewsItem[];
}

export default function HeroArticle({ newsData }: HeroArticleProps) {
    if (!newsData || newsData.length === 0) return null;

    const heroNews = newsData[0];

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
                            onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800&h=600';
                            }}
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
