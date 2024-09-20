import React, { useState } from 'react';
import { register } from '../utils/api';
import SignUpForm from '../components/SignUpForm';

const SignUp = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await register({ username, email, password });
      /*const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      console.log('Signed in successfully:', response);
      // redirect to profile*/
      window.location.href = '/profile';
    } catch (error) {
      console.log('Failed to sign up:', error);
      setError('Failed to sign up. Please check your credentials and try again.');
    }
  };

  return (
    <div>
      <SignUpForm
        username={username}
        setUsername={setUsername}
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

export default SignUp;