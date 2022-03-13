import Input from '../../../../Common/Inputs/Input';
import MessageWindow from '../../../../Common/MessageWindow/MessageWindow';
import React from 'react';
import { useFormik } from 'formik';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  validate,
} from '../../../../../utils/validation';
import { CreateChat as CreateChatF } from '../../../../../store/reducers/Chat/ChatReducer';
import { useDispatch } from 'react-redux';

type PropType = {
  isOpened?: boolean;
  toggleOpen: (state: boolean) => void;
};

const CreateChat: React.FC<PropType> = function ({ isOpened, toggleOpen }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => {
      dispatch(CreateChatF(values.name));
      formik.resetForm();
      close();
    },
    validate: values => {
      const error: any = {};

      error.name = validate(values.name, [
        required(),
        minLength(3),
        maxLength(32),
      ]);

      removeEmptyValidators(error);

      return error;
    },
  });

  function close() {
    formik.resetForm();
    toggleOpen(false);
  }

  return (
    <MessageWindow toggleOpen={toggleOpen} isOpened={isOpened}>
      <h3>Создать чат</h3>
      <form className="chat-create" onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          error={formik.errors.name}
          touched={formik.touched.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="Название"
        />
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

export default CreateChat;
