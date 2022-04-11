import { Dispatch, Reducer } from 'redux';
import { Chat } from '../../../types/Chat';
import ActionsType from '../Types';
import ChatAPI from '../../../API/ChatsAPI/ChatAPI';
import catchAsync from '../../../../server/utils/catchAsync';
import { AppActions } from '../App/AppReducer';
import { UserTyping } from '../../../types/User';
import { Message } from '../../../types/Message';
import { AddChatsDB, SetChatDB } from '../../../utils/DB/chatsDB';

const SET_CHATS = 'Messenger/Chat/SET-CHATS';
const SET_CURRENT_CHAT = 'Messenger/Chat/SET-CURRENT-CHAT';
const SET_CHATS_LOADING = 'Messenger/Chat/SET-CHATS-LOADING';
const SET_CHATS_COUNT = 'Messenger/Chat/SET-CHATS-COUNT';
const SET_LAST_PAGE = 'Messenger/Chat/SET-LAST-PAGE';
const SET_USER_TYPING = 'Messenger/ChatUser/SET-USER-TYPING';

const initState = {
  chats: [] as Array<Chat>,
  currentChat: null as null | Chat,
  chatsCount: 0,
  isLoading: false,
  isLastPage: false,
  userTyping: null as UserTyping | null,
};
type AppStateType = typeof initState;

type Actions = ActionsType<typeof ChatActions>;

const ChatReducer: Reducer<AppStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_CHATS:
      return {
        ...state,
        chats: action.payload.value,
      };
    case SET_CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.payload.value,
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
    case SET_USER_TYPING:
      return {
        ...state,
        userTyping: action.payload.user,
      };

    default:
      return state;
  }
};

export const ChatActions = {
  setChats(value: Array<Chat>) {
    return <const>{ type: SET_CHATS, payload: { value } };
  },
  setChat(value: Chat | null) {
    return <const>{ type: SET_CURRENT_CHAT, payload: { value } };
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
  setUserTyping(user: UserTyping | null) {
    return <const>{ type: SET_USER_TYPING, payload: { user } };
  },
};

export function CreateChat(name: string, users?: Array<string>) {
  return catchAsync(async dispatch => {
    dispatch(AppActions.setLoading(true));

    const result = await ChatAPI.create(name, users);

    if (result.data.status) {
      SetChatDB(result.data.data._id);
    }
  });
}

export function GetChatsF(search: string, page: number) {
  return catchAsync(
    async (dispatch, getState) => {
      if (page === 0) {
        dispatch(ChatActions.setChats([]));
      }

      dispatch(ChatActions.setChatsLoading(true));

      const result = await ChatAPI.get(search, page);

      if (result.data.status) {
        AddChatsDB(result.data.data.chats);
        dispatch(ChatActions.setChats([...getState().chat.main.chats, ...result.data.data.chats]));

        dispatch(ChatActions.setLastPage(result.data.data.isLastPage));
        dispatch(ChatActions.setChatsCount(result.data.data.count));
      }
    },
    (dispatch: any) => {
      dispatch(ChatActions.setChatsLoading(false));
    }
  );
}

export function GetChat(id: string) {
  return catchAsync(
    async (dispatch, getState) => {
      dispatch(ChatActions.setChat(null));
      dispatch(ChatActions.setUserTyping(null));
      dispatch(ChatActions.setChatsLoading(true));

      const result = await ChatAPI.getById(id);

      if (result.data.status) {
        dispatch(ChatActions.setChat(result.data.data));
      }
    },
    (dispatch: any) => {
      dispatch(ChatActions.setChatsLoading(false));
    }
  );
}

export function UpdateChat(id: string, data: any) {
  return catchAsync(async (dispatch, getState) => {
    const result = await ChatAPI.update(id, data);

    if (result.data.status) {
      dispatch(ChatActions.setChat(result.data.data));

      dispatch(
        ChatActions.setChats(
          getState().chat.main.chats.map((chat: Chat) => {
            if (chat._id === result.data.data._id) {
              return result.data.data;
            }

            return chat;
          })
        )
      );
    }
  });
}

export function SetUserTyping(userId: string, isTyping: boolean) {
  return async function (dispatch: Dispatch, getState: any) {
    dispatch(
      ChatActions.setUserTyping({
        isTyping,
        user: getState().chat.main.currentChat?.users.find(u => u._id === userId),
      })
    );
  };
}

export function UpdateChatInList(chatId: string, message: Message | null = null) {
  return async function (dispatch: Dispatch, getState: any) {
    const chat = getState().chat.main.chats.find(c => c._id === chatId);

    if (message) {
      chat.lastMessage = message;
    }

    dispatch(ChatActions.setChats([chat, ...getState().chat.main.chats.filter(c => c._id !== chatId)]));
  };
}

export default ChatReducer;
