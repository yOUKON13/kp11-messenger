import catchAsync from '../../../../../server/utils/catchAsync';
import ChatAPI from '../../../../API/ChatsAPI/ChatAPI';
import { ChatActions } from '../ChatReducer';
import { User } from '../../../../types/User';
import ActionsType from '../../Types';
import { Reducer } from 'redux';
import UsersAPI from '../../../../API/UsersAPI/UsersAPI';

const SET_USERS = 'Messenger/ChatUser/SET-USERS';
const SET_LOADING = 'Messenger/ChatUser/SET-LOADING';
const SET_LAST_PAGE = 'Messenger/ChatUser/SET-LAST-PAGE';

const initState = {
  users: [] as Array<User>,
  isLoading: false,
  isLastPage: false,
};
type ChatUserStateType = typeof initState;

type Actions = ActionsType<typeof ChatUserActions>;

const ChatUserReducer: Reducer<ChatUserStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.value,
      };
    case SET_LAST_PAGE:
      return {
        ...state,
        isLastPage: action.payload.value,
      };
    default:
      return state;
  }
};

export const ChatUserActions = {
  setUsers(users: Array<User>) {
    return <const>{ type: SET_USERS, payload: { users } };
  },
  setLoading(value: boolean) {
    return <const>{ type: SET_LOADING, payload: { value } };
  },
  setLastPage(value: boolean) {
    return <const>{ type: SET_LAST_PAGE, payload: { value } };
  },
};

export function RemoveUserFromChat(chatId: string, userId: string) {
  return catchAsync(async (dispatch, getState) => {
    const result = await ChatAPI.removeUser(chatId, userId);

    if (result.data.status) {
      dispatch(ChatActions.setChat(result.data.data));
    }
  });
}

export function LeaveFromChatF(chatId: string) {
  return catchAsync(async (dispatch, getState) => {
    await ChatAPI.leave(chatId);
  });
}

export function AddUsersToChat(chatId: string, users: Array<string>) {
  return catchAsync(async (dispatch, getState) => {
    const result = await ChatAPI.addUsers(chatId, users);

    if (result.data.status) {
      dispatch(ChatActions.setChat(result.data.data));
    }
  });
}

export function GetUsersForChat(name: string, page: number) {
  return catchAsync(
    async (dispatch, getState) => {
      if (page === 0) {
        dispatch(ChatUserActions.setUsers([]));
      }

      dispatch(ChatUserActions.setLoading(true));
      const result = await UsersAPI.getByName(name, page);

      if (result.data.status) {
        dispatch(ChatUserActions.setUsers([...getState().chat.user.users, ...result.data.data.users]));
        dispatch(ChatUserActions.setLastPage(result.data.data.isLastPage));
      }
    },
    (dispatch: any) => {
      dispatch(ChatUserActions.setLoading(false));
    }
  );
}

export default ChatUserReducer;
