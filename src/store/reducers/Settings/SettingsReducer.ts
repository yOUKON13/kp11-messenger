import ActionsType from '../Types';
import { Dispatch, Reducer } from 'redux';

const SET_THEME = 'Messenger/Settings/SET_THEME';
const SET_SOUNDS = 'Roxine/Settings/SET-SOUNDS';
const SET_LANGUAGE = 'Roxine/Settings/SET-LANGUAGE';
const SET_BACKGROUND = 'Roxine/Settings/SET-BACKGROUND';

let isLoaded = false;
const initState = {
  darkTheme: true,
  sounds: true,
  language: 'russian' as 'russian' | 'english',
  background: '',
};

type AppStateType = typeof initState;

type Actions = ActionsType<typeof SettingsActions>;

const SettingsReducer: Reducer<AppStateType, Actions> = function (
  state = initState,
  action
) {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        darkTheme: action.payload.value,
      };
    case SET_SOUNDS:
      return {
        ...state,
        sounds: action.payload.value,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload.language,
      };
    case SET_BACKGROUND:
      return {
        ...state,
        background: action.payload.background,
      };
    default:
      return state;
  }
};

export const SettingsActions = {
  setTheme(value: boolean) {
    return <const>{ type: SET_THEME, payload: { value } };
  },
  setSounds(value: boolean) {
    return <const>{ type: SET_SOUNDS, payload: { value } };
  },
  setLanguage(language: 'russian' | 'english') {
    return <const>{ type: SET_LANGUAGE, payload: { language } };
  },
  setBackground(background: string) {
    return <const>{ type: SET_BACKGROUND, payload: { background } };
  },
};

export function LoadSettings() {
  return async function (dispatch: Dispatch) {
    const str = localStorage.getItem('settings');

    if (str) {
      const json = JSON.parse(str);
      dispatch(SettingsActions.setTheme(json.darkTheme));
      dispatch(SettingsActions.setSounds(json.sounds));
      dispatch(SettingsActions.setLanguage(json.language));
      dispatch(SettingsActions.setBackground(json.background));
    }

    isLoaded = true;
  };
}

export function SaveSettings() {
  return async function (dispatch: Dispatch, getState: Function) {
    if (isLoaded) {
      const data = getState().settings;

      localStorage.setItem('settings', JSON.stringify(data));
    }
  };
}

export default SettingsReducer;
