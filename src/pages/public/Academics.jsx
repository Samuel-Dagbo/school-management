import { useState, useEffect } from 'react';
import { BookOpen, Users, ArrowRight } from 'lucide-react';
import api from '../../services/api';

export default function Academics() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/classes');
        setClasses(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch classes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const levels = ['nursery', 'primary', 'jss', 'sss'];
  const levelNames = { nursery: 'Nursery', primary: 'Primary', jss: 'JSS', sss: 'SSS' };

  return (
    <div className="animate-fade-in">
      <section className="bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700 text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Academics</h1>
            <p className="text-xl text-primary-100">
              Our comprehensive curriculum is designed to develop the whole child - academically, socially, and emotionally.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Our Programs</h2>
            <p className="text-slate-600 mt-4">Education for every stage of your child's development</p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-40 bg-slate-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : classes.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {levels.map((level) => (
                <div key={level} className="card card-hover text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{levelNames[level]}</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Comprehensive curriculum tailored for each level
                  </p>
                  <button className="btn-ghost text-sm">
                    View Classes <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {levels.map((level) => (
                <div key={level} className="card card-hover text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{levelNames[level]}</h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Comprehensive curriculum tailored for each level
                  </p>
                  <button className="btn-ghost text-sm">
                    View Classes <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Core Subjects</h2>
            <p className="text-slate-600 mt-4">Our comprehensive curriculum includes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Mathematics', 'English', 'Basic Science', 'Social Studies', 'Religious Studies', 'Home Economics', 'French', 'Computer'].map((subject, index) => (
              <div key={index} className="card flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <span className="font-medium text-slate-900">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Extra Curricular Activities</h2>
                <p className="text-primary-100 text-lg mb-6">
                  We believe in developing the whole child. Our students have access to a wide range of clubs and activities.
                </p>
                <ul className="space-y-3">
                  {['Sports & Athletics', 'Music & Drama', 'Art & Craft', 'Science Club', 'Debate Club', 'Reading Club'].map((activity, i) => (
                    <li key={i} className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <Users className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">Sports</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <BookOpen className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">Clubs</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <BookOpen className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">Arts</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <BookOpen className="w-8 h-8 text-white mx-auto mb-2" />
                  <span className="text-white font-medium">Music</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}