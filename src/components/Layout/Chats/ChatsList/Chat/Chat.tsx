import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetCurrentChat } from '../../../../../store/reducers/Chat/ChatSelector';
import { server } from '../../../../../API/base';
import { GetUser } from '../../../../../store/reducers/Auth/AuthSelector';
import { ChatStateType, GetChatDB } from '../../../../../utils/DB/chatsDB';
import { Message } from '../../../../../types/Message';
import { getTimeString } from '../../../../../utils/time';

type PropType = {
  id: string;
  avatar: string;
  name: string;
  lastMessage?: Message;
  setLeaveWindowOpened: (value: boolean) => void;
  setLeavingChatId: (value: string) => void;
};

const Chat: React.FC<PropType> = function ({ id, avatar, name, setLeaveWindowOpened, setLeavingChatId, lastMessage }) {
  const currentChat = useSelector(GetCurrentChat);
  const user = useSelector(GetUser);
  const [chatState, setChatState] = useState<ChatStateType | undefined>(undefined);
  const senderId = lastMessage?.sender?._id || lastMessage?.sender;

  function onClick() {
    setLeavingChatId(id);
    setLeaveWindowOpened(true);
  }

  useEffect(() => {
    GetChatDB(id, result => {
      setChatState(result);
    });
  }, [currentChat]);

  return (
    <div className={`${currentChat?._id === id ? 'active ' : ''}chats__chat flex-container`}>
      <Link to={`/messages/${id}`} className="invisible-button flex-container">
        <img className="roundy-image" src={avatar ? `${server}${avatar}` : 'assets/avatar.png'} alt="" />
        {currentChat?._id !== id && lastMessage?._id !== chatState?.lastReadMessage && (
          <div className="chat__unread"></div>
        )}
        <div className="chat__info">
          <p className="chat__name text-overflow">{name}</p>
          {lastMessage && (
            <p className="chat__last-message text-overflow">
              {senderId === user?._id && <span className="gradient-text">Вы: </span>}
              {lastMessage.content || 'Вложения'}
            </p>
          )}
        </div>
      </Link>
      <div className="chat__right flex-container">
        {lastMessage?.sendAt && <time>{getTimeString(lastMessage?.sendAt)}</time>}
        <button onClick={onClick} className="invisible-button">
          <i className="fa-regular fa-xmark" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
