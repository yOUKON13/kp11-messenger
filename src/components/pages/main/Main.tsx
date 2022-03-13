import '../../../styles/pages/main.scss';
import Chats from '../../Layout/Chats/Chats';
import Navbar from '../../Layout/Navbar/Navbar';
import { useState } from 'react';

function Main() {
  const [isChatCreationWindowOpened, setChatCreationWindowOpened] =
    useState(false);

  function onClick() {
    setChatCreationWindowOpened(true);
  }

  return (
    <div className="main flex-container">
      <Navbar />
      <div className="main__container flex-container">
        <Chats
          isWindowOpened={isChatCreationWindowOpened}
          setWindowOpened={setChatCreationWindowOpened}
        />
        <div className="main__right flex-container">
          <h3>Начните общаться сейчас</h3>
          <p>или выберите чат слева</p>
          <button onClick={onClick} className="gray-button">
            Создать чат
          </button>
        </div>
      </div>
    </div>
  );
}
export default Main;
