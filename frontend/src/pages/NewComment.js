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
    <div>
      <h1>Add a Comment</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="content" value={content} onChange={handleContentChange} placeholder="Your comment" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewComment;