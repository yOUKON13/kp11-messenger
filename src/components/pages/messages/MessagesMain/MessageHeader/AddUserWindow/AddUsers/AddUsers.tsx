import React from 'react';
import { useSelector } from 'react-redux';
import {
  GetAddUsers,
  GetAddUsersLoading,
} from '../../../../../../../store/reducers/Chat/ChatUser/ChatUserSelector';
import Loader from '../../../../../../Common/Loader/Loader';
import AddUser from './AddUser';
import { GetCurrentChat } from '../../../../../../../store/reducers/Chat/ChatSelector';

type PropType = {
  scrollable: any;
  selectedUsers: Array<string>;
  setSelectedUsers: Function;
};

const AddUsers: React.FC<PropType> = function ({
  scrollable,
  selectedUsers,
  setSelectedUsers,
}) {
  const users = useSelector(GetAddUsers);
  const currentChat = useSelector(GetCurrentChat);
  const usersLoading = useSelector(GetAddUsersLoading);

  const usersInChat = currentChat?.users.map(user => user._id);

  return (
    <div className="chat-create__users" ref={scrollable}>
      {usersLoading ? (
        <Loader />
      ) : (
        users
          .filter(userId => !usersInChat?.includes(userId._id))
          .map(user => (
            <AddUser
              selectedUsers={selectedUsers}
              selectUsers={setSelectedUsers}
              key={user._id}
              id={user._id}
              name={user.name}
              surname={user.surname}
              avatar={user.avatar}
            />
          ))
      )}
    </div>
  );
};

export default AddUsers;
