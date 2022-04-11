import useTypingChannel from './useTypingChannel';
import useMessagesChannel from './useMessagesChannel';
import useRegisterClient from './useRegisterClient';
import { socket } from '../../store/store';

function useWebSocket() {
  useRegisterClient();
  useTypingChannel();
  useMessagesChannel();
}

export default useWebSocket;
