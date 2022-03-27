import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { CreateChat } from '../../../../../store/reducers/Chat/ChatReducer';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  trimAll,
  validate,
} from '../../../../../utils/validation';

function useCreateChatForm(close: Function) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: values => {
      dispatch(CreateChat(values.name));
      formik.resetForm();
      close();
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

export default useCreateChatForm;
