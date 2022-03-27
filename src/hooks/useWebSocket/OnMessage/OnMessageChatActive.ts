import { ChatActions, GetChat } from '../../../store/reducers/Chat/ChatReducer';
import { ChatMessageActions } from '../../../store/reducers/Chat/ChatMessage/ChatMessageReducer';
import { Message } from '../../../types/Message';
import { Chat } from '../../../types/Chat';
import { Dispatch } from 'redux';
import { User } from '../../../types/User';
import OnMessageChatNotActive from './OnMessageChatNotActive';

export default function OnMessageChatActive(
  dispatch: Dispatch<any>,
  currentChat: Chat,
  payload: Message,
  user: User,
  history: any
) {
  if (payload.isSystem) {
    if (payload.action === 'userRemove' && payload.target === user._id) {
      history.push('/main');
    } else {
      dispatch(GetChat(currentChat?._id || ''));
    }
  } else {
    dispatch(ChatMessageActions.addMessage(payload));
  }
}
