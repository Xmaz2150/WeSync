import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/main.css'; // Importing global styles

// Rendering the App component wrapped in Router for routing functionality
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);