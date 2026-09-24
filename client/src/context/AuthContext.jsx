import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('synapse_token') || null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [pendingAction, setPendingAction] = useState(null);

  // Restore authenticated session on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('synapse_token');
      if (storedToken) {
        try {
          const res = await api.get('/auth/me');
          if (res.data.success) {
            setUser(res.data.user);
            setToken(storedToken);
          }
        } catch (error) {
          console.warn('Session restoration failed:', error.message);
          localStorage.removeItem('synapse_token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const openAuthModal = (mode = 'login', actionName = null) => {
    setAuthModalMode(mode);
    setPendingAction(actionName);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setPendingAction(null);
  };

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data.success) {
        const { user: userData, token: userToken } = res.data;
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('synapse_token', userToken);
        toast.success(`Welcome back, ${userData.name}!`);
        closeAuthModal();
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Login failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data.success) {
        const { user: userData, token: userToken } = res.data;
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('synapse_token', userToken);
        toast.success(`Account created! Welcome to SynapseCV, ${userData.name}.`);
        closeAuthModal();
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('synapse_token');
    toast.success('Signed out successfully');
  };

  const updateProfile = async (profileData) => {
    try {
      const res = await api.put('/auth/profile', profileData);
      if (res.data.success) {
        setUser(res.data.user);
        toast.success('Profile updated successfully');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Profile update failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const updateAvatar = async (avatarBase64) => {
    try {
      const res = await api.post('/auth/avatar', { avatar: avatarBase64 });
      if (res.data.success) {
        setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
        toast.success('Profile picture updated');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Avatar upload failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const removeAvatar = async () => {
    try {
      const res = await api.delete('/auth/avatar');
      if (res.data.success) {
        setUser((prev) => ({ ...prev, avatar: '' }));
        toast.success('Profile picture removed');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Avatar removal failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const res = await api.put('/auth/change-password', { currentPassword, newPassword });
      if (res.data.success) {
        toast.success('Password changed successfully');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Password update failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  const deleteAccount = async () => {
    try {
      const res = await api.delete('/auth/account');
      if (res.data.success) {
        logout();
        toast.success('Your account and associated data have been permanently deleted.');
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || error.message || 'Account deletion failed';
      toast.error(msg);
      return { success: false, message: msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        authModalOpen,
        authModalMode,
        pendingAction,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        updateProfile,
        updateAvatar,
        removeAvatar,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
