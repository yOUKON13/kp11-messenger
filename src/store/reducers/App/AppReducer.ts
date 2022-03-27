import { Dispatch, Reducer } from 'redux';
import ActionsType from '../Types';

const SET_LOADING = 'Messenger/App/SET-LOADING';
const SET_MESSAGE = 'Roxine/App/SET-MESSAGE';

type MessageType = {
  text: string | null;
  isError: boolean;
  time: number;
};

const initState = {
  message: {
    text: null as string | null,
    isError: false,
    time: 0,
  },
  isLoading: false,
};
type AppStateType = typeof initState;

type Actions = ActionsType<typeof AppActions>;

const AppReducer: Reducer<AppStateType, Actions> = function (state = initState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.value,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export const AppActions = {
  setLoading(value: boolean) {
    return <const>{ type: SET_LOADING, payload: { value } };
  },
  setMessage(message: MessageType) {
    return <const>{ type: SET_MESSAGE, payload: { message } };
  },
};

export function CreateMessage(text: string, isError = true, time = 2500) {
  return async function (dispatch: Dispatch) {
    dispatch(AppActions.setMessage({ text, isError, time }));
  };
}

export default AppReducer;
