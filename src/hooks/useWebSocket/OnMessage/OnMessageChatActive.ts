import { ChatActions, GetChat, GetChatsF } from '../../../store/reducers/Chat/ChatReducer';
import { AddMessageF, ChatMessageActions } from '../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';
import { Message } from '../../../types/Message';
import { Chat } from '../../../types/Chat';
import { Dispatch } from 'redux';
import { User } from '../../../types/User';

export default function OnMessageChatActive(
  dispatch: Dispatch<any>,
  currentChat: Chat,
  payload: Message,
  user: User,
  history: any
) {
  if (payload.isSystem) {
    switch (payload.action) {
      case 'userRemove':
      case 'userLeave':
        if (payload.target === user._id) {
          history.push('/main');
          return;
        }
        break;
      case 'chatRemove':
        history.push('/main');
        return;
      case 'changeChat':
        dispatch(GetChatsF('', 0));
        break;
    }

    dispatch(GetChat(currentChat?._id || ''));
  } else {
    dispatch(AddMessageF(payload));
  }
}
