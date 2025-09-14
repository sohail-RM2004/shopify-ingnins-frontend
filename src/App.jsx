import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loginpage from './pages/Loginpage';
import Registerpage from './pages/Registerpage';
import Userdashboard from './pages/Userdashboard';

// A simple component to protect routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Userdashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;