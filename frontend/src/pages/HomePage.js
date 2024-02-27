import React from 'react';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import '../styles/HomePage.css';

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
