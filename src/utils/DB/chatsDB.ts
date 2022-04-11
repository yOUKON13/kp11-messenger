import { Chat } from '../../types/Chat';
import { DBAdd, DBGet, DBSet } from './indexedDB';

export type ChatStateType = {
  isMuted: boolean;
  lastReadMessage: string;
};

export function AddChatsDB(chats: Array<Chat>) {
  chats.forEach(chat => {
    DBAdd('chats', chat._id, { isMuted: false, lastReadMessage: chat.lastMessage });
  });
}

export function SetChatDB(id: string, data: ChatStateType = { isMuted: false, lastReadMessage: '' }, onEnd: () => {}) {
  DBSet('chats', id, data, onEnd);
}

export function GetChatDB(id: string, onGet: Function) {
  return DBGet('chats', id, onGet);
}
