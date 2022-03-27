import { useSelector } from 'react-redux';
import { GetUser } from '../../store/reducers/Auth/AuthSelector';
import { useHistory } from 'react-router-dom';

function useAuth() {
  const user = useSelector(GetUser);
  const history = useHistory();

  if (user) {
    if (user.name) {
      history.push('/main');
    } else if (history.location.pathname !== '/set-profile') {
      history.push('/set-profile');
    }
  }
}

export default useAuth;
