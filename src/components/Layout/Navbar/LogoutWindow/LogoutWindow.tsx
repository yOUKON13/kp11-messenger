import MessageWindow from '../../../Common/MessageWindow/MessageWindow';
import React from 'react';
import { Logout } from '../../../../store/reducers/Auth/AuthReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

type PropTypes = {
  isOpened: boolean;
  setOpened: (value: boolean) => void;
};

const LogoutWindow: React.FC<PropTypes> = function ({ isOpened, setOpened }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function onLogout() {
    dispatch(Logout());
    history.push('/');
  }

  function closeLogoutWindow() {
    setOpened(false);
  }

  return (
    <MessageWindow toggleOpen={setOpened} isOpened={isOpened}>
      <h3 className="flex-container">
        <i
          style={{ color: 'red', marginRight: '0.25em' }}
          className="fa-solid fa-triangle-exclamation"
        />
        Вы уверены что хотите выйти?
      </h3>
      <div className="window-buttons flex-container">
        <button
          onClick={closeLogoutWindow}
          className="invisible-button-second gray-gradient-link"
        >
          Отмена
        </button>
        <button
          onClick={onLogout}
          className="invisible-button-second gradient-text"
        >
          Выйти
        </button>
      </div>
    </MessageWindow>
  );
};

export default LogoutWindow;
