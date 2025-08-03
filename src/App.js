import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Import the necessary components and context provider
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import Estimate from './pages/Estimate';
import AdminDashboard from './pages/AdminDashboard'; // Renamed for clarity

function App() {
  return (
    // 2. Wrap your entire application in the AuthProvider
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomePage />} />
          
          <Route path="/estimate/:serviceName" element={<Estimate />} />
          <Route 
            path="/estimate" 
            element={<Navigate to="/estimate/wedding" replace />} 
          />

          {/* --- Protected Admin Route --- */}
          {/* 3. The /admin path is now correctly wrapped in the ProtectedRoute component */}
          <Route 
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 4. The /login route is no longer needed, as login is handled by a modal on the HomePage */}
          
          {/* A fallback route to redirect any unknown URLs to the homepage */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;