import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../styles/HomePage.css';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

const HomePage = () => {
  return (
    <Router>
      <div className="homePage">
        {/* Sidebar */}
        <div className="sidebar">
          <SideBar />
        </div>

        {/* Feed */}
        <div className="feed">
          <Route path="/home" component={Feed} />
        </div>

        {/* Widgets */}
        <div className="widgets">
          <Widgets />
        </div>
      </div>
    </Router>
  );
};

export default HomePage;
