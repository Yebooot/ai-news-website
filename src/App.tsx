import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HeroArticle from './components/HeroArticle';
import NewsGrid from './components/NewsGrid';

function App() {
  return (
    <div className="app-main-wrapper">
      <Header />
      <div className="app-content">
        <main className="main-feed">
          <HeroArticle />
          <NewsGrid />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
