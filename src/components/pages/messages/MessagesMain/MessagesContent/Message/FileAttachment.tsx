import { server } from '../../../../../../API/base';
import React from 'react';

type PropType = {
  attachment: string;
};

const FileAttachment: React.FC<PropType> = function ({ attachment }) {
  const pathParts = attachment.split('\\');
  const file = pathParts[pathParts.length - 1];

  return (
    <div className={`flex-container message__attachment file-attachment`}>
      <i className="fa-solid fa-file" />
      <a href={`${server}${attachment}`} download>
        <p className="gradient-text">{file}</p>
      </a>
    </div>
  );
};

export default FileAttachment;
