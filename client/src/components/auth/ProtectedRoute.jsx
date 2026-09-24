import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, ShieldAlert, Sparkles, LogIn } from 'lucide-react';

export const ProtectedRoute = ({ children, featureName = 'this feature' }) => {
  const { isAuthenticated, loading, openAuthModal } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openAuthModal('login', featureName);
    }
  }, [loading, isAuthenticated, featureName, openAuthModal]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Verifying authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-brand-100 dark:bg-brand-950 text-brand-600 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Authentication Required</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            You must be logged in to access {featureName}. Sign in or create a free account to continue where you left off.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => openAuthModal('login', featureName)}
              className="w-full py-2.5 rounded-xl bg-brand-600 text-white font-semibold text-sm shadow-md hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Access</span>
            </button>
            <button
              onClick={() => openAuthModal('register', featureName)}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};
