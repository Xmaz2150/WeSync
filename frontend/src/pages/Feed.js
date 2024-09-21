import React, { useEffect, useState} from 'react'; 
import { useNavigate, Link } from 'react-router-dom'
import '../assets/css/feed.css';

import axios from 'axios';


const Feed = () => {
  const [posts, setPosts] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await axios.get('http://localhost:5000/social/feed', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchFeed();
  }, []);

  const handleCommentClick = (postId) => {
    navigate(`/newcomment/${postId}`);
  };
  return (
    <div className="feed-container">
      <header className="feed-header">
        <h1>Feed</h1>
      </header>
      <main className="feed-content">
        {posts.map(post => (
          <div key={post.id} className="inside-elements p-3 bg-body rounded shadow-sm">
            <div className="d-flex">
              <img src={post.user_data.image_url} alt={post.user_data.username} />
              <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff"/>
                <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
              </svg>
              <div>
                <strong className="d-block text-gray-dark">{post.user_data.username}</strong>
                <span className="text-muted">@handle · 2h</span>
              </div>
            </div>
            <p className="mt-2 d-flex flex-column">
              {post.content}
              {post.image_url && <img className="w-75" src={'http://localhost:5000/'+post.image_url} alt="Post" />}
            </p>
            <div>
              <button className="btn btn-light btn-sm"><i className="bi bi-heart"></i> Like</button>
              <button className="btn btn-light btn-sm" onClick={() => handleCommentClick(post.id)}><i className="bi bi-chat"></i> Comment</button>
              <Link to={`/comments/${post.id}`}>
                <button className="btn btn-light btn-sm"><i className="bi bi-chat"></i> Comments</button>
              </Link>
              <button className="btn btn-light btn-sm"><i className="bi bi-share"></i> Share</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Feed;