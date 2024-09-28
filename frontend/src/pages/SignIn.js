import React, { useState } from 'react';
import { login } from '../utils/api';
import SignInForm from '../components/SignInForm';

import { IMAGE_SERVER_URL } from '../utils/api';

const Login = ({ setToken, setImageUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      const { access_token, image_url } = response.data;
      localStorage.setItem('token', access_token);
      const imageUrl = `${IMAGE_SERVER_URL}${image_url}`;
      localStorage.setItem('imageUrl', imageUrl);
      setToken(access_token);
      setImageUrl(imageUrl);
      console.log('Signed in successfully:', response);
      console.log(imageUrl);
      // redirect to profile
      window.location.href = '/profile';
    } catch (error) {
      console.log('Failed to sign in:', error);
      setError(error.response ? error.response.data.message : 'An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <SignInForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        error={error}
      />
    </div>
  );
};

export default Login;