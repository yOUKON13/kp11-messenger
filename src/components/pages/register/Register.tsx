import '../../../styles/pages/login.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Loader from '../../Common/Loader/Loader';
import { GetLoadingStatus } from '../../../store/reducers/App/AppSelector';
import useAuth from '../../../hooks/useAuth/useAuth';
import LoginField from '../login/LoginField/LoginField';
import EmailField from './EmailField/EmailField';
import PasswordField from '../login/PasswordField/PasswordField';
import PasswordConfirmField from './PasswordConfirmField/PasswordConfirmField';
import useRegisterForm from './useRegisterForm';

function Register() {
  const isLoading = useSelector(GetLoadingStatus);
  const formik = useRegisterForm();
  useAuth();

  return (
    <div className="login register page-container">
      <form onSubmit={formik.handleSubmit} className="login__form">
        <h1 className="login__title">Регистрация</h1>
        <LoginField formik={formik} />
        <EmailField formik={formik} />
        <PasswordField formik={formik} />
        <PasswordConfirmField formik={formik} />
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
