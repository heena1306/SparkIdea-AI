import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Sparkles, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API = 'http://localhost:5000/api/auth';

const inputClass =
  'w-full bg-white/80 border border-slate-200 rounded-xl px-5 py-3.5 text-charcoal text-sm font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm placeholder-slate-400';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login: authLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from?.pathname || '/generate';
  const locationMessage = location.state?.message || '';

  // Already authenticated → redirect
  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true });
  }, [isAuthenticated, navigate, redirectTo]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setError('');
    setSuccess('');
    setForm({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic client-side validation
    if (!isLogin && !form.name.trim()) {
      return setError('Please enter your full name.');
    }
    if (!form.email.trim()) return setError('Email is required.');
    if (!form.password) return setError('Password is required.');
    if (!isLogin && form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    setLoading(true);
    try {
      const endpoint = isLogin ? `${API}/login` : `${API}/register`;
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const { data } = await axios.post(endpoint, payload);

      authLogin(data.token, data.user);
      setSuccess(isLogin ? `Welcome back, ${data.user.name}!` : `Account created! Welcome, ${data.user.name}!`);

      // Short delay to show success message, then redirect
      setTimeout(() => navigate(redirectTo, { replace: true }), 800);
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-secondary/10 via-primary/15 to-secondary/10 rounded-full blur-[80px] pointer-events-none animate-glow-pulse" />

      <motion.div
        key={isLogin ? 'login' : 'signup'}
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative z-10 w-full max-w-[420px] px-4 mt-[-60px]"
      >
        <div className="glass-card border border-white/60 p-8 sm:p-10 shadow-[0_20px_50px_rgba(59,130,246,0.08)] bg-white/65 backdrop-blur-2xl">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-secondary to-primary flex items-center justify-center shadow-lg mb-4 border border-white/40">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-charcoal text-lg font-[900] tracking-tighter">SparkIdea</h1>
            <p className="text-slate-400 text-xs font-medium mt-1">AI Project Idea Generator</p>
          </div>

          {/* Heading */}
          <h2 className="text-center text-charcoal text-2xl font-[900] mb-1 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create account'}
          </h2>
          <p className="text-center text-slate-400 text-sm font-medium mb-7">
            {isLogin ? 'Sign in to access your saved ideas' : 'Join and start generating ideas'}
          </p>

          {/* Route-message banner (e.g. from ProtectedRoute redirect) */}
          {locationMessage && !error && !success && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-4 py-3 rounded-xl mb-5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {locationMessage}
            </div>
          )}

          {/* Error Banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl mb-5"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Banner */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-600 text-xs font-semibold px-4 py-3 rounded-xl mb-5"
              >
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs text-slate-500 font-bold mb-1.5 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    className={inputClass}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs text-slate-500 font-bold mb-1.5 ml-1">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-xs text-slate-500 font-bold mb-1.5 ml-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={isLogin ? '••••••••' : 'Min. 6 characters'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full glow-button py-3.5 rounded-xl mt-2 font-[900] text-base tracking-wide flex items-center justify-center gap-2 ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isLogin ? 'Signing in…' : 'Creating account…'}
                </>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </motion.button>
          </form>

          {/* Switch mode */}
          <p className="mt-7 text-center text-sm font-medium text-slate-500">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={switchMode}
              className="font-[900] text-charcoal hover:text-primary transition-colors cursor-pointer"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
