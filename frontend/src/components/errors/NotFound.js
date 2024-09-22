import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/notfound.css';

const NotFound = ({ statusCode, message }) => {
  return (
    <div className="notfound-container position-absolute top-50 start-50 translate-middle">
      <h1>{statusCode}</h1>
      <p>Oops! {message}</p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
};

export default NotFound;