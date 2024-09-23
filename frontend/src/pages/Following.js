import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../components/errors/NotFound';
import UserSection from '../components/UserSection';

import { followingUsers, unfollowUser } from '../utils/api';

const Following = () => {
  const { userId } = useParams();
  const [following, setFollowing] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await followingUsers(userId);
        setFollowing(response.data);
      } catch (error) {
        setError(error.response);
      }
    };

    fetchFollowing();
  }, [userId]);

  const handleUnfollow = async (followingId) => {
    try {
      await unfollowUser(followingId);
      setFollowing(following.filter(user => user.id !== followingId));
    } catch (error) {
      console.log('Error unfollowing user:', error);
    }
  };

  if (error) {
    console.log('Error:', error);
    return <NotFound statusCode={error.status} message={error.data.message}/>;
  }

  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>Following</h1>
      {following.map((following, index) => (
        <div key={index}>
          <UserSection user={following} />
          <button onClick={() => handleUnfollow(following.id)} className="btn btn-danger">Unfollow</button>
        </div>
      ))}
    </div>
  );
};

export default Following;