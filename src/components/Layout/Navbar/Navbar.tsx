import React, { useState } from 'react';
import Navlink from './Navlink/Navlink';
import LogoutWindow from './LogoutWindow/LogoutWindow';

function Navbar() {
  const [isLogoutWindowOpened, setLogoutWindowOpened] = useState(false);

  function openLogoutWindow() {
    setLogoutWindowOpened(true);
  }

  return (
    <>
      <nav className="main__navigation flex-container">
        <Navlink to="/profile">
          <i className="fa-regular fa-circle-user"></i>
        </Navlink>
        <Navlink to="/main">
          <i className="fa-regular fa-house" />
        </Navlink>
        <Navlink to="/messages">
          <i className="fa-regular fa-comment" />
        </Navlink>
        <Navlink to="/search">
          <i className="fa-regular fa-magnifying-glass" />
        </Navlink>
        <button
          onClick={openLogoutWindow}
          className="invisible-button invisible-link"
        >
          <i className="fa-regular fa-arrow-right-from-bracket" />
        </button>
        <Navlink to="/settings">
          <i className="fa-regular fa-gear" />
        </Navlink>
      </nav>
      <LogoutWindow
        isOpened={isLogoutWindowOpened}
        setOpened={setLogoutWindowOpened}
      />
    </>
  );
}

export default Navbar;
