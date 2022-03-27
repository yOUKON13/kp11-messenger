import { User } from './User';
import { Chat } from './Chat';

export type Message = {
  _id: string;
  sender: User;
  content: string;
  sendAt: Date;
  chat: string;
  isSystem: boolean;
  action?: string;
  target?: string;
};
