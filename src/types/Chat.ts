import { Profile } from './User';
import { Message } from './Message';

export type Chat = {
  _id: string;
  name: string;
  users: Array<Profile>;
  creator: string;
  avatar: string;
  lastMessage?: Message;
};
