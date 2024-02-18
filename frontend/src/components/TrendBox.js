import React from 'react';
import '../styles/HomePage.css';

const TrendBox = () => {
  // Placeholder data for trending topics
  const trendingTopics = [
    '#ReactJS',
    '#WebDevelopment',
    '#TwitterClone',
    '#CodingLife',
    '#TechNews',
  ];

  return (
    <div className="trendBox">
      <h2>Trending</h2>
      <ul className="trendingTopicsList">
        {trendingTopics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendBox;
