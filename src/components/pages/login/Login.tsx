import '../../../styles/pages/login.scss';
import Input from '../../Common/Inputs/Input';
import Checkbox from '../../Common/Inputs/Checkbox';
import { Link, useHistory } from 'react-router-dom';
import Password from '../../Common/Inputs/Password';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Login as LoginF } from '../../../store/reducers/Auth/AuthReducer';
import Loader from '../../Common/Loader/Loader';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  validate,
} from '../../../utils/validation';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';
import useAuth from '../../../hooks/useAuth';

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector(GetLoadingStatus);
  useAuth();

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate: values => {
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

  return (
    <div className="login page-container">
      <form onSubmit={formik.handleSubmit} className="login__form">
        <h1 className="login__title">Вход</h1>
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
        <Password
          error={formik.errors.password}
          touched={formik.touched.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        >
          <i className="fa-solid fa-lock" />
        </Password>
        <div className="flex-container login__actions">
          <Checkbox label="Запомнить" />
        </div>
        <div className="flex-container login__submit">
          <button type="submit">Войти</button>
        </div>
        <div className="flex-container login__register">
          <p>
            Нет аккаунта?<Link to="/register">Регистрация</Link>
          </p>
        </div>
      </form>
      {isLoading && <Loader />}
    </div>
  );
}

export default Login;
