import React from 'react';

import '../assets/css/profile.css';

const Profile = () => {
  // Demo data
  const user = {
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

  return (
    <section className="h-100 gradient-custom-2 profile-section">
      <div className="container py-5 h-100">
        <div className="row d-flex">
          <div className="col col-lg-9 col-xl-8">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img
                    src="https://avatars.githubusercontent.com/u/113725438?v=4"
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: '150px', zIndex: 1 }}
                  />
                  <button type="button" className="btn btn-outline-dark text-body" style={{ zIndex: 1 }}>
                    Edit profile
                  </button>
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <h5>{user.name}</h5>
                  <p>{user.location}</p>
                </div>
              </div>
              <div className="p-4 text-black bg-body-tertiary">
                <div className="d-flex justify-content-end text-center py-1 text-body">
                  <div>
                    <p className="mb-1 h5">{user.posts}</p>
                    <p className="small text-muted mb-0">Posts</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 h5">{user.followers}</p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">{user.following}</p>
                    <p className="small text-muted mb-0">Following</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="mb-5 text-body">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4 bg-body-tertiary">
                    <p className="font-italic mb-1">{user.bio}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                  <p className="lead fw-normal mb-0">Recent posts</p>
                  <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
                </div>
                <div className="row g-2">
                  {user.recentPosts.slice(0, 2).map((photo, index) => (
                    <div className="col mb-2" key={index}>
                      <img src={photo} alt={`Recent photo ${index + 1}`} className="w-100 rounded-3" />
                    </div>
                  ))}
                </div>
                <div className="row g-2">
                  {user.recentPosts.slice(2).map((photo, index) => (
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