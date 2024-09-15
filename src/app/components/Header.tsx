import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <img src="/icons/logo.svg" alt="Left Image" className="header-image left-image" height="60" width="28" />
      <h1 className="header-title">Home / Chat Name</h1>
      <img src="/icons/user.svg" height="42" width="42" alt="Right Image" className="header-image right-image" />
    </header>
  );
};

export default Header;