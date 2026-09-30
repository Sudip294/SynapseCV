import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { SynapseLogo } from '../brand/SynapseLogo';
import { X, Mail, Lock, User, Eye, EyeOff, Sparkles, ArrowRight, Loader2, KeyRound, CheckCircle2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

export const AuthModal = () => {
  const {
    authModalOpen,
    authModalMode,
    pendingAction,
    closeAuthModal,
    openAuthModal,
    login,
    register,
    forgotPassword,
    resetPassword,
  } = useAuth();

  const navigate = useNavigate();
  const [mode, setMode] = useState(authModalMode || 'login'); // 'login' | 'register' | 'forgot'
  const [forgotStep, setForgotStep] = useState(1); // Step 1: Request OTP | Step 2: Verify OTP & New Password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [resetData, setResetData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
      setForgotStep(1);
    }
  }, [authModalMode]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleResetChange = (e) => {
    setResetData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let res;
    if (mode === 'login') {
      res = await login(formData.email, formData.password);
      if (res?.success) {
        if (pendingAction === 'ATS Resume Analyzer' || pendingAction === 'ATS Analyzer') {
          navigate('/analyzer');
        } else {
          navigate('/dashboard');
        }
      }
    } else if (mode === 'register') {
      res = await register(formData.name, formData.email, formData.password);
      if (res?.success) {
        if (pendingAction === 'ATS Resume Analyzer' || pendingAction === 'ATS Analyzer') {
          navigate('/analyzer');
        } else {
          navigate('/dashboard');
        }
      }
    }
    setIsSubmitting(false);
  };

  // Step 1: Handle Send OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!resetData.email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    const res = await forgotPassword(resetData.email);
    setIsSubmitting(false);

    if (res?.success) {
      setForgotStep(2);
    }
  };

  // Step 2: Handle Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetData.otp) {
      toast.error('Please enter the OTP sent to your email');
      return;
    }
    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }
    if (resetData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsSubmitting(true);
    const res = await resetPassword(
      resetData.email,
      resetData.otp,
      resetData.newPassword,
      resetData.confirmPassword
    );
    setIsSubmitting(false);

    if (res?.success) {
      // Pre-fill login email and switch to login mode
      setFormData((prev) => ({ ...prev, email: resetData.email, password: '' }));
      setMode('login');
      setForgotStep(1);
      setResetData({ email: '', otp: '', newPassword: '', confirmPassword: '' });
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setForgotStep(1);
    openAuthModal(newMode, pendingAction);
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-white"
          >
            {/* Close Button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header & Logo */}
            <div className="text-center space-y-3 mb-6">
              <div className="flex justify-center">
                <SynapseLogo className="h-9 w-auto" />
              </div>

              {mode === 'forgot' ? (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {forgotStep === 1 ? 'Forgot Password?' : 'Reset Password'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {forgotStep === 1
                      ? 'Enter your registered Gmail email to receive a password reset OTP.'
                      : `Enter the OTP sent to ${resetData.email} and choose your new password.`}
                  </p>
                </div>
              ) : pendingAction ? (
                <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-left flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-brand-800 dark:text-brand-200">
                      Authentication Required
                    </p>
                    <p className="text-xs text-brand-700/80 dark:text-brand-300/80">
                      Sign in or create an account to access <strong>{pendingAction}</strong>.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {mode === 'login'
                    ? 'Welcome back! Sign in to access your resumes & AI tools.'
                    : 'Create a free SynapseCV account to start building ATS resumes.'}
                </p>
              )}

              {/* Mode Switcher Tabs (Only for login and register modes) */}
              {mode !== 'forgot' && (
                <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-850 rounded-xl text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className={`py-2 rounded-lg transition-all ${
                      mode === 'login'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => switchMode('register')}
                    className={`py-2 rounded-lg transition-all ${
                      mode === 'register'
                        ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              )}
            </div>

            {/* FORGOT PASSWORD FORM FLOW */}
            {mode === 'forgot' ? (
              forgotStep === 1 ? (
                /* Step 1: Send OTP */
                <form onSubmit={handleSendOTP} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={resetData.email}
                        onChange={handleResetChange}
                        placeholder="yourname@gmail.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending OTP...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Sign In</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Step 2: Verify OTP & Reset Password */
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Enter 6-Digit OTP
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        name="otp"
                        maxLength={6}
                        required
                        value={resetData.otp}
                        onChange={handleResetChange}
                        placeholder="123456"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white tracking-widest font-mono focus:ring-2 focus:ring-brand-500 focus:outline-none text-center"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        required
                        value={resetData.newPassword}
                        onChange={handleResetChange}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        required
                        value={resetData.confirmPassword}
                        onChange={handleResetChange}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm shadow-md shadow-green-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Change Password</span>
                      </>
                    )}
                  </button>

                  <div className="flex justify-between items-center pt-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setForgotStep(1)}
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                      Resend OTP
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-brand-600 hover:underline dark:text-brand-400"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* LOGIN & REGISTER FORMS */
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setResetData((prev) => ({ ...prev, email: formData.email }));
                          setMode('forgot');
                          setForgotStep(1);
                        }}
                        className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 font-medium transition-colors"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm shadow-md shadow-brand-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
              By signing up, you agree to SynapseCV's Privacy Policy & Terms of Service.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
