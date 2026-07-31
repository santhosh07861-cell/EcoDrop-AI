import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getDefaultDashboardRoute } from '../utils/permissions';
import { ROLES } from '../constants/roles';

export default function RoleGuard({ allowedRole, children }) {
  const { user } = useAuth();

  // If user is not logged in, navigate to portal selection screen
  if (!user) {
    return <Navigate to="/login-selection" replace />;
  }

  // Supervisor has master access to all role dashboards
  if (user.role === ROLES.SUPERVISOR) {
    return children;
  }

  // Check if current user role matches the allowed role
  if (user.role !== allowedRole) {
    const userDefaultRoute = getDefaultDashboardRoute(user.role);
    return <Navigate to={userDefaultRoute} replace />;
  }

  return children;
}
