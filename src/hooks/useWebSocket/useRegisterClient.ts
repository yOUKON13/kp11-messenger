import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetUser } from '../../store/reducers/Auth/AuthSelector';
import { socket } from '../../store/store';

export default function useRegisterClient() {
  const user = useSelector(GetUser);

  useEffect(() => {
    if (user) {
      socket.emit('registerClient', user._id);
    }
  }, [user]);
}
