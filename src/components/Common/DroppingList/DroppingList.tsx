import React from 'react';

type PropType = {
  isShowing: boolean;
};

const DroppingList: React.FC<PropType> = function ({ children, isShowing }) {
  return (
    <div className={`${isShowing ? 'active ' : ''}dropping-list`}>
      {children}
    </div>
  );
};

export default DroppingList;
