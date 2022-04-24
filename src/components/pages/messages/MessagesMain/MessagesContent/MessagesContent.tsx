import { useDispatch, useSelector } from 'react-redux';
import { GetCurrentChat } from '../../../../../store/reducers/Chat/ChatSelector';
import {
  GetCurrentMessages,
  GetMessagesLastPage,
  GetMessagesLoading,
  GetSendingMessages,
} from '../../../../../store/reducers/Chat/ChatMessage/ChatMessageSelector';
import React, { useEffect, useRef } from 'react';
import { GetMessagesF } from '../../../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';
import Message from './Message/Message';
import useInfiniteScroll from '../../../../../hooks/useInfiniteScroll/useInfiniteScroll';
import DragImages from './DragImages';
import MessageAttachments from '../MessageAttachments/MessageAttachments';

function MessagesContent() {
  const currentChat = useSelector(GetCurrentChat);
  const messages = useSelector(GetCurrentMessages);
  const sendingMessages = useSelector(GetSendingMessages);
  const isLoading = useSelector(GetMessagesLoading);
  const isLastPage = useSelector(GetMessagesLastPage);

  const messagesRef = useRef<HTMLDivElement>();
  const dispatch = useDispatch();

  const [page, setPage, getDataScroll] = useInfiniteScroll(
    messagesRef.current,
    isLoading,
    () => {
      dispatch(GetMessagesF(currentChat?._id || '', page + 1));
    },
    isLastPage,
    false
  );

  useEffect(() => {
    if (!messages.length) {
      setPage(0);
    }
  }, [messages]);

  useEffect(() => {
    if (currentChat) {
      dispatch(GetMessagesF(currentChat._id, 0));
    }
  }, [currentChat?._id]);

  return (
    <DragImages>
      <div className="chat-messages flex-container" ref={messagesRef}>
        {messages.map((message, index) => (
          <Message
            key={message._id}
            sender={message.sender}
            sendAt={message.sendAt}
            content={message.content}
            isSameSender={index < messages.length - 1 && messages[index + 1].sender._id === message.sender._id}
            isSending={!!sendingMessages.find(msg => message.content === msg.content)}
            attachments={message.attachments}
          />
        ))}
      </div>
      <MessageAttachments />
    </DragImages>
  );
}

export default MessagesContent;
