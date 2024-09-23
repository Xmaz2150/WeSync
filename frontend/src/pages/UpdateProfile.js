import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { updateProfileWithPic, updateProfile } from '../utils/api';

const UpdateProfile = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  }

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*const formData = new FormData();
      formData.append('file', file);

      const response = await updateProfilePicture(formData);

      console.log(response.data);
      navigate('/profile');*/

      let response;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);
        formData.append('bio', bio);
        formData.append('city', city);

        response = await updateProfileWithPic(formData);
      } else {
        const data = {
          username: username,
          bio: bio,
          city: city
        };

        response = await updateProfile(data);
      }
      console.log(response.data);
      localStorage.setItem('image_url', response.data.new_data.image_url);
      navigate('/profile');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <input className="form-control" type="text" name="username" onChange={handleUsernameChange} placeholder="New Username"/>
        </div>
        <div className="mb-3">
          <input className="form-control" type="text" name="city" onChange={handleCityChange} placeholder="City"/>
        </div>
        <textarea className="form-control" rows="3" name="bio" value={bio} onChange={handleBioChange} placeholder="About Yourself" />
        <div className="mb-3">
          <input className="form-control" type="file" name="file" onChange={handleFileChange}/>
        </div>
        <input className="btn btn-primary" type="submit" value="Post" />
      </form>
    </div>
  );
};

export default UpdateProfile;