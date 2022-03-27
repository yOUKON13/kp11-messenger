import React, { useState } from 'react';
import Checkbox from '../../../../../../Common/Inputs/Checkbox';
import { server } from '../../../../../../../API/base';

type PropTypes = {
  id: string;
  name: string;
  surname: string;
  selectedUsers: Array<string>;
  selectUsers: Function;
  avatar: string;
};

const AddUser: React.FC<PropTypes> = function ({
  id,
  name,
  surname,
  selectedUsers,
  selectUsers,
  avatar,
}) {
  const [isSelected, setSelected] = useState(
    !!selectedUsers.find(userId => userId === id)?.length || false
  );

  function select() {
    if (isSelected) {
      selectUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      selectUsers([...selectedUsers, id]);
    }

    setSelected(!isSelected);
  }

  return (
    <div
      onClick={select}
      className={`${
        isSelected ? 'active ' : ''
      }flex-container user user-to-add`}
    >
      <img
        className="roundy-image"
        src={avatar ? `${server}${avatar}` : 'assets/avatar.png'}
        alt=""
      />
      <p className="text-overflow">{`${name}${
        surname ? ` ${surname}` : ''
      }`}</p>
      <Checkbox isChecked={isSelected} setChecked={setSelected} />
    </div>
  );
};

export default AddUser;
