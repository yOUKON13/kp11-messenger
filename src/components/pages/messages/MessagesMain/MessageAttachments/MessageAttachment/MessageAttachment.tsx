import React from 'react';
import { useDispatch } from 'react-redux';
import { RemoveAttachment } from '../../../../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';

type PropType = {
  index: number;
  attachment: File;
};

const MessageAttachment: React.FC<PropType> = function ({ index, attachment }) {
  const dispatch = useDispatch();

  function removeAttachment() {
    dispatch(RemoveAttachment(index));
  }

  return (
    <div className="message-attachments__attachment flex-container">
      {attachment.type.split('/')[0] === 'image' ? (
        <img src={attachment.path} alt="" />
      ) : (
        <div className="flex-container">
          <i className="fa-solid fa-file"></i>
          <p className="text-overflow">{attachment.name}</p>
        </div>
      )}
      <button onClick={removeAttachment} className="invisible-button attachment__remove">
        <i className="fa-solid fa-circle-xmark"></i>
      </button>
    </div>
  );
};

export default MessageAttachment;
