import { server } from '../../../../../../API/base';
import React from 'react';

type PropType = {
  attachment: string;
};

const FileAttachment: React.FC<PropType> = function ({ attachment }) {
  return (
    <div className={`flex-container message__attachment image-attachment`}>
      <img src={`${server}${attachment}`} alt="" />
    </div>
  );
};

export default FileAttachment;
