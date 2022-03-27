import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './reducers/App/AppReducer';
import AuthReducer from './reducers/Auth/AuthReducer';
import ChatCombinedReducer from './reducers/Chat/ChatCombinedReducer';
import SettingsReducer from './reducers/Settings/SettingsReducer';
import { io } from 'socket.io-client';
import { wsServer } from '../API/base';
import UserReducer from './reducers/User/UserReducer';

export const socket = io(`${wsServer}`, {
  transports: ['websocket'],
});

const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  chat: ChatCombinedReducer,
  settings: SettingsReducer,
  user: UserReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
