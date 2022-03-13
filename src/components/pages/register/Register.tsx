import '../../../styles/pages/login.scss';
import Input from '../../Common/Inputs/Input';
import { Link } from 'react-router-dom';
import Password from '../../Common/Inputs/Password';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Register as RegisterF } from '../../../store/reducers/Auth/AuthReducer';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  validate,
} from '../../../utils/validation';
import Loader from '../../Common/Loader/Loader';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';
import useAuth from '../../../hooks/useAuth';

function Register() {
  const dispatch = useDispatch();
  const isLoading = useSelector(GetLoadingStatus);
  useAuth();

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

  return (
    <div className="login register page-container">
      <form onSubmit={formik.handleSubmit} className="login__form">
        <h1 className="login__title">Регистрация</h1>
        <Input
          name="login"
          error={formik.errors.login}
          touched={formik.touched.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
          placeholder="Логин"
        >
          <i className="fa-solid fa-user" />
        </Input>
        <Input
          name="email"
          error={formik.errors.email}
          touched={formik.touched.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Почта"
          inputType="email"
        >
          <i className="fa-solid fa-envelope" />
        </Input>
        <Password
          error={formik.errors.password}
          touched={formik.touched.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        >
          <i className="fa-solid fa-lock" />
        </Password>
        <Input
          name="passwordConfirm"
          error={formik.errors.passwordConfirm}
          touched={formik.touched.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirm}
          placeholder="Подтверждение пароля"
          inputType="password"
        >
          <i className="fa-solid fa-lock" />
        </Input>
        <div className="flex-container login__submit">
          <button type="submit">Регистрация</button>
        </div>
        <div className="flex-container login__register">
          <p>
            Есть аккаунт?<Link to="/login">Войти</Link>
          </p>
        </div>
      </form>
      {isLoading && <Loader />}
    </div>
  );
}

export default Register;
