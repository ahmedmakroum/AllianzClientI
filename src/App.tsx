import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './components/Layout/MainLayout';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import DashboardPage from './components/Dashboard/DashboardPage';
import RecordsPage from './components/Records/RecordsPage';
import AppointmentsPage from './components/Appointments/AppointmentsPage';
import ProfilePage from './components/Profile/ProfilePage';
import ContratsPage from './components/Contrats/ContratsPage';
import AdherentsPage from './components/Adherents/AdherentsPage';
import DeclarationsPage from './components/Declarations/DeclarationsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="records" element={<RecordsPage />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            
            {/* New routes for Allianz features */}
            <Route path="contrats" element={<ContratsPage />} />
            <Route path="adherents" element={<AdherentsPage />} />
            <Route path="declarations" element={<DeclarationsPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;