import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BottomNavigation from './components/BottomNavigation';

// Authentication Screens
import SplashScreen from './authentication/SplashScreen';
import LoginSelection from './authentication/LoginSelection';
import CitizenLogin from './authentication/CitizenLogin';
import CitizenRegister from './authentication/CitizenRegister';
import ForgotPassword from './authentication/ForgotPassword';
import WorkerLogin from './authentication/WorkerLogin';
import AdminLogin from './authentication/AdminLogin';

// Dashboards
import CitizenDashboard from './dashboards/citizen/CitizenDashboard';
import WorkerDashboard from './dashboards/worker/WorkerDashboard';
import FieldOfficerDashboard from './dashboards/fieldOfficer/FieldOfficerDashboard';
import CommissionerDashboard from './dashboards/commissioner/CommissionerDashboard';
import SupervisorDashboard from './dashboards/supervisor/SupervisorDashboard';

// Navigation Guard
import RoleGuard from './navigation/RoleGuard';

// Existing Pages
import Home from './pages/Home';
import FindDropPoint from './pages/FindDropPoint';
import QRScan from './pages/QRScan';
import UploadWaste from './pages/UploadWaste';
import Complaint from './pages/Complaint';
import History from './pages/History';
import Profile from './pages/Profile';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserProvider>
          <BrowserRouter>
            <div className="flex flex-col min-h-screen pb-16 md:pb-0">
              <Navbar />

              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Routes>
                  {/* Public Portal & Auth Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/splash" element={<SplashScreen />} />
                  <Route path="/login-selection" element={<LoginSelection />} />
                  
                  <Route path="/login" element={<Navigate to="/login-selection" replace />} />
                  <Route path="/login/citizen" element={<CitizenLogin />} />
                  <Route path="/register" element={<CitizenRegister />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/login/worker" element={<WorkerLogin />} />
                  <Route path="/login/admin" element={<AdminLogin />} />
                  <Route path="/admin-login" element={<AdminLogin />} />

                  {/* Role-Based Dashboard Routes */}
                  <Route 
                    path="/dashboard/citizen" 
                    element={
                      <RoleGuard allowedRole="citizen">
                        <CitizenDashboard />
                      </RoleGuard>
                    } 
                  />

                  <Route 
                    path="/dashboard/worker" 
                    element={
                      <RoleGuard allowedRole="worker">
                        <WorkerDashboard />
                      </RoleGuard>
                    } 
                  />

                  <Route 
                    path="/dashboard/field-officer" 
                    element={
                      <RoleGuard allowedRole="field_officer">
                        <FieldOfficerDashboard />
                      </RoleGuard>
                    } 
                  />

                  <Route 
                    path="/dashboard/commissioner" 
                    element={
                      <RoleGuard allowedRole="commissioner">
                        <CommissionerDashboard />
                      </RoleGuard>
                    } 
                  />

                  <Route 
                    path="/dashboard/supervisor" 
                    element={
                      <RoleGuard allowedRole="supervisor">
                        <SupervisorDashboard />
                      </RoleGuard>
                    } 
                  />

                  {/* Feature Pages */}
                  <Route path="/find" element={<FindDropPoint />} />
                  <Route path="/scan" element={<QRScan />} />
                  <Route path="/upload" element={<UploadWaste />} />
                  <Route path="/complaint" element={<Complaint />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* Legacy Admin Redirect */}
                  <Route path="/admin" element={<Navigate to="/dashboard/field-officer" replace />} />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
              <BottomNavigation />
            </div>
            <Toaster position="bottom-right" reverseOrder={false} />
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
