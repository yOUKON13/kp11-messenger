import ChatSearch from './ChatSearch/ChatSearch';
import Loader from '../../../Common/Loader/Loader';
import Chat from './Chat/Chat';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetChats,
  GetChatsLoading,
  GetIsLastPage,
} from '../../../../store/reducers/Chat/ChatSelector';
import { GetChatsF } from '../../../../store/reducers/Chat/ChatReducer';

function ChatsList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const isLoading = useSelector(GetChatsLoading);
  const chats = useSelector(GetChats);
  const isLastPage = useSelector(GetIsLastPage);

  const dispatch = useDispatch();

  const scrollable = useRef<HTMLDivElement>();

  useEffect(() => {
    scrollable.current!.onscroll = getBooksScroll;
  }, [isLoading]);

  useEffect(() => {
    if (!chats.length) {
      setPage(0);
    }
  }, [chats]);

  function getBooksScroll() {
    const scrolledBottom =
      scrollable.current!.scrollTop + scrollable.current!.offsetHeight ===
      scrollable.current!.scrollHeight;

    if (scrolledBottom && !isLoading && !isLastPage) {
      dispatch(GetChatsF(search, page + 1));
      setPage(page + 1);
      window.removeEventListener('scroll', getBooksScroll);
    }
  }

  useEffect(() => {
    window.removeEventListener('scroll', getBooksScroll);
    setPage(0);
    dispatch(GetChatsF(search, 0));
  }, [search]);

  return (
    <div className="main__chats" ref={scrollable}>
      <ChatSearch setSearch={setSearch} search={search} />
      <div className="main__scrollable-chats">
        {chats.map(chat => {
          return (
            <Chat
              id={chat._id}
              key={chat._id}
              lastMessage="стив хуйс"
              lastMessageTime={new Date(Date.now())}
              name={chat.name}
            />
          );
        })}
      </div>

      {isLoading && <Loader />}
    </div>
  );
}

export default ChatsList;
