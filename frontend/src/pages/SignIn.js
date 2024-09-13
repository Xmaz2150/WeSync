import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/SignIn.css'; // Optional: for styling

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Example validation
        if (email === '' || password === '') {
            setError('Please fill in both fields.');
            return;
        }

        // Mock authentication (Replace with actual API call)
        if (email === 'user@example.com' && password === 'password') {
            history.push('/'); // Redirect to home on successful sign-in
        } else {
            setError('Invalid email or password.');
        }
    };

    return (
        <div className="signin">
            <header className="signin-header">
                <h1>Sign In</h1>
            </header>
            <main>
                <form onSubmit={handleSubmit} className="signin-form">
                    {error && <p className="error-message">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="signin-button">Sign In</button>
                </form>
            </main>
        </div>
    );
};

export default SignIn;