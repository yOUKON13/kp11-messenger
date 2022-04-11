import { User } from '../../../../../../types/User';
import React from 'react';
import { server } from '../../../../../../API/base';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../../../../store/reducers/Auth/AuthSelector';
import { UserActions } from '../../../../../../store/reducers/User/UserReducer';
import { getTimeString } from '../../../../../../utils/time';

type PropType = {
  sender: User;
  sendAt: Date;
  content: string;
  isSameSender: boolean;
  isSending: boolean;
};

const Message: React.FC<PropType> = function ({ content, sendAt, sender, isSameSender, isSending }) {
  const user = useSelector(GetUser);
  const dispatch = useDispatch();
  const senderRes = sender._id ? sender : user!;

  function onAvatarClick() {
    dispatch(UserActions.setUserWindowActive(true));
    dispatch(UserActions.setShowingUser(sender));
  }

  return (
    <div
      className={`${user?._id === senderRes._id ? 'self ' : ''}${isSameSender ? 'same ' : ''}message flex-container`}
    >
      {!isSameSender && (
        <button onClick={onAvatarClick} className="invisible-button">
          <img
            className="roundy-image"
            src={senderRes.avatar ? `${server}${senderRes.avatar}` : 'assets/avatar.png'}
            alt=""
          />
        </button>
      )}
      <div className="message__content flex-container">
        <div>
          {!isSameSender && <p className="gradient-text">{senderRes.name + ' ' + senderRes.surname}</p>}
          <p>{content}</p>
        </div>
        <time>{getTimeString(sendAt)}</time>
        {isSending ? <i className="fa-regular fa-clock" /> : <i className="fa-regular fa-circle-check" />}
      </div>
    </div>
  );
};

export default Message;
