import { ROLE_PERMISSIONS, PERMISSIONS } from '../constants/permissions';

export function hasPermission(role, permission) {
  if (!role) return false;
  const userPermissions = ROLE_PERMISSIONS[role] || [];
  return userPermissions.includes(PERMISSIONS.FULL_SYSTEM_ACCESS) || userPermissions.includes(permission);
}

export function getDefaultDashboardRoute(role) {
  switch (role) {
    case 'citizen':
      return '/dashboard/citizen';
    case 'worker':
      return '/dashboard/worker';
    case 'field_officer':
      return '/dashboard/field-officer';
    case 'commissioner':
      return '/dashboard/commissioner';
    case 'supervisor':
      return '/dashboard/supervisor';
    default:
      return '/login-selection';
  }
}
