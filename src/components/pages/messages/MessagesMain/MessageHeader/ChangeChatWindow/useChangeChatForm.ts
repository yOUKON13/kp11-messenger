import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  trimAll,
  validate,
} from '../../../../../../utils/validation';
import { UpdateChat } from '../../../../../../store/reducers/Chat/ChatReducer';
import { makeFormData } from '../../../../../../utils/formData';

function useChangeChatForm(
  chatId: string,
  chatName: string,
  file: File,
  close: Function
) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => {
      if (chatName !== values.name || file) {
        const formData = makeFormData(values);

        if (file && file.name) {
          formData.append('avatar', file, file.name);
        }

        dispatch(UpdateChat(chatId, formData));
        formik.resetForm();
        close();
      }
    },
    validate: values => {
      trimAll(values);
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

  return formik;
}

export default useChangeChatForm;
