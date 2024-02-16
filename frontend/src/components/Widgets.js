import React from 'react';
import "../styles/HomePage.css";

const Widgets = () => {
  return (
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

      {/* Placeholder for other widgets */}
      {[1, 2, 3].map(widgetId => (
        <div key={widgetId} className="tweetBox">
          {/* Placeholder for other widgets */}
        </div>
      ))}
    </div>
  );
};

export default Widgets;
