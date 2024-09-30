import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import { socket } from './socket';

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

  const [fooEvents, setFooEvents] = React.useState([]);

  React.useEffect(() => {
    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('foo', onFooEvent);

    return () => {
      socket.off('foo', onFooEvent);
    };
  }, []);

  return (
    <div className="app-container d-flex general-style">
      { token && <Sidebar token={token} setToken={setToken} imageUrl={imageUrl} setImageUrl={setImageUrl} socket={socket}/> }
      <Routes>
        <Route path="/signin" element={<SignIn setToken={setToken} setImageUrl={setImageUrl} socket={socket}/>} />
        <Route path="/signup" element={<SignUp setToken={setToken}/>} />

        <Route path="/" element={<PrivateRoute><Home events={fooEvents}/></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile imageUrl={imageUrl} socket={socket}/></PrivateRoute>} />
        <Route path="/user/:userId" element={<PrivateRoute><UserProfile socket={socket}/></PrivateRoute>} />

        <Route path="/feed" element={<PrivateRoute><Feed socket={socket}/></PrivateRoute>} />
        <Route path="/newpost" element={<PrivateRoute><NewPost socket={socket}/></PrivateRoute>} />
        <Route path="/newcomment/:postId" element={<PrivateRoute><NewComment socket={socket}/></PrivateRoute>} />
        <Route path="/comments/:postId" element={<PrivateRoute><CommentsPage socket={socket}/></PrivateRoute>} />

        <Route path="/followers/:userId" element={<PrivateRoute><Followers socket={socket}/></PrivateRoute>} />
        <Route path="/following/:userId" element={<PrivateRoute><Following socket={socket}/></PrivateRoute>} />

        <Route path="/searchUsers/" element={<PrivateRoute><SearchUsers socket={socket}/></PrivateRoute>} />
        <Route path="/updateProfile/" element={<PrivateRoute><UpdateProfile socket={socket}/></PrivateRoute>} />

        <Route path="*" element={<PrivateRoute><NotFound statusCode={404} message={'Page not found!'}/></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;