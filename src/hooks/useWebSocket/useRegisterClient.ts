import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetUser } from '../../store/reducers/Auth/AuthSelector';
import { socket } from '../../store/store';

export default function useRegisterClient() {
  const user = useSelector(GetUser);
  const [isConnected, setConnected] = useState(false);
  let interval;

  useEffect(() => {
    socket.connect();

    socket.on('disconnect', () => {
      setConnected(false);
      interval = setInterval(() => {
        socket.connect();
      }, 1000);
    });

    socket.on('connect', () => {
      clearInterval(interval);
      setConnected(true);
    });
  }, []);

  useEffect(() => {
    if (user && isConnected) {
      socket.emit('registerClient', user._id);
    }
  }, [user, isConnected]);
}
