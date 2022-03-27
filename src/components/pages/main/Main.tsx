import '../../../styles/pages/main.scss';
import Chats from '../../Layout/Chats/Chats';
import Navbar from '../../Layout/Navbar/Navbar';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChatActions } from '../../../store/reducers/Chat/ChatReducer';

function Main() {
  const dispatch = useDispatch();

  const [isChatCreationWindowOpened, setChatCreationWindowOpened] =
    useState(false);

  function onClick() {
    setChatCreationWindowOpened(true);
  }

  useEffect(() => {
    dispatch(ChatActions.setChat(null));
  }, []);

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
