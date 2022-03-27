import React from 'react';

type PropsType = {
  onClick: (value: boolean) => void;
};

  return (
    <button
      onClick={() => {
        onClick(false);
      }}
      className="invisible-button global-info__close"
    >
      <span className="material-icons">close</span>
    </button>
  );
};

export default StatusMessageCloseButton;
