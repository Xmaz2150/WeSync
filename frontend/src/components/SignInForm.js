import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../assets/css/sign-in.css';
import '../assets/css/custom-styles.css';


const SignInForm = ({ email, setEmail, password, setPassword, handleSubmit, error }) => {
    return (
      <main className="form-signin position-absolute top-50 start-50 translate-middle">
        <form onSubmit={handleSubmit}>
          <Logo width={130}/>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          {error && <p className="text-danger mt-3">{error}</p>}
          <p className="mt-3">Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p className="mt-5 mb-3 text-body-secondary">&copy; 2024-</p>
        </form>
      </main>
    );
  };

export default SignInForm;