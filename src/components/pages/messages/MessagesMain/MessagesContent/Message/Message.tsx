import { User } from '../../../../../../types/User';
import React from 'react';
import { server } from '../../../../../../API/base';
import { useSelector } from 'react-redux';
import { GetUser } from '../../../../../../store/reducers/Auth/AuthSelector';

type PropType = {
  sender: User;
  sendAt: Date;
  content: string;
  isSameSender: boolean;
  isSending: boolean;
};

const Message: React.FC<PropType> = function ({
  content,
  sendAt,
  sender,
  isSameSender,
  isSending,
}) {
  const user = useSelector(GetUser);
  const senderRes = sender._id ? sender : user!;

  return (
    <div
      className={`${user?._id === senderRes._id ? 'self ' : ''}${
        isSameSender ? 'same ' : ''
      }message flex-container`}
    >
      {!isSameSender && (
        <img
          className="roundy-image"
          src={
            senderRes.avatar
              ? `${server}${senderRes.avatar}`
              : 'assets/avatar.png'
          }
          alt=""
        />
      )}
      <div className="message__content flex-container">
        <div>
          {!isSameSender && (
            <p className="gradient-text">
              {senderRes.name + ' ' + senderRes.surname}
            </p>
          )}
          <p>{content}</p>
        </div>
        <time>{new Date(sendAt).toLocaleTimeString().substring(0, 5)}</time>
        {isSending ? (
          <i className="fa-regular fa-clock" />
        ) : (
          <i className="fa-regular fa-circle-check" />
        )}
      </div>
    </div>
  );
};

export default Message;
