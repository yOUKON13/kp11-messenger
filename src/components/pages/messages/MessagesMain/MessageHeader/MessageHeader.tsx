import Members from './Members/Members';
import { useSelector } from 'react-redux';
import { GetCurrentChat, GetUserTyping } from '../../../../../store/reducers/Chat/ChatSelector';
import { useState } from 'react';
import ChangeNameWindow from './ChangeChatWindow/ChangeChatWindow';
import { GetUser } from '../../../../../store/reducers/Auth/AuthSelector';
import AddUserWindow from './AddUserWindow/AddUserWindow';
import { server } from '../../../../../API/base';

const MessageHeader = function () {
  const currentChat = useSelector(GetCurrentChat);
  const currentUser = useSelector(GetUser);
  const userTyping = useSelector(GetUserTyping);
  const [isMembersShowing, setMembersShowing] = useState(false);
  const [isChangeWindowActive, setChangeWindowActive] = useState(false);
  const [isAddUserWindowActive, setAddUserWindowActive] = useState(false);
  const isTyping = userTyping && userTyping.isTyping;

  function showMembers() {
    setMembersShowing(!isMembersShowing);
  }

  function showChangeWindow() {
    setChangeWindowActive(true);
  }

  function showAddUserWindow() {
    setAddUserWindowActive(true);
  }

  return (
    <div className={`${isTyping ? 'typing ' : ''}messages__header flex-container`}>
      <img
        src={currentChat?.avatar ? `${server}${currentChat.avatar}` : 'assets/avatar.png'}
        className="messages__avatar roundy-image"
        alt=""
      />
      <p className="text-overflow">{currentChat?.name}</p>
      {isTyping && (
        <p className="messages__typing fle  x-container">
          <i className="fa-solid fa-circle" />
          {userTyping?.user?.name + ' ' + userTyping?.user?.surname} печатает
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </p>
      )}

      <p className="messages__members-count">{currentChat?.users.length} чел.</p>
      {currentUser?._id === currentChat?.creator && (
        <button onClick={showChangeWindow} className="messages__edit-chat-name animated-button invisible-button">
          <i className="fa-solid fa-pen-to-square" />
        </button>
      )}

      <button onClick={showAddUserWindow} className="messages__add-member animated-button invisible-button">
        <i className="fa-solid fa-plus" />
      </button>
      <div className="messages__members">
        <button
          onClick={showMembers}
          className={`${isMembersShowing ? 'active ' : ''}invisible-button animated-button`}
        >
          <i className="fa-solid fa-user-group" />
          <i className={`${isMembersShowing ? 'up ' : ''}messages__members-arrow fa-regular fa-chevron-down`} />
        </button>
        <Members
          creatorId={currentChat?.creator || ''}
          members={currentChat?.users || []}
          isActive={isMembersShowing}
        />
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
    </div>
  );
};

export default MessageHeader;
