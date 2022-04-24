import { Selector } from 'react-redux';
import { AppStateType } from '../../../store';
import { Message } from '../../../../types/Message';

export const GetCurrentMessages: Selector<AppStateType, Array<Message>> = state => state.chat.message.messages;

export const GetMessagesLoading: Selector<AppStateType, boolean> = state => state.chat.message.isLoading;

export const GetMessagesLastPage: Selector<AppStateType, boolean> = state => state.chat.message.isLastPage;

export const GetAttachments: Selector<AppStateType, Array<File>> = state => state.chat.message.attachments;

export const GetSendingMessages: Selector<AppStateType, Array<{ content: string }>> = state =>
  state.chat.message.sendingMessages;
