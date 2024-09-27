import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IMAGE_SERVER_URL } from '../utils/api';

const timeHelper = (time) => {
  let newTime = new Date(time);
  let latestTime = new Date();

  let elapsedTime = latestTime - newTime;
  let seconds = Math.floor(elapsedTime / 1000) - 7200;
  if (seconds < 60) return `${seconds}s`;

  let minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  let hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  let days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;

};

export const UserSection = ({ user, time }) => {
  const navigate = useNavigate();

  const handleUserHandleClick = (postId) => {
    navigate(`/user/${postId}`);
  };

  return (
    <div className="d-flex">
      <img 
        src={`${IMAGE_SERVER_URL}/${user.image_url}`} 
        width="32" 
        height="32" 
        className="bd-placeholder-img flex-shrink-0 me-2 rounded" 
      />
      <div>
        <strong className="d-block text-gray-dark">{user.username}</strong>
        <span className="text-muted"><a onClick={() => handleUserHandleClick(user.id)}>@{user.username} {time && <>· {timeHelper(time)}</>}</a></span>
      </div>
    </div>
  );
};

export const CommentUserSection = ({ user, time }) => {
  const navigate = useNavigate();

  const handleUserHandleClick = (postId) => {
    navigate(`/user/${postId}`);
  };

  return (
    <div>
      <strong className="d-block text-gray-dark">{user.username}</strong>
      <span className="text-muted"><a onClick={() => handleUserHandleClick(user.id)}>@{user.username} {time && <>· {timeHelper(time)}</>}</a></span>
    </div>
  );
}

export const CommentPic = ({ user }) => {
  return (
    <img 
      src={`${IMAGE_SERVER_URL}/${user.image_url}`} 
      width="32" 
      height="32" 
      className="bd-placeholder-img flex-shrink-0 me-2 rounded" 
      />
  );
}