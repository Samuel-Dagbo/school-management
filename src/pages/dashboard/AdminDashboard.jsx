import { Link } from 'react-router-dom';
import { Users, BookOpen, GraduationCap, FileText, UserCheck, Calendar, TrendingUp, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    classes: 0,
    admissions: 0,
    published: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentStudents, setRecentStudents] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [studentsRes, teachersRes, classesRes, admissionsRes, resultsRes] = await Promise.all([
          api.get('/students?limit=5'),
          api.get('/teachers?limit=1'),
          api.get('/classes'),
          api.get('/admissions'),
          api.get('/results?limit=1')
        ]);
        setStats({
          students: studentsRes.data.pagination?.count || 0,
          teachers: teachersRes.data.pagination?.count || 0,
          classes: classesRes.data.data?.length || 0,
          admissions: admissionsRes.data.data?.filter(a => a.status === 'pending').length || 0,
          published: resultsRes.data.data?.filter(r => r.isPublished).length || 0,
          pending: resultsRes.data.data?.filter(r => !r.isPublished).length || 0
        });
        setRecentStudents(studentsRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: 'Total Students', value: stats.students, icon: GraduationCap, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-600', trend: '+12%', trendUp: true },
    { name: 'Teachers', value: stats.teachers, icon: Users, color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-600', trend: '+5%', trendUp: true },
    { name: 'Classes', value: stats.classes, icon: BookOpen, color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-600', trend: '+2', trendUp: true },
    { name: 'Pending Admissions', value: stats.admissions, icon: UserCheck, color: 'from-amber-500 to-amber-600', bgColor: 'bg-amber-50', textColor: 'text-amber-600', trend: '-3', trendUp: false }
  ];

  const quickActions = [
    { name: 'Add Student', path: '/dashboard/admin/students', icon: Users, color: 'bg-blue-500' },
    { name: 'Add Teacher', path: '/dashboard/admin/teachers', icon: Users, color: 'bg-green-500' },
    { name: 'Upload Results', path: '/dashboard/admin/results', icon: FileText, color: 'bg-purple-500' },
    { name: 'View Admissions', path: '/dashboard/admin/admissions', icon: UserCheck, color: 'bg-amber-500' }
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Welcome back, Admin!</h1>
          <p className="text-slate-600">Here's what's happening at your school today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-primary-700">2025-2026 Academic Year</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div key={index} className="stat-card card-interactive group">
            <div className="flex items-center justify-between">
              <div className={`stat-card-icon ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <span className={stat.trendUp ? 'stat-card-trend-up' : 'stat-card-trend-down'}>
                {stat.trendUp ? <ArrowUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="stat-card-value text-slate-900">
                {loading ? <span className="skeleton h-8 w-16 inline-block"></span> : stat.value}
              </p>
              <p className="stat-card-label">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Recent Students</h3>
            <Link to="/dashboard/admin/students" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-4 p-3 card-flat">
                  <div className="skeleton-avatar"></div>
                  <div className="flex-1">
                    <div className="skeleton-title mb-2"></div>
                    <div className="skeleton-text w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentStudents.length > 0 ? (
            <div className="space-y-2">
              {recentStudents.slice(0, 5).map((student, index) => (
                <Link key={index} to="/dashboard/admin/students" className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all group">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-semibold text-white">
                      {student.firstName?.[0]}{student.lastName?.[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-slate-900 truncate">{student.firstName} {student.lastName}</p>
                    <p className="text-sm text-slate-500 truncate">{student.class?.name || 'No class assigned'}</p>
                  </div>
                  <span className="text-xs text-slate-400 font-mono bg-slate-100 px-2 py-1 rounded">{student.studentId}</span>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 transition-colors" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Users className="empty-state-icon" />
              <p className="empty-state-title">No students yet</p>
              <p className="empty-state-description">Get started by adding your first student</p>
              <Link to="/dashboard/admin/students" className="btn-primary">
                Add Student
              </Link>
            </div>
          )}
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Quick Actions</h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group card-flat"
              >
                <div className={`w-10 h-10 ${action.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium text-slate-900 group-hover:text-primary-600 transition-colors">
                  {action.name}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/admin/sessions" className="card-interactive group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Sessions</p>
              <p className="text-sm text-slate-500">Manage academic</p>
            </div>
          </div>
        </Link>
        <Link to="/dashboard/admin/promotions" className="card-interactive group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Promotions</p>
              <p className="text-sm text-slate-500">Promote students</p>
            </div>
          </div>
        </Link>
        <Link to="/dashboard/admin/teacher-assignments" className="card-interactive group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Assignments</p>
              <p className="text-sm text-slate-500">Teacher subjects</p>
            </div>
          </div>
        </Link>
        <Link to="/dashboard/admin/subjects" className="card-interactive group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="font-medium text-slate-900">Subjects</p>
              <p className="text-sm text-slate-500">Manage subjects</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}