import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../components/errors/NotFound';
import UserSection from '../components/UserSection';

import axios from 'axios';

const Following = () => {
  const { userId } = useParams();
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/social/users/following/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFollowing(response.data);
      } catch (error) {
        setError(error.response);
      }
    };

    fetchFollowing();
  }, [userId]);

  if (error) {
    console.log('Error:', error);
    return <NotFound statusCode={error.status} message={error.data.message}/>;
  }

  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>Following</h1>
      {following.map(following => (
        <UserSection user={following} />
      ))}
    </div>
  );
};

export default Following;