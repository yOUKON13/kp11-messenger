import React, { useState } from 'react';
import InputType from '../../../../../types/Input';
import Input from '../../../../Common/Inputs/Input';
import { socket } from '../../../../../store/store';
import { useSelector } from 'react-redux';
import { GetCurrentChat } from '../../../../../store/reducers/Chat/ChatSelector';

const MessageField: React.FC<InputType> = function ({ formik }) {
  const currentChat = useSelector(GetCurrentChat);
  const [isSended, setSended] = useState(false);
  let typingTimer: any;
  const doneTypingInterval = 3000;

  function onKeyUp() {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  }

  function onKeyDown() {
    if (!isSended) {
      socket.emit('typing', { chatId: currentChat?._id, isTyping: true });
      setSended(true);
    }

    clearTimeout(typingTimer);
  }

  function doneTyping() {
    socket.emit('typing', { chatId: currentChat?._id, isTyping: false });
    setSended(false);
  }

  return (
    <Input
      name="content"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.content}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      placeholder="Сообщение"
    />
  );
};

export default MessageField;
