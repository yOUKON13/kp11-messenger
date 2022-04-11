import MessageWindow from '../../../../Common/MessageWindow/MessageWindow';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeaveFromChatF } from '../../../../../store/reducers/Chat/ChatUser/ChatUserReducer';
import { GetChats } from '../../../../../store/reducers/Chat/ChatSelector';
import { GetUser } from '../../../../../store/reducers/Auth/AuthSelector';

type PropType = {
  isOpened?: boolean;
  toggleOpen: (state: boolean) => void;
  leavingChatId: string;
};

const LeaveFromChat: React.FC<PropType> = function ({ isOpened, leavingChatId, toggleOpen }) {
  const dispatch = useDispatch();
  const chats = useSelector(GetChats);
  const currentUser = useSelector(GetUser);
  const isCreator = chats?.some(chat => chat._id === leavingChatId && chat.creator === currentUser._id);

  function onLeave() {
    dispatch(LeaveFromChatF(leavingChatId));
    closeLeaveWindow();
  }

  function closeLeaveWindow() {
    toggleOpen(false);
  }

  return (
    <MessageWindow toggleOpen={toggleOpen} isOpened={isOpened}>
      <h3 className="flex-container">{`Вы действительно хотите ${isCreator ? 'удалить чат' : 'выйти из чата'}?`}</h3>
      <div className="window-buttons flex-container">
        <button onClick={closeLeaveWindow} className="invisible-button-second gray-gradient-link">
          Отмена
        </button>
        <button onClick={onLeave} className="invisible-button-second gradient-text">
          Выйти
        </button>
      </div>
    </MessageWindow>
  );
};

export default LeaveFromChat;
