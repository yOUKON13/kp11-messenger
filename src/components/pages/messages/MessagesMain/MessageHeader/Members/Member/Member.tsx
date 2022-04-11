import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetUser } from '../../../../../../../store/reducers/Auth/AuthSelector';
import { GetCurrentChat } from '../../../../../../../store/reducers/Chat/ChatSelector';
import { RemoveUserFromChat } from '../../../../../../../store/reducers/Chat/ChatUser/ChatUserReducer';
import { server } from '../../../../../../../API/base';
import { UserActions } from '../../../../../../../store/reducers/User/UserReducer';

type PropType = {
  creatorId: string;
  id: string;
  name: string;
  surname: string;
  avatar: string;
  group: string;
};

const Member: React.FC<PropType> = function ({ creatorId, name, id, surname, avatar, group }) {
  const currentUser = useSelector(GetUser);
  const currentChat = useSelector(GetCurrentChat);
  const dispatch = useDispatch();

  function onClick() {
    dispatch(RemoveUserFromChat(currentChat?._id || '', id));
  }

  function onMemberClick() {
    dispatch(UserActions.setUserWindowActive(true));
    dispatch(UserActions.setShowingUser({ _id: id, name, surname, avatar, group } as any));
  }

  return (
    <div className="flex-container user">
      <button onClick={onMemberClick} className="invisible-button">
        <img className="roundy-image" src={avatar ? `${server}${avatar}` : 'assets/avatar.png'} alt="" />
      </button>
      <div>
        <button onClick={onMemberClick} className="invisible-button">
          <p className="text-overflow">{`${name}${surname ? ` ${surname}` : ''}`}</p>
        </button>
        {creatorId === id && <p className="user__creator">Создатель</p>}
      </div>
      {creatorId === id && <i className="fa-solid fa-star" />}
      {currentUser?._id !== id && currentUser?._id === creatorId && (
        <button onClick={onClick} className="invisible-button user__remove">
          <i className="fa-solid fa-circle-xmark" />
        </button>
      )}
    </div>
  );
};

export default Member;
