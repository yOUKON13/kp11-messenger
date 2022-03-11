import { LoginUser, RegisterUser } from '../../types/User';
import UsersAPI from '../../API/UsersAPI/UsersAPI';
import { AppActions } from './App/AppReducer';
import { Dispatch } from 'redux';

export function Login(formValues: LoginUser) {
  return async function (dispatch: Dispatch) {
    try {
      dispatch(AppActions.setLoading(true));
      const result = await UsersAPI.login(formValues);
      if (result.data.status) {
        localStorage.setItem('token', result.data.data.token);
      }
    } catch (e) {}

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
    dispatch(AppActions.setLoading(false));
  };
}

export function Register(formValues: RegisterUser) {
  return async function (dispatch: Dispatch) {
    dispatch(AppActions.setLoading(true));
    try {
      dispatch(AppActions.setLoading(true));
      const result = await UsersAPI.register(formValues);
      if (result.data.status) {
        localStorage.setItem('token', result.data.data.token);
      }
    } catch (e) {}

    dispatch(AppActions.setLoading(false));
  };
}
