import React, { useState } from 'react';
import { login } from '../utils/api';
import SignInForm from '../components/SignInForm';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await login({ email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      console.log('Signed in successfully:', response);
      // redirect to profile
      window.location.href = '/profile';
    } catch (error) {
      console.log('Failed to sign in:', error);
      setError('Failed to sign in. Please check your credentials and try again.');
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