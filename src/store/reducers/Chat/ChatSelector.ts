import { Selector } from 'react-redux';
import { AppStateType } from '../../store';
import { Chat } from '../../../types/Chat';

export const GetChats: Selector<AppStateType, Array<Chat>> = state =>
  state.chat.chats;

export const GetChatsCount: Selector<AppStateType, number> = state =>
  state.chat.chatsCount;

export const GetChatsLoading: Selector<AppStateType, boolean> = state =>
  state.chat.isLoading;

export const GetIsLastPage: Selector<AppStateType, boolean> = state =>
  state.chat.isLastPage;
