import './../../../styles/login.scss';
import Input from '../../Inputs/Input';
import { Link } from 'react-router-dom';
import Password from '../../Inputs/Password';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Register as RegisterF } from '../../../store/reducers/AuthReducer';
import {
  maxLength,
  minLength,
  removeEmptyValidators,
  required,
  validate,
} from '../../../utils/validation';
import Loader from '../../Loader/Loader';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';

function Register() {
  const dispatch = useDispatch();
  const isLoading = useSelector(GetLoadingStatus);

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
      const error = {};

      error.login = validate(values.login, [
        required(),
        minLength(3),
        maxLength(32),
      ]);

      error.email = validate(values.email, [required()]);
      error.password = validate(values.password, [required()]);
      error.passwordConfirm = validate(values.passwordConfirm, [required()]);

      if (values.password !== values.passwordConfirm) {
        error.password = 'Пароли не совпадают';
      }
      removeEmptyValidators(error);

      return error;
    },
  });

  return (
    <div className="login">
      <form onSubmit={formik.handleSubmit} className="login__form">
        <h1 className="login__title">Регистрация</h1>
        <Input
          name="login"
          error={formik.errors.login}
          onChange={formik.handleChange}
          value={formik.values.login}
          placeholder="Логин"
        >
          <span className="material-icons">person</span>
        </Input>
        <Input
          name="email"
          error={formik.errors.email}
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Почта"
          inputType="email"
        >
          <span className="material-icons">email</span>
        </Input>
        <Password
          error={formik.errors.password}
          onChange={formik.handleChange}
          value={formik.values.password}
        >
          <span className="material-icons">lock</span>
        </Password>
        <Input
          name="passwordConfirm"
          error={formik.errors.passwordConfirm}
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          placeholder="Подтверждение пароля"
          inputType="password"
        >
          <span className="material-icons">lock</span>
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
