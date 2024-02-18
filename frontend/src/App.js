import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import ExplorePage from './pages/ExplorePage';
import NotificationPage from './pages/NotificationPage';
import MessagesPage from './pages/MessagesPage';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <Routes>
      <Route path="/login/*" element={<PublicRoute />} />
      {/* PrivateRoute for home page (requires authentication) */}
      <Route path="/home/*" element={<PrivateRoute element={<HomePage />} />}>
        {/* Additional PrivateRoutes for other pages */}
        <Route path="explore/*" element={<ExplorePage />} />
        <Route path="notifications/*" element={<NotificationPage />} />
        <Route path="messages/*" element={<MessagesPage />} />
        <Route path="profile/*" element={<UserProfile />} />
      </Route>
      {/* Default route to redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />
      {/* Additional route for LoginPage */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
