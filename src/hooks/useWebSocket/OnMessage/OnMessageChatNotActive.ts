import { Message } from '../../../types/Message';
import { GetChatsF } from '../../../store/reducers/Chat/ChatReducer';
import { Chat } from '../../../types/Chat';
import { Dispatch } from 'redux';
import { User } from '../../../types/User';

export default function OnMessageChatNotActive(
  dispatch: Dispatch<any>,
  currentChat: Chat,
  payload: Message,
  user: User,
  history: any
) {
  if (payload.isSystem) {
    dispatch(GetChatsF('', 0));
  }
}
