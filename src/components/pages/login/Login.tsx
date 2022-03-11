import './../../../styles/login.scss';
import Input from '../../Inputs/Input';
import Checkbox from '../../Inputs/Checkbox';
import { Link } from 'react-router-dom';
import Password from '../../Inputs/Password';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Login as LoginF } from '../../../store/reducers/AuthReducer';
import Loader from '../../Loader/Loader';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  validate,
} from '../../../utils/validation';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector(GetLoadingStatus);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    validate: values => {
      const error = {};

      error.login = validate(values.login, [
        required(),
        minLength(3),
        maxLength(32),
      ]);
      error.password = validate(values.password, [required()]);
      removeEmptyValidators(error);
      return error;
    },
    onSubmit: values => {
      dispatch(LoginF(values));
      formik.resetForm();
    },
  });

  return (
    <div className="login">
      <form onSubmit={formik.handleSubmit} className="login__form">
        <h1 className="login__title">Вход</h1>
        <Input
          name="login"
          error={formik.errors.login}
          onChange={formik.handleChange}
          value={formik.values.login}
          placeholder="Логин"
        >
          <span className="material-icons">person</span>
        </Input>
        <Password
          error={formik.errors.password}
          onChange={formik.handleChange}
          value={formik.values.password}
        >
          <span className="material-icons">lock</span>
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
