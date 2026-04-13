import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2, Sparkles, User } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export default function Login() {
  const navigate = useNavigate();
  const { login, user, isLoading } = useAuthStore();
  const [loginType, setLoginType] = useState('email');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');

  if (user) {
    const redirectPath = user.role === 'admin' ? '/dashboard/admin' 
      : user.role === 'teacher' ? '/dashboard/teacher' 
      : '/dashboard/student';
    return <Navigate to={redirectPath} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const credentials = loginType === 'student' 
      ? { studentId, password }
      : { email, password };

    const result = await login(credentials);
    if (result.success) {
      const redirectPath = result.user?.role === 'admin' ? '/dashboard/admin' 
        : result.user?.role === 'teacher' ? '/dashboard/teacher' 
        : '/dashboard/student';
      navigate(redirectPath);
    } else {
      if (result.requiresVerification) {
        setRequiresVerification(true);
        setVerificationEmail(result.email);
      } else {
        setError(result.error);
      }
    }
  };

  const handleResendVerification = async () => {
    setRequiresVerification(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="w-full max-w-md relative">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-600 mt-2">Sign in to your portal</p>
          </div>

          <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => { setLoginType('email'); setError(''); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                loginType === 'email' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => { setLoginType('student'); setError(''); }}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                loginType === 'student' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Student ID
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                {error}
              </div>
            )}

            {requiresVerification && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-sm text-amber-700 mb-3">
                  Your email is not verified. Please check your email for the verification link.
                </p>
                <button
                  type="button"
                  onClick={handleResendVerification}
                  className="text-sm text-primary-600 font-medium hover:underline"
                >
                  Didn't receive it? Resend verification email
                </button>
              </div>
            )}

            {loginType === 'student' ? (
              <div>
                <label className="label">Student ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    className="input pl-12"
                    placeholder="STU0001"
                    required
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="label">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-12"
                    placeholder="you@school.edu"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-12 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-primary-600 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}