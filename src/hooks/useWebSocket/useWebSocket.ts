import useTypingChannel from './useTypingChannel';
import useMessagesChannel from './useMessagesChannel';
import useRegisterClient from './useRegisterClient';

function useWebSocket() {
  useRegisterClient();
  useTypingChannel();
  useMessagesChannel();
}

export default useWebSocket;
