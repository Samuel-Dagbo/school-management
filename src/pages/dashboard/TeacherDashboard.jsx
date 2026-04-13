import { Users, BookOpen, FileText, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export default function TeacherDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Welcome, {user?.firstName}!</h1>
        <p className="text-slate-600">Here's your teaching overview.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-card-icon bg-blue-50">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <p className="stat-card-value text-slate-900">3</p>
          <p className="stat-card-label">Classes Assigned</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon bg-green-50">
            <BookOpen className="w-6 h-6 text-green-600" />
          </div>
          <p className="stat-card-value text-slate-900">5</p>
          <p className="stat-card-label">Subjects</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon bg-purple-50">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <p className="stat-card-value text-slate-900">120</p>
          <p className="stat-card-label">Students</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/dashboard/teacher/results" className="btn-primary w-full justify-start">
              <Plus className="w-5 h-5" />
              Upload Results
            </Link>
            <Link to="/dashboard/teacher/profile" className="btn-secondary w-full justify-start">
              <Users className="w-5 h-5" />
              My Profile
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">My Classes</h2>
          <div className="space-y-4">
            {[
              { class: 'JSS 1', subject: 'Mathematics', students: 35 },
              { class: 'JSS 2', subject: 'Mathematics', students: 42 },
              { class: 'SSS 1', subject: 'Physics', students: 28 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{item.class}</p>
                  <p className="text-sm text-slate-600">{item.subject}</p>
                </div>
                <span className="badge-gray">{item.students} students</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}