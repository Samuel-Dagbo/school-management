import { GraduationCap, TrendingUp, FileText, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

export default function StudentDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Welcome, {user?.firstName}!</h1>
        <p className="text-slate-600">Here's your academic overview.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-card-icon bg-blue-50">
            <GraduationCap className="w-6 h-6 text-blue-600" />
          </div>
          <p className="stat-card-value text-slate-900">JSS 2</p>
          <p className="stat-card-label">Current Class</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon bg-green-50">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="stat-card-value text-slate-900">85%</p>
          <p className="stat-card-label">Average Score</p>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-icon bg-purple-50">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <p className="stat-card-value text-slate-900">1st</p>
          <p className="stat-card-label">Class Position</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/dashboard/student/results" className="btn-secondary w-full justify-start">
              <FileText className="w-5 h-5" />
              View Results
            </Link>
            <Link to="/dashboard/student/profile" className="btn-secondary w-full justify-start">
              <GraduationCap className="w-5 h-5" />
              My Profile
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Recent Results</h2>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', score: 92, grade: 'A1' },
              { subject: 'English', score: 88, grade: 'A2' },
              { subject: 'Basic Science', score: 85, grade: 'B2' }
            ].map((result, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                <div>
                  <p className="font-medium text-slate-900">{result.subject}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-900">{result.score}%</p>
                  <p className="text-sm text-green-600">{result.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}