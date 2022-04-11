import MessageWindow from '../../Common/MessageWindow/MessageWindow';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../../../store/reducers/User/UserReducer';
import { GetShowingUser, GetUserWindowActive } from '../../../store/reducers/User/UserSelector';
import { server } from '../../../API/base';
import '../../../styles/common/showing-user.scss';
import { CreateChat } from '../../../store/reducers/Chat/ChatReducer';
import Loader from '../../Common/Loader/Loader';

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

  function onChatCreate() {
    dispatch(CreateChat('Новый чат', [showingUser?._id || '']));
    dispatch(UserActions.setUserWindowActive(false));
  }

  return (
    <MessageWindow isOpened={isWindowOpened} toggleOpen={toggle}>
      {showingUser ? (
        <div className="showing-user">
          <div className="flex-container showing-user__info">
            <img
              className="showing-user__avatar"
              src={showingUser?.avatar ? `${server}${showingUser?.avatar}` : 'assets/avatar.png'}
              alt=""
            />
            <p className="text-overflow">{showingUser?.name + ' ' + showingUser?.surname}</p>
          </div>

          <div className="showing-user__block block flex-container">
            <i className="fa-regular fa-user-group" />
            <p>{showingUser?.group}</p>
          </div>
          <button onClick={onChatCreate} className="gray-button">
            Создать беседу
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </MessageWindow>
  );
}

export default UserWindow;
