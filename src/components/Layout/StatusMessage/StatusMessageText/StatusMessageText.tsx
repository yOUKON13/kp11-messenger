import React from 'react';

type PropsType = {
  text: string;
  title: string;
};

const StatusMessageText: React.FC<PropsType> = function ({ title, text }) {
  return (
    <div className="global-info__info">
      {title && <h4>{title}</h4>}
      <p className="global-info__message">{text}</p>
    </div>
  );
};

export default StatusMessageText;
