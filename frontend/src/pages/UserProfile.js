import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../utils/api';
import ProfileComponent from '../components/ProfileComponent';

import '../assets/css/profile.css';

const IMAGE_SERVER = 'http://localhost:5000';

const UserProfile = () => {

  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getUserProfile(token, userId);
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

  return <ProfileComponent user={user} imageUrl={`${IMAGE_SERVER}/${user.image_url}`} />;
};

export default UserProfile;