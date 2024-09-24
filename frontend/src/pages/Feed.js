import React, { useEffect, useState} from 'react';

import PostCard from '../components/PostCard';
import { allFeeds } from '../utils/api';

import '../assets/css/feed.css';


const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await allFeeds();
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching feed:', error);
      }
    };

    fetchFeed();
  }, []);

  if (!posts) {
    return <div>
      <h1>Loading...</h1>
      </div>;
  }

  return (
    <div className="feed-container">
      <header className="feed-header">
        <h1>Feed</h1>
      </header>
      <main className="feed-content">
        {posts.map((post, index) => (
          <PostCard key={index} post={post}/>
        ))}
      </main>
    </div>
  );
};

export default Feed;