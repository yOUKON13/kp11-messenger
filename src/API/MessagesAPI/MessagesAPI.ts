import instance, { newHeaders, Response } from '../base';
import { Message } from '../../types/Message';

type MessageResponse = {
  status: string;
  data: Message;
};

type MessagesResponse = {
  status: string;
  data: {
    messages: Array<Message>;
    isLastPage: boolean;
  };
};

const MessagesAPI = {
  send(content: string, chatId: string): Promise<Response<MessageResponse>> {
    return instance.post(`/chats/${chatId}/messages`, { content }, { headers: newHeaders() });
  },

  get(chatId: string, page: number): Promise<Response<MessagesResponse>> {
    return instance.get(`/chats/${chatId}/messages?p=${page}`, {
      headers: newHeaders(),
    });
  },

  getByQuery(query: string, page: number): Promise<Response<MessagesResponse>> {
    return instance.get(`/messages?q=${query}&p=${page}`, {
      headers: newHeaders(),
    });
  },
};

export default MessagesAPI;
