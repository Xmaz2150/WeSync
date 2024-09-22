import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileComponent = ({ user, recentPosts, imageUrl }) => {
  const navigate = useNavigate();

  const [shouldNavigateToFollowers, setShouldNavigateToFollowers] = useState(false);
  const [shouldNavigateToFollowing, setShouldNavigateToFollowing] = useState(false);

  const handleFollowersClick = () => {
    setShouldNavigateToFollowers(true);
  };

  const handleFollowingClick = () => {
    setShouldNavigateToFollowing(true);
  };

  useEffect(() => {
    if (shouldNavigateToFollowers) {
      navigate(`/followers/${user.id}`);
    }
  }, [shouldNavigateToFollowers, navigate, user.id]);

  useEffect(() => {
    if (shouldNavigateToFollowing) {
      navigate(`/following/${user.id}`);
    }
  }, [shouldNavigateToFollowing, navigate, user.id]);

  return (
    <section className="h-100 gradient-custom-2 profile-section">
      <div className="container py-5 h-100">
        <div className="row d-flex">
          <div className="col col-lg-9 col-xl-8">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  <img
                    src={imageUrl}
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
                    <p className="mb-1 h5">
                      <a href="#" onClick={handleFollowersClick} className="link-body-emphasis link-underline-opacity-0">
                        {user.followers.length}
                      </a>
                    </p>
                    <p className="small text-muted mb-0">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 h5">
                      <a href="#" onClick={handleFollowingClick} className="link-body-emphasis link-underline-opacity-0">
                        {user.following.length}
                      </a>
                    </p>
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
                  {recentPosts.slice(0, 2).map((photo, index) => (
                    <div className="col mb-2" key={index}>
                      <img src={photo} alt={`Recent photo ${index + 1}`} className="w-100 rounded-3" />
                    </div>
                  ))}
                </div>
                <div className="row g-2">
                  {recentPosts.slice(2).map((photo, index) => (
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
}

export default ProfileComponent;