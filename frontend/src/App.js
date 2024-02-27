import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import ExplorePage from './pages/ExplorePage';
import NotificationPage from './pages/NotificationPage';
import MessagesPage from './pages/MessagesPage';
import SettingPage from './pages/SettingPage';
import UserProfile from './pages/UserProfile';
import useAppStateContext from './hooks/useAppStateContext';

function App() {
  const { appState } = useAppStateContext();

  console.log('Current User:', appState.user);

  return (
    <Routes>
      {/* PublicRoute for login page */}
      <Route path="/login/*" element={<PublicRoute />} />

      {/* PrivateRoute for home page (requires authentication) */}
      <Route path="/home/*" element={<PrivateRoute element={<HomePage />} />} />

      {/* Additional PrivateRoutes for other pages */}
      <Route path="/explore/*" element={<PrivateRoute element={<ExplorePage />} />} />
      <Route path="/notifications/*" element={<PrivateRoute element={<NotificationPage />} />} />
      <Route path="/messages/*" element={<PrivateRoute element={<MessagesPage />} />} />
      <Route path="/settings/*" element={<PrivateRoute element={<SettingPage />} />} />

      {/* Default route to redirect to login */}
      <Route path="*" element={<Navigate to="/login" />} />

      {/* Additional route for LoginPage */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/:userId" element={<UserProfile />} />
    </Routes>
  );
}

export default App;
