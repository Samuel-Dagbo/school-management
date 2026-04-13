import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Users, Award, ArrowRight, CheckCircle2, Calendar, MapPin, Phone, Mail, Star, Trophy, Heart, Sparkles, School, Laptop, Palette, FlaskConical } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../services/api';

// Verified school-themed images from Pexels (free for commercial use)
const IMAGES = {
  hero: 'https://images.pexels.com/photos/35551059/pexels-photo-35551059.jpeg?auto=compress&cs=tinysrgb&w=1920',
  studentsLearning: 'https://images.pexels.com/photos/31864415/pexels-photo-31864415.jpeg?auto=compress&cs=tinysrgb&w=800',
  classroom: 'https://images.pexels.com/photos/5428150/pexels-photo-5428150.jpeg?auto=compress&cs=tinysrgb&w=800',
  teacherTeaching: 'https://images.pexels.com/photos/8364638/pexels-photo-8364638.jpeg?auto=compress&cs=tinysrgb&w=800',
  schoolBuilding: 'https://images.pexels.com/photos/5428007/pexels-photo-5428007.jpeg?auto=compress&cs=tinysrgb&w=800',
  library: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800',
  scienceLab: 'https://images.pexels.com/photos/2280570/pexels-photo-2280570.jpeg?auto=compress&cs=tinysrgb&w=800',
  computerLab: 'https://images.pexels.com/photos/4147675/pexels-photo-4147675.jpeg?auto=compress&cs=tinysrgb&w=800',
  artClass: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=800',
  sports: 'https://images.pexels.com/photos/4676354/pexels-photo-4676354.jpeg?auto=compress&cs=tinysrgb&w=800',
  graduation: 'https://images.pexels.com/photos/8926848/pexels-photo-8926848.jpeg?auto=compress&cs=tinysrgb&w=800',
  schoolBus: 'https://images.pexels.com/photos/1690258/pexels-photo-1690258.jpeg?auto=compress&cs=tinysrgb&w=800',
  music: 'https://images.pexels.com/photos/14583/pexels-photo-14583.jpeg?auto=compress&cs=tinysrgb&w=800',
  groupStudy: 'https://images.pexels.com/photos/8500421/pexels-photo-8500421.jpeg?auto=compress&cs=tinysrgb&w=800'
};

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/news/latest');
        setNews(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Quality Education',
      description: 'Comprehensive curriculum from Creche to JHS 3, designed to develop critical thinking and problem-solving skills.'
    },
    {
      icon: Users,
      title: 'Expert Teachers',
      description: 'Dedicated and experienced faculty committed to student success and personal growth.'
    },
    {
      icon: Trophy,
      title: 'Academic Excellence',
      description: 'Consistent track record of outstanding academic achievements in BECE and beyond.'
    },
    {
      icon: Heart,
      title: 'Holistic Development',
      description: 'We nurture character, values, and life skills alongside academic excellence.'
    }
  ];

  const programs = [
    { name: 'Creche', ages: '2-3', color: 'from-pink-400 to-pink-600' },
    { name: 'KG 1-2', ages: '4-5', color: 'from-purple-400 to-purple-600' },
    { name: 'Primary 1-6', ages: '6-11', color: 'from-blue-400 to-blue-600' },
    { name: 'JHS 1-3', ages: '12-14', color: 'from-green-400 to-green-600' }
  ];

  const stats = [
    { value: '500+', label: 'Students' },
    { value: '25+', label: 'Teachers' },
    { value: '15+', label: 'Years Experience' },
    { value: '100%', label: 'BECE Pass Rate' }
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={IMAGES.classroom} alt="School" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent"></div>
        </div>
        
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-sm backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-primary-300" />
                <span className="text-primary-200">Enrollment Open for 2025-2026 Academic Year</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Building Future<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-200 to-accent-300">Leaders Today</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-300 max-w-lg leading-relaxed">
                From Creche to JHS 3, we provide world-class education that nurtures academic excellence, character, and critical thinking.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/admissions" className="btn bg-primary-500 hover:bg-primary-600 text-white btn-lg shadow-glow">
                  Apply Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/academics" className="btn bg-white/10 hover:bg-white/20 text-white btn-lg backdrop-blur-sm border border-white/20">
                  Explore Programs
                </Link>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br ${i === 1 ? 'from-pink-400 to-pink-600' : i === 2 ? 'from-purple-400 to-purple-600' : i === 3 ? 'from-blue-400 to-blue-600' : 'from-green-400 to-green-600'} flex items-center justify-center text-white text-xs font-semibold`}>
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-slate-400">
                  <span className="text-white font-semibold">100+</span> happy students
                </div>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden h-48 group">
                <img src={IMAGES.classroom} alt="Students in classroom" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Active Learning</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48 group">
                <img src={IMAGES.teacherTeaching} alt="Teacher with students" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Expert Teachers</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48 group">
                <img src={IMAGES.schoolBuilding} alt="School campus" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Modern Campus</p>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden h-48 group">
                <img src={IMAGES.graduation} alt="Academic excellence" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Academic Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Why Choose Our School</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              We provide a nurturing environment where every student can thrive academically, socially, and personally.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group card-hover text-center animate-slide-up border border-slate-200"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Latest News & Updates</h2>
              <p className="text-slate-600 mt-2">Stay informed about what's happening at our school</p>
            </div>
            <Link to="/news" className="btn-secondary">
              View All News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-48 bg-slate-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : news.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-8">
              {news.slice(0, 3).map((item, index) => (
                <Link key={index} to="/news" className="card card-hover group border border-slate-200">
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                    <div className="text-5xl opacity-50">{['📰', '🎉', '📚'][index]}</div>
                  </div>
                  <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full mb-3">
                    {item.category || 'News'}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 line-clamp-2">{item.summary}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-4">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 card border border-dashed border-slate-300">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600">No news available at the moment</p>
              <Link to="/news" className="btn-primary mt-4">View All News</Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto mb-10">
            Take the first step towards your child's bright future. Our admissions team is ready to welcome you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/admissions" 
              className="btn bg-white text-primary-700 hover:bg-primary-50 btn-lg shadow-lg"
            >
              Start Application
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/contact" 
              className="btn bg-primary-500/30 hover:bg-primary-500/50 text-white btn-lg border border-primary-400/30 backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Get in Touch</h2>
            <p className="text-slate-600 mt-2">We'd love to hear from you</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 card border border-slate-200">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Address</h3>
              <p className="text-slate-600 text-sm">East Legon, Accra<br />Ghana</p>
            </div>
            <div className="text-center p-6 card border border-slate-200">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Phone</h3>
              <p className="text-slate-600 text-sm">+233 20 123 4567<br />+233 20 123 4568</p>
            </div>
            <div className="text-center p-6 card border border-slate-200">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-7 h-7 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Email</h3>
              <p className="text-slate-600 text-sm">info@school.edu<br />admissions@school.edu</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}