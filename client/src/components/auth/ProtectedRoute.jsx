import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, ShieldAlert, LogIn } from 'lucide-react';

export const ProtectedRoute = ({ children, featureName = 'this feature' }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  // When the user logs out while on a protected route, redirect them to home.
  // This unmounts the protected route entirely so no modal re-open loop occurs.
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-brand-600 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Verifying authentication...</p>
      </div>
    );
  }

  // While redirect is happening, render nothing
  if (!isAuthenticated) {
    return null;
  }

  return children;
};
