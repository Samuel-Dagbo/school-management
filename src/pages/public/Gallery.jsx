import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, ArrowLeft } from 'lucide-react';
import api from '../../services/api';

const PLACEHOLDER_IMAGES = [
  { id: 1, title: 'School Building', imageUrl: 'https://images.pexels.com/photos/5428007/pexels-photo-5428007.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Infrastructure' },
  { id: 2, title: 'Classroom Session', imageUrl: 'https://images.pexels.com/photos/5428150/pexels-photo-5428150.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Academics' },
  { id: 3, title: 'Sports Activities', imageUrl: 'https://images.pexels.com/photos/4676354/pexels-photo-4676354.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Sports' },
  { id: 4, title: 'Library Study', imageUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Academics' },
  { id: 5, title: 'Science Laboratory', imageUrl: 'https://images.pexels.com/photos/2280570/pexels-photo-2280570.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Academics' },
  { id: 6, title: 'Graduation Day', imageUrl: 'https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Events' },
  { id: 7, title: 'Music Class', imageUrl: 'https://images.pexels.com/photos/14583/pexels-photo-14583.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Activities' },
  { id: 8, title: 'Group Projects', imageUrl: 'https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=800', category: 'Activities' },
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await api.get('/gallery');
        const apiImages = response.data.data || [];
        setImages(apiImages.length > 0 ? apiImages : PLACEHOLDER_IMAGES);
      } catch (error) {
        setImages(PLACEHOLDER_IMAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = ['All', 'Events', 'Sports', 'Academics', 'Activities'];

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-200 hover:text-white mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Gallery</h1>
            <p className="text-xl text-primary-100">
              Discover moments from our vibrant school community.
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square bg-slate-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images
                .filter((item) => !category || item.category === category)
                .map((item, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-100">
                        <Image className="w-12 h-12 text-primary-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-medium text-sm">{item.title}</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Image className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No images yet</h3>
              <p className="text-slate-600">Check back later for photo updates</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}