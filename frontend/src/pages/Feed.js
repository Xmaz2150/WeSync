import React from 'react'; 
import '../assets/css/feed.css';

const Feed = () => {
  const posts = [
    { id: 1, user: 'User1', content: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 2, user: 'User2', content: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    { id: 3, user: 'User3', content: 'Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
    // Add more posts here
  ];

  return (
    <div className="feed-container">
      <header className="feed-header">
        <h1>Feed</h1>
      </header>
      <main className="feed-content">
        {posts.map(post => (
          <div key={post.id} className="inside-elements p-3 bg-body rounded shadow-sm">
            <div className="d-flex">
              <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff"/>
                <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
              </svg>
              <div>
                <strong className="d-block text-gray-dark">@{post.user}</strong>
                <span className="text-muted">@handle · 2h</span>
              </div>
            </div>
            <p className="mt-2">
              {post.content}
            </p>
            <img src="post-image.jpg" alt="Post Image" className="img-fluid rounded mt-2"/>
            <div>
              <button className="btn btn-light btn-sm"><i className="bi bi-heart"></i> Like</button>
              <button className="btn btn-light btn-sm"><i className="bi bi-chat"></i> Comment</button>
              <button className="btn btn-light btn-sm"><i className="bi bi-share"></i> Share</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Feed;