import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import '../assets/css/feed.css';
import '../assets/css/custom-styles.css';


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
    <div className="feed-content feed-container w-100">
      <main className="">
        <PostCard post={post} className="inside-elements p-3 bg-body rounded shadow-sm"/>
        <div >
          {comments.map((comment, index) => (
            <div key={index} className="d-flex flex-start mb-4">
              <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill="#007bff"/>
                <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
              </svg>
              <div className="card w-50">
                <div className="card-body p-4">
                  <div>
                  <div className="d-flex">
                    <div>
                      <strong className="d-block text-gray-dark">Anonymous</strong>
                      <span className="text-muted"><a onClick={() => null/*handleUserHandleClick(post.user_data.id)*/}>@handle</a> · 2h</span>
                    </div>
                  </div>

                  <p> {comment.content}</p>            
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <a href="#!" className="link-muted me-2">
                        <i className="fas fa-thumbs-up me-1"></i>132
                      </a>
                      <a href="#!" className="link-muted">
                        <i className="fas fa-thumbs-down me-1"></i>15
                      </a>
                    </div>
                    <a href="#!" className="link-muted">
                      <i className="fas fa-reply me-1"></i> Reply
                    </a>
                  </div>
                  </div>
                </div>
              </div>
          </div>
          
          ))}
        </div>
      </main>
    </div>
  );
};

export default CommentsPage;