import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import Feed from "./pages/Feed";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NewPost from "./pages/NewPost";
import NewComment from "./pages/NewComment";
import CommentsPage from "./pages/Comments";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import SearchUsers from "./pages/SearchUsers";
import UpdateProfile from "./pages/UpdateProfile";

import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from "./components/errors/NotFound";

import Sidebar from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoute";
import '../src/assets/css/custom-styles.css';


function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [imageUrl, setImageUrl] = React.useState(localStorage.getItem('imageUrl'));

  return (
    <div className="app-container d-flex general-style">
      { token && <Sidebar token={token} setToken={setToken} imageUrl={imageUrl} setImageUrl={setImageUrl}/> }
      <Routes>
        <Route path="/signin" element={<SignIn setToken={setToken} setImageUrl={setImageUrl}/>} />
        <Route path="/signup" element={<SignUp setToken={setToken}/>} />

        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile imageUrl={imageUrl}/></PrivateRoute>} />
        <Route path="/user/:userId" element={<PrivateRoute><UserProfile /></PrivateRoute>} />

        <Route path="/feed" element={<PrivateRoute><Feed /></PrivateRoute>} />
        <Route path="/newpost" element={<PrivateRoute><NewPost /></PrivateRoute>} />
        <Route path="/newcomment/:postId" element={<PrivateRoute><NewComment /></PrivateRoute>} />
        <Route path="/comments/:postId" element={<PrivateRoute><CommentsPage /></PrivateRoute>} />

        <Route path="/followers/:userId" element={<PrivateRoute><Followers /></PrivateRoute>} />
        <Route path="/following/:userId" element={<PrivateRoute><Following /></PrivateRoute>} />\

        <Route path="/searchUsers/" element={<PrivateRoute><SearchUsers /></PrivateRoute>} />
        <Route path="/updateProfile/" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />

        <Route path="*" element={<PrivateRoute><NotFound statusCode={404} message={'Page not found!'}/></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;