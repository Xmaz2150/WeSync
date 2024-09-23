import React, { useState } from 'react';
import UserSection from '../components/UserSection';
import { followUser, unfollowUser, queryUsers } from '../utils/api';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await queryUsers(query);
      setResults(response.data);
    } catch (error) {
      setError('Please input a valid username');
      console.log('Error searching users:', error);
    }
  };

  const handleFollow = async (userId) => {
    try { 
      await followUser(userId);
    } catch (error) {
      console.log('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId);
    } catch (error) {
      console.log('Error unfollowing user:', error);
    }
  };
  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <h1>Search Users</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for users"
          className="form-control"
        />
        <button type="submit" className="btn btn-primary mt-2">Search</button>
      </form>
      {error && <div>{error}</div>}
      {results.map(user => (
        <div>
          <UserSection user={user} />
          <button onClick={() => handleFollow(user.id)} className="btn btn-success">Follow</button>
          <button onClick={() => handleUnfollow(user.id)} className="btn btn-danger">Unfollow</button>
        </div>
      ))}
    </div>
  );
};

export default SearchUsers;