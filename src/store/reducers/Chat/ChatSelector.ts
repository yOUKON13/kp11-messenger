import { Selector } from 'react-redux';
import { AppStateType } from '../../store';
import { Chat } from '../../../types/Chat';
import { UserTyping } from '../../../types/User';

export const GetChats: Selector<AppStateType, Array<Chat>> = state => state.chat.main.chats;

export const GetCurrentChat: Selector<AppStateType, Chat | null> = state => state.chat.main.currentChat;

export const GetChatsCount: Selector<AppStateType, number> = state => state.chat.main.chatsCount;

export const GetChatsLoading: Selector<AppStateType, boolean> = state => state.chat.main.isLoading;

export const GetIsLastPage: Selector<AppStateType, boolean> = state => state.chat.main.isLastPage;

export const GetUserTyping: Selector<AppStateType, UserTyping | null> = state => state.chat.main.userTyping;
