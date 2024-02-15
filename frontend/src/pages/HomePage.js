import React from 'react';
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homePage">
      {/* Sidebar */}
      <div className="sidebar">
        <i className="icon-twitter"> K</i>
        {/* Sidebar Options */}
        {/* Repeat this structure for other sidebar options */}
        <div className="sidebarOption active">
          <span className="material-symbols-outlined"> home </span>
          <h2>Home</h2>
        </div>
        {/* ... (Other sidebar options) */}
        <button className="sidebar__tweet">Tweet</button>
      </div>

      {/* Feed */}
      <div className="feed">
        <div className="feed__header">
          <h2>Home</h2>
        </div>

        {/* Textbox */}
        <div className="tweetBox">
          <form>
            <div className="tweetbox__input">
              <img src="" alt="User Avatar" />
              <input type="text" placeholder="Say Something!" />
            </div>
            <button className="tweetBox__tweetButton">Tweet</button>
          </form>
        </div>

        {/* Post */}
        {/* Repeat this structure for other posts */}
        <div className="post">
          <div className="post_avatar">
            {/* Post Body */}
            <div className="post__body">
              <div className="post__header">
                {/* Post Header */}
                <div className="post__headerText">
                  <h3>
                    Nature
                    <span className="post_headerSpecial">
                      <span className="post__bandge"></span>@TheEarthsNature
                    </span>
                  </h3>
                </div>
                <div className="post_headDescription">
                  <p>Let go man!</p>
                </div>
              </div>
              <img src="" alt="" />
            </div>
            {/* Post Footer */}
            <div className="post__footer">
              <span className="material-symbols-outlined"> repeat </span>
              <span className="material-symbols-outlined"> favorite </span>
              <span className="material-symbols-outlined"> publish </span>
            </div>
          </div>
        </div>
        {/* ... (Other posts) */}
      </div>

      {/* Widgets */}
      <div className="widgets">
        <div className="widgets__input">
          <span className="widgets__searchIcon"> </span>
          <input type="text" placeholder="Search Twitter" />
        </div>

        <div className="widgets__widgetContainer">
          <h2>Who to follow</h2>
        </div>
        {/* Repeat this structure for other widgets */}
        <div className="tweetBox">
          <form>
            <div className="tweetbox__input">
              <img alt="" src="" />
              {/* Placeholder for the famous account post */}
              <div className="post">
                <div className="post_avatar">
                  <div className="post__body">
                    <div className="post__header">
                      <div className="post__headerText">
                        <h3>
                          Nature
                          <span className="post_headerSpecial">
                            <span className="post__bandge"></span>@TheEarthsNature
                          </span>
                        </h3>
                      </div>
                      <div className="post_headDescription">
                        <p>Let go man!</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* ... (Other widgets) */}
      </div>
    </div>
  );
};

export default HomePage;
