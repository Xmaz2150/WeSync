import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserSection from '../components/UserSection';
import NotFound from '../components/errors/NotFound';

import { removeFollower, allFollowers } from '../utils/api';

const Followers = () => {
  const { userId } = useParams();
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await allFollowers(userId);
        setFollowers(response.data);
      } catch (error) {
        setError(error.response);
      }
    };

    fetchFollowers();
  }, [userId]);

  const handleRemoveFollower = async (followerId) => {
    try {
      await removeFollower(followerId);
      setFollowers(followers.filter(follower => follower.id !== followerId));
    } catch (error) {
      console.log('Error removing follower:', error);
    }
  };
 
  if (error) {
    console.log('Error:', error);
    return <NotFound statusCode={error.status} message={error.data.message}/>;
  }
  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>Followers</h1>
      {followers.map(follower => (
        <div>
          <UserSection user={follower} />
          <button onClick={() => handleRemoveFollower(follower.id)} className="btn btn-danger">Remove Follower</button>
        </div>
      ))}
    </div>
  );
};

export default Followers;