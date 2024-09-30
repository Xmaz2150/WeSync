import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addNewPost, addNewPostWithPicture } from '../utils/api';

const NewPost = ({ socket }) => {
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

        response = await addNewPostWithPicture(formData);
      } else {
        const data = {
          content: content
        };

        response = await addNewPost(data);
      }
      console.log(response.data);
      navigate('/feed');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>New Post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea className="form-control" rows="3" name="content" value={content} onChange={handleContentChange} placeholder="Thoughts ..." />
        <div className="mb-3">
          <input className="form-control" type="file" name="file" onChange={handleFileChange}/>
        </div>
        <input className="btn btn-primary" type="submit" value="Post" />
      </form>
    </div>
  );
};

export default NewPost;