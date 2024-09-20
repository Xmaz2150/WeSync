import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Sidebar
 from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  return (
    <div className="app-container d-flex">
      { token && <Sidebar token={token} setToken={setToken} /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn setToken={setToken}/>} />
        <Route path="/signup" element={<SignUp setToken={setToken}/>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;