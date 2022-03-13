import { useSelector } from 'react-redux';
import { GetChatsCount } from '../../../store/reducers/Chat/ChatSelector';
import ChatsList from './ChatsList/ChatsList';
import CreateChat from './ChatsList/CreateChat/CreateChat';

type PropType = {
  isWindowOpened: boolean;
  setWindowOpened: (value: boolean) => void;
};

const Chats: React.FC<PropType> = function ({
  isWindowOpened,
  setWindowOpened,
}) {
  const chatsCount = useSelector(GetChatsCount);

  function open() {
    setWindowOpened(true);
  }

  return (
    <div className="main__left flex-container">
      <div className="main__left-header flex-container">
        <button className="invisible-button main__messages-btn flex-container">
          Сообщения
          <span className="material-icons-outlined">expand_more</span>
        </button>
        <div className="main__chats-count flex-container">
          <p>{chatsCount}</p>
        </div>
        <button onClick={open} className="main__chat-create">
          +
        </button>
      </div>
      <div className="main__content flex-container">
        <ChatsList />
      </div>
      <CreateChat toggleOpen={setWindowOpened} isOpened={isWindowOpened} />
    </div>
  );
};

export default Chats;
