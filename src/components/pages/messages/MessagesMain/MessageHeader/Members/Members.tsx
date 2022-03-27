import { Profile } from '../../../../../../types/User';
import Member from './Member/Member';
import React from 'react';

type PropType = {
  members: Array<Profile>;
  creatorId: string;
  isActive: boolean;
};

const Members: React.FC<PropType> = function ({ creatorId, members, isActive }) {
  return (
    <div className={`${isActive ? 'active ' : ''}members`}>
      {members.map(member => (
        <Member
          surname={member.surname}
          id={member._id}
          key={member._id}
          name={member.name}
          avatar={member.avatar}
          group={member.group}
          creatorId={creatorId}
        />
      ))}
    </div>
  );
};

export default Members;
