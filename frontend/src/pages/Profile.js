import React, { useEffect, useState } from 'react';
import { getProfile } from '../utils/api';
import ProfileComponent from '../components/ProfileComponent';
import '../assets/css/profile.css';

const IMAGE_SERVER = 'http://localhost:5000';

const Profile = (imageUrl) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getProfile(token);
        setUser(response.data);
      } catch (error) {
        setError('An error occurred while fetching the profile');
        console.log('Error fetching profile:', error)
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }
  return <ProfileComponent user={user} imageUrl={imageUrl.imageUrl} />;
};

export default Profile;