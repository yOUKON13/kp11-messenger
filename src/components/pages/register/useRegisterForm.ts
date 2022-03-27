import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Register as RegisterF } from '../../../store/reducers/Auth/AuthReducer';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  trimAll,
  validate,
} from '../../../utils/validation';

function useRegisterForm() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      passwordConfirm: '',
      email: '',
    },
    onSubmit: values => {
      dispatch(RegisterF(values));
      formik.resetForm();
    },
    validate: values => {
      trimAll(values);
      const error: any = {};

      error.login = validate(values.login, [
        required(),
        minLength(3),
        maxLength(32),
      ]);

      error.email = validate(values.email, [required()]);
      error.password = validate(values.password, [required(), minLength(6)]);
      error.passwordConfirm = validate(values.passwordConfirm, [required()]);

      if (values.password !== values.passwordConfirm) {
        error.passwordConfirm = 'Пароли не совпадают';
      }
      removeEmptyValidators(error);

      return error;
    },
  });

  return formik;
}

export default useRegisterForm;
