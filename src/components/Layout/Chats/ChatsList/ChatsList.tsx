import ChatSearch from './ChatSearch/ChatSearch';
import Loader from '../../../Common/Loader/Loader';
import Chat from './Chat/Chat';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetChatsGlobalPage,
  GetChats,
  GetChatsLoading,
  GetIsLastPage,
} from '../../../../store/reducers/Chat/ChatSelector';
import { GetChatsF } from '../../../../store/reducers/Chat/ChatReducer';
import useInfiniteScroll from '../../../../hooks/useInfiniteScroll/useInfiniteScroll';

function ChatsList() {
  const [search, setSearch] = useState('');
  const scrollable = useRef<HTMLDivElement>();
  const isLoading = useSelector(GetChatsLoading);
  const isLastPage = useSelector(GetIsLastPage);
  const dispatch = useDispatch();
  const chats = useSelector(GetChats);

  const [page, setPage, getDataScroll] = useInfiniteScroll(
    scrollable.current,
    isLoading,
    () => {
      dispatch(GetChatsF(search, page + 1));
    },
    isLastPage
  );

  useEffect(() => {
    if (!chats.length) {
      setPage(0);
    }
  }, [chats]);

  useEffect(() => {
    window.removeEventListener('scroll', getDataScroll as any);
    setPage(0);
    dispatch(GetChatsF(search, 0));
  }, [search]);

  return (
    <div className="main__chats">
      <ChatSearch setSearch={setSearch} search={search} />
      <div className="main__scrollable-chats" ref={scrollable}>
        {chats.map(chat => {
          return (
            <Chat
              id={chat._id}
              key={chat._id}
              lastMessage={chat.lastMessage?.content}
              lastMessageTime={chat.lastMessage?.sendAt}
              name={chat.name}
              avatar={chat.avatar}
            />
          );
        })}
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default ChatsList;
