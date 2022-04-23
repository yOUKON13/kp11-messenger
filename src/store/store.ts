import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './reducers/App/AppReducer';
import AuthReducer from './reducers/Auth/AuthReducer';
import ChatCombinedReducer from './reducers/Chat/ChatCombinedReducer';
import SettingsReducer from './reducers/Settings/SettingsReducer';
import { io } from 'socket.io-client';
import { server, wsServer } from '../API/base';
import UserReducer from './reducers/User/UserReducer';
import MessageReducer from './reducers/Message/MessageReducer';

export const socket = io(`${wsServer}`, {
  transports: ['websocket'],
  extraHeaders: {
    Authorization: 'secret',
    Origin: server,
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
  },
});

const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  chat: ChatCombinedReducer,
  settings: SettingsReducer,
  user: UserReducer,
  message: MessageReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
