import '../../../styles/pages/login.scss';
import Checkbox from '../../Common/Inputs/Checkbox';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../Common/Loader/Loader';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';
import useAuth from '../../../hooks/useAuth/useAuth';
import LoginField from './LoginField/LoginField';
import PasswordField from './PasswordField/PasswordField';
import useLoginForm from './useLoginForm';

function Login() {
  const isLoading = useSelector(GetLoadingStatus);
  const formik = useLoginForm();
  useAuth();

  return (
    <div className="login page-container">
      <form onSubmit={formik.handleSubmit} className="login__form">
        <h1 className="login__title">Вход</h1>
        <LoginField formik={formik} />
        <PasswordField formik={formik} />
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
