import React from 'react';

type PropsType = {
  isError: boolean;
};

const StatusMessageIcon: React.FC<PropsType> = function ({ isError }) {
  return (
    <div className="global-info__icon flex-container">
      {isError ? (
        <i className="fa-solid fa-circle-xmark" />
      ) : (
        <i className="fa-regular fa-circle-check" />
      )}
    </div>
  );
};

export default StatusMessageIcon;
