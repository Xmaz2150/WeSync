import React from 'react';
import { useNavigate } from 'react-router-dom';



const UserSection = ({ user }) => {
  const navigate = useNavigate();

  const handleUserHandleClick = (postId) => {
    navigate(`/user/${postId}`);
  };
  return (
    <div className="d-flex">
        <svg className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#007bff"/>
          <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
        </svg>
        <div>
          <strong className="d-block text-gray-dark">{user.username}</strong>
          <span className="text-muted"><a onClick={() => handleUserHandleClick(user.id)}>@handle</a></span>
        </div>
      </div>
  );
};

export default UserSection;