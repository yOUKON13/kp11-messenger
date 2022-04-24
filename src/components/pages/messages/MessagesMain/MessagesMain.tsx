import MessageField from './MessageField/MessageField';
import useMessageForm from './useMessageForm';
import MessageHeader from './MessageHeader/MessageHeader';
import MessagesContent from './MessagesContent/MessagesContent';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAttachments } from '../../../../store/reducers/Chat/ChatMessage/ChatMessageSelector';
import { SetAttachments } from '../../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';

function MessagesMain() {
  const formik = useMessageForm();
  const dispatch = useDispatch();
  const attachments = useSelector(GetAttachments);

  function addAttachments(e) {
    dispatch(SetAttachments([...attachments, ...e.target.files]));
    e.target.value = null;
  }

  return (
    <div className="messages__main flex-container">
      <div className="messages__message-area flex-container">
        <MessageHeader />
        <MessagesContent />
      </div>
      <div className="messages__actions">
        <form onSubmit={formik.handleSubmit} className="flex-container">
          <div className="messages__attachment-add">
            <label htmlFor="attachment-add" className="button invisible-button animated-button">
              <i className="fa-solid fa-paperclip" />
            </label>
            <input id="attachment-add" onChange={addAttachments} type="file" multiple name="avatar" />
          </div>
          <MessageField formik={formik} />
          <button type="submit" className="invisible-button animated-button">
            <i className="fa-regular fa-paper-plane-top" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default MessagesMain;
