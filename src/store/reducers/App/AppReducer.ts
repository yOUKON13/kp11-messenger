import { Reducer } from 'redux';
import ActionsType from '../Types';

const SET_LOADING = 'Messenger/App/SET-LOADING';

const initState = {
  isLoading: false,
};
type AppStateType = typeof initState;

type Actions = ActionsType<typeof AppActions>;

const AppReducer: Reducer<AppStateType, Actions> = function (
  state = initState,
  action
) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload.value,
      };
    default:
      return state;
  }
};

export const AppActions = {
  setLoading(value: boolean) {
    return <const>{ type: SET_LOADING, payload: { value } };
  },
};

export default AppReducer;
