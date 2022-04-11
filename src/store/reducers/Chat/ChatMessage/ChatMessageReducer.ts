import catchAsync from '../../../../../server/utils/catchAsync';
import ActionsType from '../../Types';
import { Dispatch, Reducer } from 'redux';
import { Message } from '../../../../types/Message';
import MessagesAPI from '../../../../API/MessagesAPI/MessagesAPI';
import { socket } from '../../../store';
import { ChatActions } from '../ChatReducer';
import filterByProp from '../../../../utils/array';

const SET_MESSAGES = 'Messenger/ChatMessage/SET-MESSAGES';
const ADD_MESSAGE = 'Messenger/ChatMessage/ADD-MESSAGE';
const SET_LOADING = 'Messenger/ChatMessage/SET-LOADING';
const SET_LAST_PAGE = 'Messenger/ChatMessage/SET-LAST-PAGE';
const SET_SENDING_MESSAGES = 'Messenger/ChatMessage/SET-SENDING-MESSAGES';

type SendingMessage = {
  content: '';
};

const initState = {
  messages: [] as Array<Message>,
  isLoading: false,
  isLastPage: false,
  sendingMessages: [] as Array<SendingMessage>,
};
type ChatMessageStateType = typeof initState;

type Actions = ActionsType<typeof ChatMessageActions>;

const ChatMessageReducer: Reducer<ChatMessageStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [action.payload.message, ...state.messages],
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
    case SET_SENDING_MESSAGES:
      return {
        ...state,
        sendingMessages: action.payload.messages,
      };

    default:
      return state;
  }
};

export const ChatMessageActions = {
  setMessages(messages: Array<Message>) {
    return <const>{ type: SET_MESSAGES, payload: { messages } };
  },
  addMessage(message: Message) {
    return <const>{ type: ADD_MESSAGE, payload: { message } };
  },
  setLoading(value: boolean) {
    return <const>{ type: SET_LOADING, payload: { value } };
  },
  setLastPage(value: boolean) {
    return <const>{ type: SET_LAST_PAGE, payload: { value } };
  },
  setSendingMessages(messages: Array<SendingMessage>) {
    return <const>{ type: SET_SENDING_MESSAGES, payload: { messages } };
  },
};

export function SendMessage(content: string, chatId: string) {
  return catchAsync(
    async (dispatch, getState) => {
      dispatch(ChatMessageActions.setSendingMessages([...getState().chat.message.sendingMessages, { content }]));

      const result = await MessagesAPI.send(content, chatId);

      if (result.data.status) {
        const message = result.data.data;
        message.sendAt = new Date(Date.now());
        message.sender = getState().auth.user;

        dispatch(
          ChatActions.setChats(
            getState().chat.main.chats.map(chat => {
              if (chat._id === chatId) {
                chat.lastMessage = message;
              }

              return chat;
            })
          )
        );

        socket.emit('message', message);
      }
    },
    (dispatch: any, getState: any) => {
      const newArray = getState().chat.message.sendingMessages.filter((message: any) => message.content !== content);

      dispatch(ChatMessageActions.setSendingMessages(newArray));
    }
  );
}

export function AddMessageF(message: Message) {
  return async function (dispatch: Dispatch<any>, getState: any) {
    dispatch(ChatMessageActions.addMessage(message));
    dispatch(ChatActions.setChat({ ...getState().chat.main.currentChat, lastMessage: message._id }));
  };
}

export function GetMessagesF(chatId: string, page: number) {
  return catchAsync(
    async (dispatch, getState) => {
      if (page === 0) {
        dispatch(ChatMessageActions.setMessages([]));
      }

      dispatch(ChatMessageActions.setLoading(true));

      const result = await MessagesAPI.get(chatId, page);

      if (result.data.status) {
        const resultMessages = [...getState().chat.message.messages, ...result.data.data.messages];

        dispatch(ChatMessageActions.setMessages(filterByProp(resultMessages, '_id')));

        dispatch(ChatMessageActions.setLastPage(result.data.data.isLastPage));
      }
    },
    (dispatch: any) => {
      dispatch(ChatMessageActions.setLoading(false));
    }
  );
}

export default ChatMessageReducer;
