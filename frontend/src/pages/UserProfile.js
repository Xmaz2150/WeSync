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
  // Demo data
  const user1 = {
    name: 'Xmaxz2150',
    location: 'Sandton',
    bio: 'Backend and Web(little) Developer',
    posts: 253,
    followers: 1026,
    following: 478,
    recentPosts: [
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp',
    ],
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return <ProfileComponent user={user} imageUrl={`${IMAGE_SERVER}/${user.image_url}`} recentPosts={user1.recentPosts} />;
};

export default UserProfile;