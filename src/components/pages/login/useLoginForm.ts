import { useFormik } from 'formik';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  trimAll,
  validate,
} from '../../../utils/validation';
import { Login as LoginF } from '../../../store/reducers/Auth/AuthReducer';
import { useDispatch } from 'react-redux';

function useLoginForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate: values => {
      trimAll(values);
      const error: any = {};

      error.login = validate(values.login, [
        required(),
        minLength(3),
        maxLength(32),
      ]);
      error.password = validate(values.password, [required(), minLength(6)]);
      removeEmptyValidators(error);
      return error;
    },
    onSubmit: values => {
      dispatch(LoginF(values));
      formik.resetForm();
    },
  });

  return formik;
}

export default useLoginForm;
