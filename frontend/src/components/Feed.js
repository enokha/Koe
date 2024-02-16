import React from 'react';
import '../styles/HomePage.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const Feed = () => {
  return (
    <div className="feed">
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/* ... (Other routes) */}
      </Routes>
    </div>
  );
};

export default Feed;
