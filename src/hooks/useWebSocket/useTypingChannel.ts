import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../store/reducers/Auth/AuthSelector';
import { GetCurrentChat } from '../../store/reducers/Chat/ChatSelector';
import { useCallback, useEffect } from 'react';
import { SetUserTyping } from '../../store/reducers/Chat/ChatReducer';
import { socket } from '../../store/store';

type TypingMessage = {
  chatId: string;
  userId: string;
  isTyping: boolean;
};

function useTypingCallback() {
  const user = useSelector(GetUser);
  const currentChat = useSelector(GetCurrentChat);
  const dispatch = useDispatch();

  return useCallback(
    (payload: TypingMessage) => {
      if (user && payload.userId !== user?._id) {
        if (currentChat?._id === payload.chatId) {
          dispatch(SetUserTyping(payload.userId, payload.isTyping));
        }
      }
    },
    [user, currentChat]
  );
}

export default function useTypingChannel() {
  const callback = useTypingCallback();

  useEffect(() => {
    socket.removeListener('typing');
    socket.on('typing', callback);
  }, [callback]);
}
