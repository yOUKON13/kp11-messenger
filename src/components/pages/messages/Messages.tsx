import Navbar from '../../Layout/Navbar/Navbar';
import Chats from '../../Layout/Chats/Chats';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetChatsLoading, GetCurrentChat } from '../../../store/reducers/Chat/ChatSelector';
import { ChatActions, GetChat } from '../../../store/reducers/Chat/ChatReducer';
import Loader from '../../Common/Loader/Loader';
import MessagesMain from './MessagesMain/MessagesMain';
import '../../../styles/pages/messages.scss';
import { GetChatDB, SetChatDB } from '../../../utils/DB/chatsDB';

function Message() {
  const [isChatCreationWindowOpened, setChatCreationWindowOpened] = useState(false);
  const { id } = useParams();
  const currentChat = useSelector(GetCurrentChat);
  const isLoading = useSelector(GetChatsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetChat(id));
  }, [id]);

  useEffect(() => {
    if (currentChat) {
      GetChatDB(currentChat?._id, result => {
        SetChatDB(id, { ...result, lastReadMessage: currentChat.lastMessage }, () => {
          dispatch(ChatActions.setChat({ ...currentChat }));
        });
      });
    }
  }, [currentChat?.lastMessage]);

  return (
    <div className="main messages flex-container">
      <Navbar />
      <div className="main__container flex-container">
        <Chats isWindowOpened={isChatCreationWindowOpened} setWindowOpened={setChatCreationWindowOpened} />
        <div className="messages__wrapper flex-container">
          {!currentChat && isLoading ? <Loader /> : <MessagesMain />}
        </div>
      </div>
    </div>
  );
}

export default Message;
