import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { GetCurrentChat } from '../../../../../store/reducers/Chat/ChatSelector';
import { server } from '../../../../../API/base';

type PropType = {
  id: string;
  avatar: string;
  name: string;
  lastMessage?: string;
  lastMessageTime?: Date;
};

const Chat: React.FC<PropType> = function ({
  id,
  avatar,
  name,
  lastMessage,
  lastMessageTime,
}) {
  const currentChat = useSelector(GetCurrentChat);

  function onClick(event: Event) {
    event.stopPropagation();
  }

  return (
    <div className={`${currentChat?._id === id ? 'active ' : ''}chats__chat`}>
      <Link to={`/messages/${id}`} className="invisible-button  flex-container">
        <img
          className="roundy-image"
          src={avatar ? `${server}${avatar}` : 'assets/avatar.png'}
          alt=""
        />
        <div className="chat__info">
          <p className="chat__name text-overflow">{name}</p>
          {lastMessage && (
            <p className="chat__last-message text-overflow">{lastMessage}</p>
          )}
        </div>
        <div className="chat__right flex-container">
          {lastMessageTime && (
            <time>
              {new Date(lastMessageTime).toLocaleTimeString().substr(0, 5)}
            </time>
          )}
          <button onClick={onClick} className="invisible-button">
            <i className="fa-regular fa-xmark" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Chat;
