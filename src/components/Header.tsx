import { Search, Globe, ChevronDown, Activity } from 'lucide-react';
import './Header.css';

const categories = ['All', 'Politics', 'Business', 'Tech', 'Science', 'Health', 'Sports'];

export default function Header() {
    return (
        <div className="header-wrapper">
            <header className="header-container">
                {/* Logo Section */}
                <div className="header-logo">
                    <div className="logo-icon">
                        <Activity size={24} color="var(--bg-primary)" />
                    </div>
                    <span className="logo-text">Ainews.</span>
                </div>

                {/* Categories Section */}
                <nav className="header-nav">
                    {categories.map((cat, idx) => (
                        <button key={cat} className={`nav-pill ${idx === 0 ? 'active' : ''}`}>
                            {cat}
                        </button>
                    ))}
                    <button className="nav-pill pill-icon">
                        More <ChevronDown size={14} />
                    </button>
                </nav>

                {/* Actions Section */}
                <div className="header-actions">
                    <div className="lang-selector">
                        <Globe size={18} />
                        <span>EN</span>
                        <ChevronDown size={14} />
                    </div>

                    <div className="search-bar">
                        <Search size={18} className="search-icon" />
                        <input type="text" placeholder="Search news..." />
                    </div>
                </div>
            </header>

            {/* Sub Header for breadcrumbs and interactions - as requested by design analysis */}
            <div className="sub-header">
                <div className="breadcrumb">
                    <span className="back-btn">← Back</span>
                    <span className="separator">/</span>
                    <span className="current-path">Featured News</span>
                </div>
                <div className="stats">
                    <span>2.4k Likes</span>
                    <span className="separator">•</span>
                    <span>142 Comments</span>
                </div>
            </div>
        </div>
    );
}
