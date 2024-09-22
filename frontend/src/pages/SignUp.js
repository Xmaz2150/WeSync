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
      
      console.log(response.data);
      window.location.href = '/profile';
    } catch (error) {
      console.log('Failed to sign up:', error);
      setError(error.response ? error.response.data.message : 'An error occurred. Please try again later.');
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