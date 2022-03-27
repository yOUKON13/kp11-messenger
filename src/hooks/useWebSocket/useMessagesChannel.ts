import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../store/reducers/Auth/AuthSelector';
import { GetSounds } from '../../store/reducers/Settings/SettingsSelector';
import { GetCurrentChat } from '../../store/reducers/Chat/ChatSelector';
import { useCallback, useEffect, useState } from 'react';
import { Message } from '../../types/Message';
import OnMessageFactory from './OnMessage/OnMessageFactory';
import { UpdateChatInList } from '../../store/reducers/Chat/ChatReducer';
import { socket } from '../../store/store';
import { useHistory } from 'react-router-dom';

function useMessageCallback() {
  const [isWindowActive, setWindowActive] = useState(true);
  const user = useSelector(GetUser);
  const sounds = useSelector(GetSounds);
  const currentChat = useSelector(GetCurrentChat);
  const dispatch = useDispatch();
  const history = useHistory();

  const notification = new Audio('assets/notification.mp3');

  window.Main.on('focus', (value: boolean) => {
    setWindowActive(value);
  });

  return useCallback(
    (payload: Message) => {
      const chatActive = currentChat?._id === payload.chat;

      OnMessageFactory.Create(chatActive)(dispatch, currentChat!, payload, user!, history);

      if (sounds && (!isWindowActive || !chatActive)) {
        notification.play();
      }

      dispatch(UpdateChatInList(payload.chat, payload));
    },
    [user, currentChat, sounds, isWindowActive, history]
  );
}

export default function useMessagesChannel() {
  const callback = useMessageCallback();

  useEffect(() => {
    socket.removeListener('message');
    socket.on('message', callback);
  }, [callback]);
}
