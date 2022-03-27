import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import useTimeoutActive from '../../../Hooks/useTimeoutActive/useTimeoutActive';
import StatusMessageIcon from './StatusMessageIcon/StatusMessageIcon';
import { GetMessage } from '../../../store/reducers/App/AppSelector';
import '../../../styles/common/statusMessage.scss';

function StatusMessage() {
  const [isActive, setErrorActive] = useState(false);

  const message = useSelector(GetMessage);

  useTimeoutActive(message, message.text, setErrorActive, message.time);

  return (
    <div
      className={`${isActive ? 'active ' : ''}${
        message.isError ? 'global-error' : 'global-message'
      } global-info flex-container`}
    >
      <StatusMessageIcon isError={message.isError} />
      <p className="global-info__message">{message.text}</p>
    </div>
  );
}

export default StatusMessage;
