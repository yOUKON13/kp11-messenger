import { Reducer } from 'redux';
import ActionsType from '../Types';
import { User } from '../../../types/User';
import catchAsync from '../../../../server/utils/catchAsync';
import ChatAPI from '../../../API/ChatsAPI/ChatAPI';
import { ChatActions } from '../Chat/ChatReducer';
import UsersAPI from '../../../API/UsersAPI/UsersAPI';

const SET_USER = 'Messenger/User/SET-USER';
const SET_USER_WINDOW_ACTIVE = 'Roxine/User/SET_USER_WINDOW_ACTIVE';

const initState = {
  showingUser: null as null | User,
  isUserWindowActive: true,
};
type UserStateType = typeof initState;

type Actions = ActionsType<typeof UserActions>;

const UserReducer: Reducer<UserStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, showingUser: action.payload.user };
    case SET_USER_WINDOW_ACTIVE:
      return { ...state, isUserWindowActive: action.payload.value };

    default:
      return state;
  }
};

export const UserActions = {
  setShowingUser(user: User | null) {
    return <const>{ type: SET_USER, payload: { user } };
  },
  setUserWindowActive(value: boolean) {
    return <const>{ type: SET_USER_WINDOW_ACTIVE, payload: { value } };
  },
};

export default UserReducer;
