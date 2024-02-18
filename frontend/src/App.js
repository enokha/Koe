import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ExplorePage from './pages/ExplorePage';
import NotificationPage from './pages/NotificationPage';
import MessagesPage from './pages/MessagesPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Routes>
      {/* Public route for login */}
      <Route path="/login/*" element={<LoginPage />} />
      {/* Public route for home */}
      <Route path="/home/*" element={<HomePage />} />
      {/* Private routes for other pages */}
      <Route path="/explore/*" element={<ExplorePage />} />
      <Route path="/notifications/*" element={<NotificationPage />} />
      <Route path="/messages/*" element={<MessagesPage />} />
      <Route path="/profile/*" element={<UserProfile />} />
      {/* Default route to redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
