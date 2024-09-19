import React from 'react';

const Profile = () => {
  return (
    <div className="profile">
      <header className="profile-header">
        <h1>User Profile</h1>
      </header>
      <main>
        <section className="profile-details">
          <h2>About Me</h2>
          <p>This is the user's bio.</p>
        </section>
        <section className="profile-posts">
          <h2>My Posts</h2>
          {/* Render user's posts here */}
        </section>
      </main>
    </div>
  );
};

export default Profile;