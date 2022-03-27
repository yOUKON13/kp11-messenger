import React from 'react';
import { server } from '../../../API/base';

type PropType = {
  setFile: any;
  file: File;
  link?: string;
  icon?: string;
};

const SetAvatar: React.FC<PropType> = function ({ link, file, setFile, icon }) {
  function setValue(event) {
    setFile(event.target.files[0]);
  }

  let image = 'assets/avatar.png';

  if (file?.path) {
    image = file.path;
  } else if (link) {
    image = `${server}${link}`;
  }

  return (
    <div className="set-avatar">
      <img className="roundy-image" src={image} alt="" />
      <label htmlFor="file-upload" className="button">
        <i className={`fa-light ${icon || 'fa-pencil'}`} />
      </label>
      <input
        id="file-upload"
        onChange={setValue}
        type="file"
        name="avatar"
        accept="image/png, image/jpeg, image/gif"
      />
    </div>
  );
};

export default SetAvatar;
