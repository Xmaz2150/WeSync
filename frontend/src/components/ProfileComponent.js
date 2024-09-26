import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/css/feed.css';
import '../assets/css/custom-styles.css';
import { IMAGE_SERVER_URL } from '../utils/api';

const DEFAULT_POST_IMAGE = `${IMAGE_SERVER_URL}/wesync/img/text_place_holder1.jpg`;

const ProfileComponent = ({ user, imageUrl, isUser}) => {
  const navigate = useNavigate();

  const [shouldNavigateToFollowers, setShouldNavigateToFollowers] = useState(false);
  const [shouldNavigateToFollowing, setShouldNavigateToFollowing] = useState(false);

  const handleFollowersClick = () => {
    setShouldNavigateToFollowers(true);
  };

  const handleFollowingClick = () => {
    setShouldNavigateToFollowing(true);
  };

  const handlePostClick = (postId) => {
    navigate(`/comments/${postId}`);
  };
  const handleUpdateClick = () => {
    navigate(`/updateProfile`);
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

  console.log(user);

  // Demo data
  const recentPosts = [
    'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp',
    'https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp',
  ];
  return (
    <section className="h-100 inside-elements feed-content">
      <div className="row d-flex w-100">
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
                {
                  (isUser) &&
                  <button type="button" className="btn btn-outline-dark text-body" style={{ zIndex: 1 }} onClick={() => handleUpdateClick()}>
                    Edit profile
                  </button>
                }
              </div>
              <div className="ms-3" style={{ marginTop: '130px' }}>
                <h5>{user.username}</h5>
                {
                    (user.city)
                    ? <p>{user.city}</p>
                    : <p>The Bay</p>
                }
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
                <div className="p-4 bg-body-tertiary">
                  <p className="font-italic mb-1">
                    {
                      (user.bio)
                      ? <p>{user.bio}</p>
                      : <p>Hello I'm using WeSync!</p>
                    }
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                <p className="lead fw-normal mb-0">Recent posts</p>
              </div>
              <div className="my-posts-container">
                <div className="row g-2">
                  {user.posts.map((post, index) => (
                    <div className="col mb-2" key={index}>
                      {
                        (post.image_url)
                        ? <img src={`${IMAGE_SERVER_URL}/${post.image_url}`} alt={`Recent post ${index + 1}`} className="rounded-3 w-50" onClick={() => handlePostClick(post.id)}/>
                        : <img src={`${DEFAULT_POST_IMAGE}`} alt={`Recent post ${index + 1}`} className="rounded-3 w-50" onClick={() => handlePostClick(post.id)}/>
                      }
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