import { Selector } from 'react-redux';
import { AppStateType } from '../../store';
import { Message } from '../../../types/Message';

export const GetQuerriedMessages: Selector<AppStateType, Array<Message>> = state => state.message.messages;

export const GetQuerriedMessagesLastPage: Selector<AppStateType, boolean> = state => state.message.isLastPage;

export const GetQuerriedMessagesLoading: Selector<AppStateType, boolean> = state => state.message.isLoading;
