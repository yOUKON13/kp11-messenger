import Members from './Members/Members';
import { useSelector } from 'react-redux';
import { GetCurrentChat, GetUserTyping } from '../../../../../store/reducers/Chat/ChatSelector';
import { useState } from 'react';
import { server } from '../../../../../API/base';
import Options from './Options/Options';

const MessageHeader = function () {
  const currentChat = useSelector(GetCurrentChat);
  const userTyping = useSelector(GetUserTyping);
  const isTyping = userTyping && userTyping.isTyping;
  const typing = isTyping && userTyping && userTyping.user;
  const [isMembersShowing, setMembersShowing] = useState(false);
  const [isOptionsWindowActive, setOptionsWindowActive] = useState(false);

  function showMembers() {
    setMembersShowing(!isMembersShowing);
    setOptionsWindowActive(false);
  }

  function showOptionsWindow() {
    setOptionsWindowActive(!isOptionsWindowActive);
    setMembersShowing(false);
  }

  return (
    <div className={`${typing ? 'typing ' : ''}messages__header flex-container`}>
      <img
        src={currentChat?.avatar ? `${server}${currentChat.avatar}` : 'assets/avatar.png'}
        className="messages__avatar roundy-image"
        alt=""
      />
      <p className="text-overflow">{currentChat?.name}</p>
      {typing && (
        <div className="messages__typing flex-container">
          <i className="fa-solid fa-circle" />
          <p className="text-overflow">{userTyping!.user.name + ' ' + userTyping!.user.surname}</p>
          <p>печатает...</p>
        </div>
      )}
      <p className="messages__members-count">{currentChat?.users.length} чел.</p>
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

      <div className="messages__options">
        <button onClick={showOptionsWindow} className="animated-button invisible-button">
          <i className={`${isOptionsWindowActive ? 'gradient-text ' : ''}fa-solid fa-ellipsis`} />
        </button>
        <Options isActive={isOptionsWindowActive} />
      </div>
    </div>
  );
};

export default MessageHeader;
