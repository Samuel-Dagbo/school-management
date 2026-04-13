import { Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Folder, 
  Calendar, 
  FileText, 
  UserCheck, 
  Settings, 
  LogOut,
  Menu,
  X,
  ChevronDown,
  ArrowUpCircle,
  Search,
  Bell,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '../store/auth';
import clsx from 'clsx';

const adminNav = [
  { name: 'Dashboard', path: '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Students', path: '/dashboard/admin/students', icon: Users },
  { name: 'Teachers', path: '/dashboard/admin/teachers', icon: Users },
  { name: 'Teacher Assignments', path: '/dashboard/admin/teacher-assignments', icon: UserCheck },
  { name: 'Classes', path: '/dashboard/admin/classes', icon: Folder },
  { name: 'Subjects', path: '/dashboard/admin/subjects', icon: BookOpen },
  { name: 'Sessions', path: '/dashboard/admin/sessions', icon: Calendar },
  { name: 'Promotions', path: '/dashboard/admin/promotions', icon: ArrowUpCircle },
  { name: 'Results', path: '/dashboard/admin/results', icon: FileText },
  { name: 'Admissions', path: '/dashboard/admin/admissions', icon: UserCheck },
];

const studentNav = [
  { name: 'Dashboard', path: '/dashboard/student', icon: LayoutDashboard },
  { name: 'Results', path: '/dashboard/student/results', icon: FileText },
];

const teacherNav = [
  { name: 'Dashboard', path: '/dashboard/teacher', icon: LayoutDashboard },
  { name: 'Results', path: '/dashboard/teacher/results', icon: FileText },
];

export default function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getNavItems = () => {
    switch (user.role) {
      case 'admin': return adminNav;
      case 'teacher': return teacherNav;
      case 'student': return studentNav;
      default: return [];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBadge = () => {
    switch (user.role) {
      case 'admin': return { bg: 'bg-primary-100', text: 'text-primary-700', label: 'Administrator' };
      case 'teacher': return { bg: 'bg-green-100', text: 'text-green-700', label: 'Teacher' };
      case 'student': return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Student' };
      default: return { bg: 'bg-slate-100', text: 'text-slate-700', label: user.role };
    }
  };

  const roleBadge = getRoleBadge();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className={clsx(
        "fixed lg:static inset-0 z-50 lg:z-auto bg-white border-r border-slate-200 w-72 flex flex-col transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-glow">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900">SAMS</span>
              <p className="text-xs text-slate-500 -mt-0.5">School Portal</p>
            </div>
          </Link>
          <button
            className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">
            Main Menu
          </div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                location.pathname === item.path
                  ? "bg-primary-50 text-primary-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className={clsx("w-5 h-5", location.pathname === item.path ? "text-primary-600" : "text-slate-400")} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <Link 
            to={`/dashboard/${user.role}/profile`}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
          <div className="flex items-center justify-between h-20 px-6">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 hover:bg-slate-100 rounded-xl"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div className="hidden md:block relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border-0 rounded-xl text-sm w-64 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-xl relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-sm font-semibold text-white">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-slate-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <span className={clsx("text-xs px-2 py-0.5 rounded-full", roleBadge.bg, roleBadge.text)}>
                      {roleBadge.label}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 animate-slide-up">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link
                      to={`/dashboard/${user.role}/profile`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="w-4 h-4" />
                      Profile Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}