import Navbar from '../../Layout/Navbar/Navbar';
import Chats from '../../Layout/Chats/Chats';
import { useState } from 'react';

function Message() {
  const [isChatCreationWindowOpened, setChatCreationWindowOpened] =
    useState(false);

  return (
    <div className="main flex-container">
      <Navbar />
      <div className="main__container flex-container">
        <Chats
          isWindowOpened={isChatCreationWindowOpened}
          setWindowOpened={setChatCreationWindowOpened}
        />
      </div>
    </div>
  );
}

export default Message;
