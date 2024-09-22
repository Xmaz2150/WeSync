import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import '../assets/css/feed.css';


import axios from 'axios';

const CommentsPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {

        const response = await axios.get(`http://localhost:5000/social/posts/comments/${postId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
        setPost(response.data.post_data);
        setComments(response.data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PostCard post={post} className="feed-content"/>
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;