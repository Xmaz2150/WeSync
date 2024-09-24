import React from 'react';


import image from '../assets/imgages/we-sync-invert-logo-plaintm.png';

const Logo = ({ width }) => {
 
  return (
    <img className="mb-4" src={image} alt="We Sync Logo" width={width} />
  );
};

export default Logo
;