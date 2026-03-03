import { useState, useMemo } from 'react';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroArticle from './components/HeroArticle';
import NewsGrid from './components/NewsGrid';

import newsData from './data/news.json';

// Type definitions for the news items
export interface NewsItem {
  id: string;
  title: string;
  link: string;
  time: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
}

function App() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter newsData based on the selected category, memoized for performance
  const filteredNews = useMemo(() => {
    if (activeCategory === 'All') {
      return newsData;
    }
    return newsData.filter((item: any) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="app-main-wrapper">
      <Header activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className="app-content">
        <main className="main-feed">
          <HeroArticle newsData={filteredNews} />
          <NewsGrid newsData={filteredNews} />
        </main>
        <Sidebar newsData={filteredNews} />
      </div>
    </div>
  );
}

export default App;
