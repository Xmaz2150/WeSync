import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="inside-elements p-3 bg-body rounded shadow-sm">
      <header className="home-header">
        <h1>Welcome to WeSync</h1>
        <p>Connect with friends and the world around you.</p>
      </header>
      <main>
        <section className="home-actions">
          <Link to="/signin" className="btn">Sign In</Link>
          <Link to="/feed" className="btn">View Feed</Link>
        </section>
      </main>
    </div>
  );
};

export default Home;