import Navbar from '../../Layout/Navbar/Navbar';
import { useEffect, useRef, useState } from 'react';
import ChatSearch from '../../Layout/Chats/ChatsList/ChatSearch/ChatSearch';
import '../../../styles/pages/message-search.scss';
import Chats from '../../Layout/Chats/Chats';
import { ChatActions, GetChatsF } from '../../../store/reducers/Chat/ChatReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetQuerriedMessages,
  GetQuerriedMessagesLastPage,
  GetQuerriedMessagesLoading,
} from '../../../store/reducers/Message/MessageSelector';
import FoundMessage from './FoundMessage/FoundMessage';
import Loader from '../../Common/Loader/Loader';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll/useInfiniteScroll';
import { GetMessagesByQuery } from '../../../store/reducers/Message/MessageReducer';

function MessageSearch() {
  const [isChatCreationWindowOpened, setChatCreationWindowOpened] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const scrollable = useRef<HTMLDivElement>();

  const messages = useSelector(GetQuerriedMessages);
  const isLoading = useSelector(GetQuerriedMessagesLoading);
  const isLastPage = useSelector(GetQuerriedMessagesLastPage);

  useEffect(() => {
    dispatch(ChatActions.setChat(null));
  }, []);

  useEffect(() => {
    if (search) {
      window.removeEventListener('scroll', getDataScroll as any);
      setPage(0);
      dispatch(GetMessagesByQuery(search, 0));
    }
  }, [search]);

  const [page, setPage, getDataScroll] = useInfiniteScroll(
    scrollable.current,
    isLoading,
    () => {
      dispatch(GetMessagesByQuery(search, page + 1));
    },
    isLastPage
  );

  useEffect(() => {
    if (!messages.length) {
      setPage(0);
    }
  }, [messages]);

  return (
    <div className="main message-search flex-container">
      <Navbar />
      <Chats isWindowOpened={isChatCreationWindowOpened} setWindowOpened={setChatCreationWindowOpened} />
      <div className="main__container flex-container">
        <ChatSearch search={search} setSearch={setSearch} placeholder="Поиск по сообщениям" />
        <div ref={scrollable} className="message-search__messages">
          {messages.map(message => {
            return (
              <FoundMessage
                senderName={message.sender.name}
                content={message.content}
                time={message.sendAt}
                senderSurname={message.sender.surname}
                senderAvatar={message.sender.avatar}
              />
            );
          })}
        </div>
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default MessageSearch;
