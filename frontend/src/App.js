import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  return (
    <>
      <nav>
        <ul>
          { token ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/feed">Feed</Link></li>
            <li><button onClick={() => {
              localStorage.removeItem('token');
              setToken(null);
              window.location.href = '/signin';
            }}>Sign Out</button></li>
          </>
          ) : (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>

          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn setToken={setToken}/>} />
        <Route path="/signup" element={<SignUp setToken={setToken}/>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;