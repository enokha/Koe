import React from 'react';

const UserPosts = ({ userPosts }) => {
  return (
    <div className="user-posts">
      {userPosts.map(post => (
        <div key={post.id} className="post">
          <div className="post__header">
            <h3>{post.username}</h3>
            {/* Add other post header details based on your data structure */}
          </div>
          <div className="post__body">
            <p>{post.content}</p>
            {/* Add other post body details based on your data structure */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
