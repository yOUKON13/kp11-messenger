import { Dispatch, Reducer } from 'redux';
import { Chat } from '../../../types/Chat';
import ActionsType from '../Types';
import ChatAPI from '../../../API/ChatsAPI/ChatAPI';

const SET_CHATS = 'Messenger/Chat/SET_CHATS';
const SET_CHATS_LOADING = 'Messenger/Chat/SET_CHATS_LOADING';
const SET_CHATS_COUNT = 'Messenger/Chat/SET_CHATS_COUNT';
const SET_LAST_PAGE = 'Messenger/Chat/SET_LAST_PAGE';

const initState = {
  chats: [] as Array<Chat>,
  chatsCount: 0,
  isLoading: false,
  isLastPage: false,
};
type AppStateType = typeof initState;

type Actions = ActionsType<typeof ChatActions>;

const ChatReducer: Reducer<AppStateType, Actions> = function (
  state = initState,
  action
) {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload.value,
      };
    case SET_CHATS_COUNT:
      return {
        ...state,
        chatsCount: action.payload.value,
      };
    case SET_CHATS_LOADING:
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

export const ChatActions = {
  setChats(value: Array<Chat>) {
    return <const>{ type: SET_CHATS, payload: { value } };
  },
  setChatsCount(value: number) {
    return <const>{ type: SET_CHATS_COUNT, payload: { value } };
  },
  setChatsLoading(value: boolean) {
    return <const>{ type: SET_CHATS_LOADING, payload: { value } };
  },
  setLastPage(value: boolean) {
    return <const>{ type: SET_LAST_PAGE, payload: { value } };
  },
};

export function CreateChat(login: string) {
  return async function (dispatch: Dispatch, getState: any) {
    dispatch(ChatActions.setChatsLoading(true));

    try {
      const result = await ChatAPI.create(login);

      if (result.data.status) {
        dispatch(GetChatsF('', 0));
      }
    } catch (e) {}

    dispatch(ChatActions.setChatsLoading(false));
  };
}

export function GetChatsF(search: string, page: number) {
  return async function (dispatch: Dispatch, getState: any) {
    if (page === 0) {
      dispatch(ChatActions.setChats([]));
    }

    dispatch(ChatActions.setChatsLoading(true));

    try {
      const result = await ChatAPI.get(search, page);

      if (result.data.status) {
        dispatch(
          ChatActions.setChats([
            ...getState().chat.chats,
            ...result.data.data.chats,
          ])
        );

        dispatch(ChatActions.setLastPage(!result.data.data.chats.length));
        dispatch(ChatActions.setChatsCount(result.data.data.count));
      }
    } catch (e) {}

    dispatch(ChatActions.setChatsLoading(false));
  };
}

export default ChatReducer;
