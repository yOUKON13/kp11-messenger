import React, { useState } from 'react';
import Navlink from './Navlink/Navlink';
import LogoutWindow from './LogoutWindow/LogoutWindow';
import { useSelector } from 'react-redux';
import { GetChats } from '../../../store/reducers/Chat/ChatSelector';
import SettingsWindow from './SettingsWindows/SettingsWindow';

function Navbar() {
  const [isLogoutWindowOpened, setLogoutWindowOpened] = useState(false);
  const [isSettingsWindowOpened, setSettingsWindowOpened] = useState(false);
  const chats = useSelector(GetChats);

  function openLogoutWindow() {
    setLogoutWindowOpened(true);
  }

  function openSettingsWindow() {
    setSettingsWindowOpened(true);
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
        <Navlink
          checkUrl="/messages"
          to={`/messages/${chats.length ? chats[0]?._id : ''}`}
        >
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
        <button onClick={openSettingsWindow} className="invisible-button">
          <i className="fa-regular fa-gear" />
        </button>
      </nav>
      <LogoutWindow
        isOpened={isLogoutWindowOpened}
        setOpened={setLogoutWindowOpened}
      />
      <SettingsWindow
        toggleOpen={setSettingsWindowOpened}
        isOpened={isSettingsWindowOpened}
      />
    </>
  );
}

export default Navbar;
