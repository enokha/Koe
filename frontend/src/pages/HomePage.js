import React from 'react';
import "../styles/HomePage.css";
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

const HomePage = () => {
  return (
    <div className="homePage">
      {/* Sidebar */}
      <SideBar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />

    </div>
  );
};

export default HomePage;
