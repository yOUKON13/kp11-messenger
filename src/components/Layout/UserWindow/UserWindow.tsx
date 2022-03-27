import MessageWindow from '../../Common/MessageWindow/MessageWindow';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../../store/reducers/User/UserReducer';
import { GetShowingUser, GetUserWindowActive } from '../../../store/reducers/User/UserSelector';

function UserWindow() {
  const dispatch = useDispatch();
  const isWindowOpened = useSelector(GetUserWindowActive);
  const showingUser = useSelector(GetShowingUser);

  function toggle(value: boolean) {
    if (!value) {
      dispatch(UserActions.setShowingUser(null));
    }

    dispatch(UserActions.setUserWindowActive(value));
  }

  return (
    <MessageWindow isOpened={isWindowOpened} toggleOpen={toggle}>
      {showingUser?.group}
    </MessageWindow>
  );
}

export default UserWindow;
