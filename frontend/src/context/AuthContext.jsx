import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../constants/roles';
import { getDefaultDashboardRoute } from '../utils/permissions';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ecodrop_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('ecodrop_token') || null);

  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken || 'demo_jwt_token_2026');
    localStorage.setItem('ecodrop_user', JSON.stringify(userData));
    localStorage.setItem('ecodrop_token', userToken || 'demo_jwt_token_2026');
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('ecodrop_user');
    localStorage.removeItem('ecodrop_token');
    AuthService.logout();
  };

  const registerCitizen = async (data) => {
    const res = await AuthService.registerCitizen(data);
    if (res.success) {
      const demoCitizen = {
        id: 'usr_citizen_' + Date.now(),
        name: data.name || 'GVMC Citizen',
        email: data.email,
        role: ROLES.CITIZEN
      };
      loginUser(demoCitizen, 'token_citizen_2026');
    }
    return res;
  };

  const forgotPassword = async (email) => {
    return await AuthService.forgotPassword(email);
  };

  const checkRole = (requiredRole) => {
    if (!user) return false;
    if (user.role === ROLES.SUPERVISOR) return true; // Supervisor has access to all
    return user.role === requiredRole;
  };

  const redirectToDashboard = () => {
    if (!user) return '/login-selection';
    return getDefaultDashboardRoute(user.role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loginUser,
      logoutUser,
      registerCitizen,
      forgotPassword,
      checkRole,
      redirectToDashboard,
      roles: ROLES
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
