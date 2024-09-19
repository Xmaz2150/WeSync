import React from 'react';

const SignIn = () => {
  return (
    <div className="sign-in">
      <header className="sign-in-header">
        <h1>Sign In</h1>
      </header>
      <main>
        <form className="sign-in-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Sign In</button>
        </form>
      </main>
    </div>
  );
};

export default SignIn;