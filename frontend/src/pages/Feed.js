const Feed = () => {
  const posts = [
    { id: 1, user: 'User1', content: 'This is a post by User1' },
    { id: 2, user: 'User2', content: 'This is a post by User2' },
    // Add more posts here
  ];

  return (
    <div className="feed">
      <header className="feed-header">
        <h1>Feed</h1>
      </header>
      <main>
        {posts.map(post => (
          <div key={post.id} className="post">
            <h3>{post.user}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Feed;