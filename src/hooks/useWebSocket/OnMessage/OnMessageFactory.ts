import OnMessageChatActive from './OnMessageChatActive';
import OnMessageChatNotActive from './OnMessageChatNotActive';

export default class OnMessageFactory {
  public static Create(isChatActive: boolean) {
    return isChatActive ? OnMessageChatActive : OnMessageChatNotActive;
  }
}
