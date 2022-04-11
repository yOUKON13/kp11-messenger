import { useSelector } from 'react-redux';
import { GetUser } from '../../../../../../store/reducers/Auth/AuthSelector';
import ChangeNameWindow from '../ChangeChatWindow/ChangeChatWindow';
import AddUserWindow from '../AddUserWindow/AddUserWindow';
import { useEffect, useState } from 'react';
import { GetCurrentChat } from '../../../../../../store/reducers/Chat/ChatSelector';
import { ChatStateType, GetChatDB, SetChatDB } from '../../../../../../utils/DB/chatsDB';

type PropType = {
  isActive: boolean;
};

const Options: React.FC<PropType> = function ({ isActive }) {
  const currentUser = useSelector(GetUser);
  const currentChat = useSelector(GetCurrentChat);

  const [chatState, setChatState] = useState<ChatStateType>(undefined as any);
  const [isChangeWindowActive, setChangeWindowActive] = useState(false);
  const [isAddUserWindowActive, setAddUserWindowActive] = useState(false);

  function showChangeWindow() {
    setChangeWindowActive(true);
  }

  function showAddUserWindow() {
    setAddUserWindowActive(true);
  }

  function onMuteClick() {
    setChatState({ ...chatState, isMuted: !chatState?.isMuted });
  }

  useEffect(() => {
    if (currentChat && chatState) {
      SetChatDB(currentChat._id, chatState);
    }
  }, [chatState]);

  useEffect(() => {
    GetChatDB(currentChat?._id || '', result => {
      if (result) {
        setChatState(result);
      }
    });
  }, [currentChat?._id]);

  return (
    <>
      <div className={`${isActive ? 'active ' : ''}chat__options dropping-down`}>
        {currentUser?._id === currentChat?.creator && (
          <div className="block">
            <button onClick={showChangeWindow} className="invisible-button">
              <p className="text-overflow flex-container">
                <i className="fa-solid fa-pen-to-square" />
                Управлять группой
              </p>
            </button>
          </div>
        )}
        <div className="block">
          <button onClick={showAddUserWindow} className="invisible-button">
            <p className="text-overflow flex-container">
              <i className="fa-solid fa-plus" />
              Добавить участников
            </p>
          </button>
        </div>
        <div className="block">
          <button onClick={onMuteClick} className="invisible-button">
            <p className="text-overflow flex-container">
              {chatState?.isMuted ? (
                <>
                  <i className="fa-solid fa-volume-xmark" />
                  Вкл. уведомления
                </>
              ) : (
                <>
                  <i className="fa-solid fa-volume" />
                  Выкл. уведомления
                </>
              )}
            </p>
          </button>
        </div>
      </div>
      <ChangeNameWindow
        chatId={currentChat?._id || ''}
        isOpened={isChangeWindowActive}
        toggleOpen={setChangeWindowActive}
        name={currentChat?.name || ''}
        avatar={currentChat?.avatar || ''}
      />
      <AddUserWindow
        chatId={currentChat?._id || ''}
        toggleOpen={setAddUserWindowActive}
        isOpened={isAddUserWindowActive}
      />
    </>
  );
};

export default Options;
