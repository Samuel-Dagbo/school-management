import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('/news');
        setNews(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const categories = ['All', 'Announcement', 'Event', 'Academic', 'Sports'];

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">News & Updates</h1>
            <p className="text-xl text-primary-100">
              Stay informed about the latest happenings at our school.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? '' : cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (cat === 'All' && !category) || category === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news
                .filter((item) => !category || item.category === category)
                .map((item, index) => (
                  <article key={index} className="card card-hover">
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl mb-4 flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="badge-primary">{item.category || 'News'}</span>
                      <div className="flex items-center gap-1 text-sm text-slate-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                      {item.title}
                    </h2>
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {item.summary || item.content}
                    </p>
                  </article>
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">📰</span>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No news available</h3>
              <p className="text-slate-600">Check back later for updates</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}