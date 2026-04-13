import { Target, Eye, Heart, Star, Users, Lightbulb } from 'lucide-react';

const IMAGES = {
  hero: 'https://images.pexels.com/photos/5428150/pexels-photo-5428150.jpeg?auto=compress&cs=tinysrgb&w=1200',
  about: 'https://images.pexels.com/photos/31864415/pexels-photo-31864415.jpeg?auto=compress&cs=tinysrgb&w=800',
  students: 'https://images.pexels.com/photos/35551059/pexels-photo-35551059.jpeg?auto=compress&cs=tinysrgb&w=800',
  teacher: 'https://images.pexels.com/photos/8364638/pexels-photo-8364638.jpeg?auto=compress&cs=tinysrgb&w=800',
  campus: 'https://images.pexels.com/photos/5428007/pexels-photo-5428007.jpeg?auto=compress&cs=tinysrgb&w=800',
};

export default function About() {
  const values = [
    { icon: Star, title: 'Excellence', description: 'Striving for the highest standards in everything we do' },
    { icon: Heart, title: 'Integrity', description: 'Building character through honesty and moral values' },
    { icon: Lightbulb, title: 'Innovation', description: 'Embracing new ideas and creative solutions' },
    { icon: Users, title: 'Inclusivity', description: 'Creating a welcoming environment for all' },
  ];

  const timeline = [
    { year: '2010', title: 'School Founded', description: 'Started with just 50 students and 5 teachers' },
    { year: '2015', title: 'Expansion', description: 'Added JHS department and modern facilities' },
    { year: '2020', title: 'Technology', description: 'Introduced ICT lessons and digital learning' },
    { year: '2025', title: 'Excellence Award', description: 'Recognized as top performing school in the region' },
  ];

  return (
    <div className="animate-fade-in">
      <section className="relative bg-gradient-to-br from-primary-950 via-primary-800 to-primary-700 text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.campus} alt="Campus" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-900/80 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Our School</h1>
            <p className="text-xl text-primary-100">
              For over 15 years, we have been dedicated to providing quality education that empowers students to achieve their full potential.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg mb-8">
                To provide quality education that empowers students to achieve their full potential and become responsible citizens who contribute positively to society.
              </p>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Mission</h3>
                  <p className="text-slate-600">To nurture academic excellence, character development, and critical thinking in every student.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-50 rounded-2xl p-6">
                <Eye className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="font-semibold text-slate-900">Vision</h3>
                <p className="text-slate-600 text-sm mt-2">To be a center of excellence in education.</p>
              </div>
              <div className="bg-primary-50 rounded-2xl p-6">
                <Heart className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="font-semibold text-slate-900">Values</h3>
                <p className="text-slate-600 text-sm mt-2">Excellence, Integrity, Innovation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Journey</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {timeline.map((item, index) => (
              <div key={index} className="relative">
                {index < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-primary-200 -z-10"></div>
                )}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {item.year}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-primary-200 transition-colors">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}