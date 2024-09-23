import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserSection from '../components/UserSection';

import NotFound from '../components/errors/NotFound';

import axios from 'axios';

const Followers = () => {
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/social/users/followers/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFollowers(response.data);
      } catch (error) {
        setError(error.response);
      }
    };

    fetchFollowers();
  }, [userId]);

  if (error) {
    console.log('Error:', error);
    return <NotFound statusCode={error.status} message={error.data.message}/>;
  }

  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>Followers</h1>
      {followers.map(follower => (
        <UserSection user={follower} />
      ))}
    </div>
  );
};

export default Followers;