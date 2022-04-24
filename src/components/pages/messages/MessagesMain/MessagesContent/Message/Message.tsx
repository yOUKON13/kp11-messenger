import { User } from '../../../../../../types/User';
import React from 'react';
import { server } from '../../../../../../API/base';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../../../../store/reducers/Auth/AuthSelector';
import { UserActions } from '../../../../../../store/reducers/User/UserReducer';
import { getTimeString } from '../../../../../../utils/time';
import FileAttachment from './FileAttachment';
import ImageAttachment from './ImageAttachment';

type PropType = {
  sender: User;
  sendAt: Date;
  content: string;
  isSameSender: boolean;
  isSending: boolean;
  attachments: Array<string>;
};

const Message: React.FC<PropType> = function ({ content, sendAt, sender, isSameSender, isSending, attachments }) {
  const user = useSelector(GetUser);
  const dispatch = useDispatch();
  const senderRes = sender._id ? sender : user!;

  const imageReg = /[\/.](gif|jpg|jpeg|tiff|png|svg|ico)$/i;

  const imageAttachments = attachments.filter(attachment => {
    const pathParts = attachment.split('\\');
    const file = pathParts[pathParts.length - 1];

    return imageReg.test(file);
  });
  const fileAttachments = attachments.filter(attachment => imageAttachments.indexOf(attachment) === -1);

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
      <div className="message__content">
        <div className="message__image-attachments flex-container">
          {imageAttachments.map((attachment, i) => {
            return <ImageAttachment key={i} attachment={attachment} />;
          })}
        </div>
        <div className="message__image-attachments">
          {fileAttachments.map((attachment, i) => {
            return <FileAttachment key={i} attachment={attachment} />;
          })}
        </div>
        <div className="flex-container">
          <div>
            {!isSameSender && <p className="gradient-text">{senderRes.name + ' ' + senderRes.surname}</p>}
            <p>{content}</p>
          </div>
          <div className="message__time flex-container">
            <time>{getTimeString(sendAt)}</time>
            {isSending ? <i className="fa-regular fa-clock" /> : <i className="fa-regular fa-circle-check" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
