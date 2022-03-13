import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from './reducers/App/AppReducer';
import AuthReducer from './reducers/Auth/AuthReducer';
import ChatReducer from './reducers/Chat/ChatReducer';

const rootReducer = combineReducers({
  app: AppReducer,
  auth: AuthReducer,
  chat: ChatReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
