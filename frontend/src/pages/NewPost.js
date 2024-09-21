import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NewPost = () => {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('content', content);

        response = await axios.post('http://localhost:5000/social/posts', formData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        const data = {
          content: content
        };

        response = await axios.post('http://localhost:5000/social/posts', data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
      }
      console.log(response.data);
      navigate('/feed');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Upload new File</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" onChange={handleFileChange} />
        <input type="text" name="content" value={content} onChange={handleContentChange} placeholder="Your post content" />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default NewPost;