import React, { useEffect, useState} from 'react';

import PostCard from '../components/PostCard';
import { allFeeds } from '../utils/api';

import '../assets/css/feed.css';


const Feed = ({ socket }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await allFeeds();
        setPosts(response.data.reverse());
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching feed:', error);
      }
    };

    fetchFeed();

    const handleNewPost = (post) => {
      console.log('new post', post);
      setPosts((prevPosts) => [post, ...prevPosts]);
    };

    const handleLikeUpdate = (likeData) => {
      console.log('liked post', likeData);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === likeData.post_id ? { ...post, likes: likeData.likes } : post
        )
      );
    };

    socket.on('new_post', handleNewPost);
    socket.on('liked_post', handleLikeUpdate);

    return () => {
      socket.off('new_post', handleNewPost);
      socket.off('liked_post', handleLikeUpdate);
    };
  }, [socket]);

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