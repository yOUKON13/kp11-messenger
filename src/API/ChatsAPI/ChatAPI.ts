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
    count: number;
  };
};

const ChatAPI = {
  create(name: string): Promise<Response<ChatResponse>> {
    return instance.post('/chats', { name }, { headers: newHeaders() });
  },

  get(search: string, page: number): Promise<Response<ChatsResponse>> {
    return instance.get(`/chats?q=${search}&p=${page}`, {
      headers: newHeaders(),
    });
  },
};

export default ChatAPI;
