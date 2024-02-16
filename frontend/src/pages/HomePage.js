import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/HomePage.css";
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import LogoutButton from '../components/LogoutButton';

const HomePage = () => {
  return (
    <div className="homePage">
      {/* Sidebar */}
      <SideBar />

      {/* Feed */}
      <Feed />

      {/* Widgets */}
      <Widgets />

      {/* Link to User Profile */}
      <Link to="/profile">Go to Profile</Link>

      {/* Logout Button */}
      <LogoutButton />
    </div>
  );
};

export default HomePage;
