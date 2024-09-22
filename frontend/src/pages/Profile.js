import React, { useEffect, useState } from 'react';
import { getProfile } from '../utils/api';

import '../assets/css/profile.css';

const IMAGE_SERVER = 'http://localhost:5000';

const Profile = (imageUrl) => {

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await getProfile(token);
        setUser(response.data);
      } catch (error) {
        setError('An error occurred while fetching the profile');
        console.log('Error fetching profile:', error)
      }
    };

    fetchProfile();
  }, []);
  // Demo data
  const user1 = {
    name: 'Xmaxz2150',
    location: 'Sandton',
    bio: 'Backend and Web(little) Developer',
    posts: 253,
    followers: 1026,
    following: 478,
    recentPosts: [
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp',
      'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp',
    ],
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);
  return (
    <section className="h-100 gradient-custom-2 profile-section">
      <div className="container py-5 h-100">
        <div className="row d-flex">
          <div className="col col-lg-9 col-xl-8">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img
                    src={imageUrl.imageUrl}
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: '150px', zIndex: 1 }}
                  />
                  <button type="button" className="btn btn-outline-dark text-body" style={{ zIndex: 1 }}>
                    Edit profile
                  </button>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5>{user.username}</h5>
                  <p>The Bay</p>
                </div>
              </div>
              <div className="p-4 text-black bg-body-tertiary">
                <div className="d-flex justify-content-end text-center py-1 text-body">
                  <div>
                    <p className="mb-1 h5">{user.posts.length}</p>
                    <p className="small text-muted mb-0">Posts</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">{user.followers.length}</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">{user.following.length}</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5 text-body">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4 bg-body-tertiary">
                    <p className="font-italic mb-1">{user.bio}Hello I'm using WeSync!</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                  <p className="lead fw-normal mb-0">Recent posts</p>
                </div>
                <div className="row g-2">
                  {user1.recentPosts.slice(0, 2).map((photo, index) => (
                    <div className="col mb-2" key={index}>
                      <img src={photo} alt={`Recent photo ${index + 1}`} className="w-100 rounded-3" />
                    </div>
                  ))}
                </div>
                <div className="row g-2">
                  {user1.recentPosts.slice(2).map((photo, index) => (
                    <div className="col" key={index}>
                      <img src={photo} alt={`Recent photo ${index + 3}`} className="w-100 rounded-3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;