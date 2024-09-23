import React, { useState } from 'react';
import UserSection from '../components/UserSection';

import axios from 'axios';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/social/users/search?query=${query}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setResults(response.data);
    } catch (error) {
      setError('Please input a valid username');
      console.log('Error searching users:', error);
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
        <UserSection user={user} />
      ))}
    </div>
  );
};

export default SearchUsers;