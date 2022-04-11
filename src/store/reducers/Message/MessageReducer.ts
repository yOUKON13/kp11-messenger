import { Reducer } from 'redux';
import ActionsType from '../Types';
import catchAsync from '../../../../server/utils/catchAsync';
import { Message } from '../../../types/Message';
import MessagesAPI from '../../../API/MessagesAPI/MessagesAPI';
import ChatAPI from '../../../API/ChatsAPI/ChatAPI';
import { AddChatsDB } from '../../../utils/DB/chatsDB';
import { ChatActions } from '../Chat/ChatReducer';

const SET_MESSAGES = 'Messenger/Messages/SET-MESSAGES';
const SET_LOADING_STATUS = 'Messenger/Messages/SET-LOADING-STATUS';
const SET_LAST_PAGE = 'Messenger/Messages/SET-LAST-PAGE';

const initState = {
  messages: [] as Array<Message>,
  isLoading: false,
  isLastPage: false,
};
type AppStateType = typeof initState;

type Actions = ActionsType<typeof MessagesActions>;

const MessagesReducer: Reducer<AppStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case SET_LOADING_STATUS:
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

export const MessagesActions = {
  setMessages(messages: Array<Message>) {
    return <const>{ type: SET_MESSAGES, payload: { messages } };
  },
  setLoadingStatus(value: boolean) {
    return <const>{ type: SET_LOADING_STATUS, payload: { value } };
  },
  setLastPage(value: boolean) {
    return <const>{ type: SET_LAST_PAGE, payload: { value } };
  },
};

export function GetMessagesByQuery(query: string, page: number) {
  return catchAsync(
    async (dispatch, getState) => {
      if (page === 0) {
        dispatch(MessagesActions.setMessages([]));
      }
      dispatch(MessagesActions.setLoadingStatus(true));

      const result = await MessagesAPI.getByQuery(query, page);

      if (result.data.status) {
        dispatch(MessagesActions.setMessages([...getState().message.messages, ...result.data.data.messages]));
        dispatch(MessagesActions.setLastPage(result.data.data.isLastPage));
      }
    },
    (dispatch: any) => {
      dispatch(MessagesActions.setLoadingStatus(false));
    }
  );
}

export default MessagesReducer;
