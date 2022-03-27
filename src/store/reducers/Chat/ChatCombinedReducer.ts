import { combineReducers } from 'redux';
import ChatReducer from './ChatReducer';
import ChatUserReducer from './ChatUser/ChatUserReducer';
import ChatMessageReducer from './ChatMessage/ChatMessageReducer';

export default combineReducers({
  main: ChatReducer,
  user: ChatUserReducer,
  message: ChatMessageReducer,
});
