import React from 'react';
import { useNavigate, Link } from 'react-router-dom'

import { likePost } from '../utils/api';
import { UserSection } from './UserSection';
import '../assets/css/custom-styles.css';

import { IMAGE_SERVER_URL } from '../utils/api';

const PostCard = ({ post }) => {
  
  const navigate = useNavigate();
  const handleCommentClick = (postId) => {
    navigate(`/newcomment/${postId}`);
  };

  const handleLikeClick = async (postId) => {
    try {
      const response = await likePost(postId);
      console.log(response.data);
    } catch (error) {
      console.log('Error fetching feed:', error);
    }
  };

  if (!post) {
    return <div>
      <h1>Loading...</h1>
      </div>;
  }
  return (
    <div key={post.id} className="inside-elements p-3 bg-body rounded shadow-sm">
      <UserSection user={post.user_data} time={post.created_at}/>
      <p className="mt-2 d-flex flex-column">
        {post.content}
        {post.image_url && <img className="w-75" src={`${IMAGE_SERVER_URL}/${post.image_url}`} alt="Post" />}
      </p>
      <div>
        <button className="btn btn-light btn-sm" onClick={() => handleLikeClick(post.id)}><i className="bi bi-heart"></i> { (post.likes && post.likes.length == 0) ? <>Like</> : <>Likes {post.likes && post.likes.length}</> } </button>
        <button className="btn btn-light btn-sm" onClick={() => handleCommentClick(post.id)}><i className="bi bi-chat"></i> Comment</button>
        <Link to={`/comments/${post.id}`}>
          <button className="btn btn-light btn-sm"><i className="bi bi-chat"></i> Comments</button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;