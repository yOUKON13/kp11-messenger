import { LoginUser, Profile, RegisterUser, User } from '../../../types/User';
import UsersAPI from '../../../API/UsersAPI/UsersAPI';
import { Dispatch, Reducer } from 'redux';
import ActionsType from '../Types';
import { AppActions } from '../App/AppReducer';
import { useHistory } from 'react-router-dom';

const SET_USER = 'Messenger/Auth/SET_USER';

const initState = {
  user: null as User | null,
};
type AuthStateType = typeof initState;

type Actions = ActionsType<typeof AuthActions>;

const AuthReducer: Reducer<AuthStateType, Actions> = function (
  state = initState,
  action
) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export const AuthActions = {
  setUser(user: User | null) {
    return <const>{ type: SET_USER, payload: { user } };
  },
};

export function Login(formValues: LoginUser) {
  return async function (dispatch: Dispatch) {
    dispatch(AppActions.setLoading(true));

    try {
      const result = await UsersAPI.login(formValues);
      if (result.data.status) {
        localStorage.setItem('token', result.data.data.token);
        dispatch(AuthActions.setUser(result.data.data));
      }
    } catch (e) {}

    dispatch(AppActions.setLoading(false));
  };
}

export function Register(formValues: RegisterUser) {
  return async function (dispatch: Dispatch) {
    dispatch(AppActions.setLoading(true));
    try {
      const result = await UsersAPI.register(formValues);
      if (result.data.status) {
        localStorage.setItem('token', result.data.data.token);
        dispatch(AuthActions.setUser(result.data.data));
      }
    } catch (e) {}

    dispatch(AppActions.setLoading(false));
  };
}

export function Auth() {
  return async function (dispatch: Dispatch) {
    dispatch(AppActions.setLoading(true));
    try {
      const result = await UsersAPI.auth();
      if (result.data.status) {
        dispatch(AuthActions.setUser(result.data.data));
      }
    } catch (e) {}
    dispatch(AppActions.setLoading(false));
  };
}

export function CreateProfile(values: Profile) {
  return async function (dispatch: Dispatch) {
    dispatch(AppActions.setLoading(true));

    try {
      const result = await UsersAPI.createProfile(values);
      if (result.data.status) {
        dispatch(AuthActions.setUser(result.data.data));
      }
    } catch (e) {}

    dispatch(AppActions.setLoading(false));
  };
}

export function Logout() {
  return async function (dispatch: Dispatch) {
    dispatch(AuthActions.setUser(null));
    localStorage.removeItem('token');
  };
}

export default AuthReducer;
