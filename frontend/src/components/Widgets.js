import React from 'react';
import '../styles/HomePage.css';
import { Routes, Route } from 'react-router-dom';
import TrendBox from './TrendBox';

const Widgets = () => {
  return (
    <div className="widgets">
      {/* Widgets Input */}
      <div className="widgets__input">
        <span className="widgets__searchIcon">🔍</span>
        <input type="text" placeholder="Search Twitter" />
      </div>

      {/* Widgets WidgetContainer */}
      <div className="widgets__widgetContainer">
        <Routes>
          <Route path="/home" element={<TrendBox />} />
          {/* Add routes for other pages */}
        </Routes>
      </div>
    </div>
  );
};

export default Widgets;
