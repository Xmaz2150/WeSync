import React from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  
  const navigate = useNavigate();
  const handleCommentClick = (postId) => {
    navigate(`/newcomment/${postId}`);
  };
  return (
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
        <button className="btn btn-light btn-sm"><i className="bi bi-share"></i> Share</button>
        </div>
    </div>
  );
};

export default PostCard;