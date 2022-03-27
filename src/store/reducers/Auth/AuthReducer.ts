import { LoginUser, Profile, RegisterUser, UpdateProfile, User } from '../../../types/User';
import UsersAPI from '../../../API/UsersAPI/UsersAPI';
import { Dispatch, Reducer } from 'redux';
import ActionsType from '../Types';
import { AppActions, CreateMessage } from '../App/AppReducer';
import catchAsync from '../../../../server/utils/catchAsync';

const SET_USER = 'Messenger/Auth/SET-USER';

const initState = {
  user: null as User | null,
};
type AuthStateType = typeof initState;

type Actions = ActionsType<typeof AuthActions>;

const AuthReducer: Reducer<AuthStateType, Actions> = function (state = initState, action) {
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
  return catchAsync(async (dispatch, getState) => {
    dispatch(AppActions.setLoading(true));

    const result = await UsersAPI.login(formValues);
    if (result.data.status) {
      localStorage.setItem('token', result.data.data.token);
      dispatch(AuthActions.setUser(result.data.data));
    }
  });
}

export function Register(formValues: RegisterUser) {
  return catchAsync(async (dispatch, getState) => {
    dispatch(AppActions.setLoading(true));

    const result = await UsersAPI.register(formValues);
    if (result.data.status) {
      localStorage.setItem('token', result.data.data.token);
      dispatch(AuthActions.setUser(result.data.data));
    }
  });
}

export function Auth() {
  return async (dispatch: Dispatch) => {
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
  return catchAsync(async (dispatch, getState) => {
    dispatch(AppActions.setLoading(true));

    const result = await UsersAPI.createProfile(values);
    if (result.data.status) {
      dispatch(AuthActions.setUser(result.data.data));
    }
  });
}

export function UpdateProfileF(values: UpdateProfile) {
  return catchAsync(async (dispatch, getState) => {
    dispatch(AppActions.setLoading(true));

    const result = await UsersAPI.updateProfile(values);
    if (result.data.status) {
      dispatch(AuthActions.setUser(result.data.data));

      if (result.data.data.token) {
        localStorage.setItem('token', result.data.data.token);
      }
      dispatch(CreateMessage('Профиль успешно обновлен!', false));
    }
  });
}

export function Logout() {
  return async function (dispatch: Dispatch) {
    dispatch(AuthActions.setUser(null));
    localStorage.removeItem('token');
  };
}

export default AuthReducer;
