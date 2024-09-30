import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { postAndAllComments } from '../utils/api';

import { CommentPic, CommentUserSection } from '../components/UserSection';

import '../assets/css/feed.css';
import '../assets/css/custom-styles.css';

const CommentsPage = ({ socket }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {

        const response = await postAndAllComments(postId);
        setPost(response.data.post_data);
        setComments(response.data.comments);
        console.log('commentdata', response.data.comments)
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
        <PostCard post={post} />
        <div >
          {comments.map((comment, index) => (
            console.log(comment.post_data),
            <div key={index} className="d-flex flex-start mb-4">
              <CommentPic user={comment.user_data} />
              <div className="card w-50">
                <div className="card-body p-4">
                  <div>
                  <div className="d-flex">
                    <CommentUserSection user={comment.user_data} time={comment.created_at} />
                  </div>

                  <p> {comment.content}</p>            
                  
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