import instance, { newHeaders, Response } from '../base';
import { Chat } from '../../types/Chat';

type ChatResponse = {
  status: string;
  data: Chat;
};

type ChatsResponse = {
  status: string;
  data: {
    chats: Array<Chat>;
    isLastPage: boolean;
    count: number;
  };
};

const ChatAPI = {
  create(name: string, users?: Array<string>): Promise<Response<ChatResponse>> {
    return instance.post('/chats', { name, users }, { headers: newHeaders() });
  },

  get(search: string, page: number): Promise<Response<ChatsResponse>> {
    return instance.get(`/chats?q=${search}&p=${page}`, {
      headers: newHeaders(),
    });
  },

  getById(id: string): Promise<Response<ChatResponse>> {
    return instance.get(`/chats/${id}`, {
      headers: newHeaders(),
    });
  },

  update(id: string, data: any): Promise<Response<ChatResponse>> {
    return instance.patch(`/chats/${id}`, data, {
      headers: newHeaders(),
    });
  },

  removeUser(chatId: string, userId: string): Promise<Response<ChatResponse>> {
    return instance.delete(`/chats/${chatId}/users/${userId}`, {
      headers: newHeaders(),
    });
  },

  leave(chatId: string): Promise<Response<ChatResponse>> {
    return instance.delete(`/chats/${chatId}/users`, {
      headers: newHeaders(),
    });
  },

  addUsers(chatId: string, users: Array<string>): Promise<Response<ChatResponse>> {
    return instance.post(
      `/chats/${chatId}/users`,
      { users },
      {
        headers: newHeaders(),
      }
    );
  },
};

export default ChatAPI;
