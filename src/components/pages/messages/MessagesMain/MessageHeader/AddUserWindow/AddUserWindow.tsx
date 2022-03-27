import MessageWindow from '../../../../../Common/MessageWindow/MessageWindow';
import Input from '../../../../../Common/Inputs/Input';
import React, { useEffect, useRef, useState } from 'react';
import useAddUserForm from './useAddUserForm';
import useSearch from '../../../../../../hooks/useSearch/useSearch';
import useInfiniteScroll from '../../../../../../hooks/useInfiniteScroll/useInfiniteScroll';
import { useDispatch, useSelector } from 'react-redux';
import {
  ChatUserActions,
  GetUsersForChat,
} from '../../../../../../store/reducers/Chat/ChatUser/ChatUserReducer';
import { trimAll } from '../../../../../../utils/validation';
import AddUsers from './AddUsers/AddUsers';
import {
  GetAddUsersLastPage,
  GetAddUsersLoading,
} from '../../../../../../store/reducers/Chat/ChatUser/ChatUserSelector';

type PropType = {
  chatId: string;
  isOpened?: boolean;
  toggleOpen: (state: boolean) => void;
};

const AddUserWindow: React.FC<PropType> = function ({
  isOpened,
  toggleOpen,
  chatId,
}) {
  const [usersId, setUsersId] = useState([]);
  const isLoading = useSelector(GetAddUsersLoading);
  const isLastPage = useSelector(GetAddUsersLastPage);
  const dispatch = useDispatch();

  function close() {
    formik.resetForm();
    toggleOpen(false);
  }

  const formik = useAddUserForm(chatId, usersId, close, () => {
    setUsersId([]);
    dispatch(ChatUserActions.setUsers([]));
  });

  const scrollable = useRef();
  const [page, setPage, onDataGet] = useInfiniteScroll(
    scrollable.current,
    isLoading,
    () => {
      dispatch(GetUsersForChat(formik.values.name, page + 1));
    },
    isLastPage
  );

  const [onKeyUp, onKeyDown] = useSearch(() => {
    window.removeEventListener('scroll', onDataGet);
    setPage(0);

    const obj = { name: formik.values.name };
    trimAll(obj);

    if (obj.name) {
      dispatch(GetUsersForChat(obj.name, 0));
    }
  });

  return (
    <MessageWindow toggleOpen={toggleOpen} isOpened={isOpened}>
      <h3>Добавить участников</h3>
      <form className="chat-create" onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          error={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Имя"
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
        >
          <i className="fa-solid fa-magnifying-glass" />
        </Input>
        <AddUsers
          selectedUsers={usersId}
          setSelectedUsers={setUsersId}
          scrollable={scrollable}
        />
        <div className="window-buttons flex-container">
          <button
            type="button"
            onClick={close}
            className="invisible-button-second gray-gradient-link"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="invisible-button-second gradient-text"
          >
            Добавить
          </button>
        </div>
      </form>
    </MessageWindow>
  );
};

export default AddUserWindow;
