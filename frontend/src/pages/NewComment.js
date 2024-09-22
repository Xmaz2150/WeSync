import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const NewComment = () => {
  const { postId } = useParams();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      content: content
    };

    try {
      const response = await axios.post(`http://localhost:5000/social/posts/comment/${postId}`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      navigate('/feed');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>Add a Comment</h1>
      
      <form onSubmit={handleSubmit}>
        <textarea className="form-control" rows="3" name="content" value={content} onChange={handleContentChange} placeholder="Your comment" />
        <input className="btn btn-primary" type="submit" value="Comment" />
      </form>
    </div>
  );
};


export default NewComment;