import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost';
console.log(BASE_URL);

export const IMAGE_SERVER_URL = `${BASE_URL}:5000`;
const API_BASE_URL = `${BASE_URL}:5000/wesync`;
const API_P_BASE_URL = `${BASE_URL}:5000/social/users`;
const API_C_BASE_URL = `${BASE_URL}:5000/social`;

const getJwt = () => {
  return localStorage.getItem('token');;
}

/**
 * FORMS
 */
export const login = (userData) => {
  return axios.post(`${API_BASE_URL}/login`, userData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export const register = (userData) => {
  return axios.post(`${API_BASE_URL}/register`, userData, {
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

/**
 * PROFILES
 */
export const getProfile = (token) => {
  return axios.get(`${API_BASE_URL}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
};

export const getUserProfile = (token, userId) => {
  return axios.get(`${API_BASE_URL}/user/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
};

export const updateProfileWithPic = (formData) => {
  return axios.post(`${API_BASE_URL}/profile/update`, formData, {
  headers: {
    'Authorization': `Bearer ${getJwt()}`,
    'Content-Type': 'multipart/form-data'
  }
  });
};

export const updateProfile = (data) => {
  return axios.post(`${API_BASE_URL}/profile/update`, data, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  });
};

/**
 * FOLLOWS
 */

export const followUser = (userId) => {
  return axios.post(`${API_P_BASE_URL}/follow/${userId}`, {}, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
};

export const unfollowUser = (userId) => {
  return axios.delete(`${API_P_BASE_URL}/unfollow/${userId}`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
};

export const removeFollower = (followerId) => {
  return axios.delete(`${API_P_BASE_URL}/removefollow/${followerId}`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
};

export const allFollowers = (userId) => {
  return axios.get(`${API_P_BASE_URL}/followers/${userId}`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
};

//
export const followingUsers = (userId) => {
  return axios.get(`${API_P_BASE_URL}/following/${userId}`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
};

/**
 * USERS
 */

export const queryUsers = (query) => {
  return axios.get(`${API_P_BASE_URL}/search?query=${query}`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
}


export const likePost = (postId) => {
  return axios.post(`${API_C_BASE_URL}/posts/like/${postId}`, {}, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  });
};

export const allFeeds = () => {
  return axios.get(`${API_C_BASE_URL}/feed`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
    }
  });
};


export const addNewComment = (postId, data) => {
  return axios.post(`${API_C_BASE_URL}/posts/comment/${postId}`, data, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  });
};

export const postAndAllComments = (postId) => {
  return axios.get(`${API_C_BASE_URL}/posts/comments/${postId}`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
};


export const addNewPostWithPicture = (formData) => {
  return axios.post(`${API_C_BASE_URL}/posts`, formData, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const addNewPost = (data) => {
  return axios.post(`${API_C_BASE_URL}/posts`, data, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  });
};
