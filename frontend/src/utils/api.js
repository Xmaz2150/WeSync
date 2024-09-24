import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/wesync';
const API_P_BASE_URL = 'http://localhost:5000/social/users';

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
  return axios.post(`http://localhost:5000/social/posts/like/${postId}`, {}, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
      'Content-Type': 'application/json'
    }
  });
};

export const allFeeds = () => {
  return axios.get('http://localhost:5000/social/feed', {
    headers: {
      'Authorization': `Bearer ${getJwt()}`,
    }
  });
};


export const postAndAllComments = (postId) => {
  return axios.get(`http://localhost:5000/social/posts/comments/${postId}`, {
    headers: {
      'Authorization': `Bearer ${getJwt()}`
    }
  });
};