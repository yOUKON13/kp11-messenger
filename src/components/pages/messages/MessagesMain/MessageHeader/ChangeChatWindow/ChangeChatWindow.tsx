import MessageWindow from '../../../../../Common/MessageWindow/MessageWindow';
import Input from '../../../../../Common/Inputs/Input';
import React, { useEffect, useState } from 'react';
import useChangeChatForm from './useChangeChatForm';
import SetAvatar from '../../../../../Common/Inputs/SetAvatar';

type PropType = {
  chatId: string;
  isOpened?: boolean;
  toggleOpen: (state: boolean) => void;
  name: string;
  avatar: string;
};

const ChangeChatWindow: React.FC<PropType> = function ({
  isOpened,
  toggleOpen,
  name,
  chatId,
  avatar,
}) {
  function close() {
    formik.resetForm();
    toggleOpen(false);
  }

  const [file, setFile] = useState();
  const formik = useChangeChatForm(chatId, name, file!, close);

  useEffect(() => {
    formik.setFieldValue('name', name);
  }, [isOpened]);

  return (
    <MessageWindow toggleOpen={toggleOpen} isOpened={isOpened}>
      <form className="chat-create" onSubmit={formik.handleSubmit}>
        <div className="chat-create__fields flex-container">
          <div className="chat-create__avatar flex-container">
            <SetAvatar
              setFile={setFile}
              file={file!}
              link={avatar}
              icon="fa-camera"
            />
          </div>
          <Input
            name="name"
            error={formik.errors.name}
            touched={formik.touched.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Название"
          />
        </div>
        <div className="window-buttons flex-container">
          <button
            type="button"
            onClick={close}
            className="invisible-button-second gray-gradient-link"
          >
            Отмена
          </button>
          <button
            type="submit"
            className="invisible-button-second gradient-text"
          >
            Готово
          </button>
        </div>
      </form>
    </MessageWindow>
  );
};

export default ChangeChatWindow;
