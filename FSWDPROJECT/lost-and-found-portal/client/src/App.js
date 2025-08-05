import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

// Pages
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ReportLostItemPage from './pages/ReportLostItemPage';
import ReportFoundItemPage from './pages/ReportFoundItemPage';
import ItemList from './pages/ItemList'; // Changed to pages folder

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protect "/" — show HomePage only if logged in */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <HomePage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Add the ItemList route - protected */}
        <Route
          path="/item-list"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ItemList />
            </PrivateRoute>
          }
        />

        {/* Other protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/report-lost"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ReportLostItemPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/report-found"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <ReportFoundItemPage />
            </PrivateRoute>
          }
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;