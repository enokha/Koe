// HomePage.js
import React from 'react';
import '../styles/HomePage.css';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

const HomePage = () => {
  return (
    <div className="homePage">
      {/* Sidebar */}
      <div className="sidebar">
        <SideBar />
      </div>

      {/* Feed */}
      <div className="feed">
        <Feed />
      </div>

      {/* Widgets */}
      <div className="widgets">
        <Widgets />
      </div>
    </div>
  );
};

export default HomePage;
