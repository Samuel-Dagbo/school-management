import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/auth';
import ToastContainer from './components/Toast';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import PublicLayout from './components/PublicLayout';
import Home from './pages/public/Home';
import About from './pages/public/About';
import Academics from './pages/public/Academics';
import Admissions from './pages/public/Admissions';
import News from './pages/public/News';
import Gallery from './pages/public/Gallery';
import Contact from './pages/public/Contact';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import TeacherDashboard from './pages/dashboard/TeacherDashboard';
import Students from './pages/dashboard/Students';
import Teachers from './pages/dashboard/Teachers';
import Classes from './pages/dashboard/Classes';
import Subjects from './pages/dashboard/Subjects';
import Sessions from './pages/dashboard/Sessions';
import Results from './pages/dashboard/Results';
import AdmissionsList from './pages/dashboard/AdmissionsList';
import TeacherAssignments from './pages/dashboard/TeacherAssignments';
import Promotions from './pages/dashboard/Promotions';
import Profile from './pages/dashboard/Profile';

function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuthStore();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default function App() {
  const { checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teacher-assignments" element={<TeacherAssignments />} />
          <Route path="classes" element={<Classes />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="results" element={<Results />} />
          <Route path="admissions" element={<AdmissionsList />} />
          <Route path="promotions" element={<Promotions />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Student Routes */}
        <Route path="/dashboard/student" element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<StudentDashboard />} />
          <Route path="results" element={<Results />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Teacher Routes */}
        <Route path="/dashboard/teacher" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<TeacherDashboard />} />
          <Route path="results" element={<Results />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        
        {/* Default dashboard redirect */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}