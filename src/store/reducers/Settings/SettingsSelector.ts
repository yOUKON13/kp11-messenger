import { Selector } from 'react-redux';
import { AppStateType } from '../../store';

export const GetTheme: Selector<AppStateType, boolean> = state =>
  state.settings.darkTheme;

export const GetSounds: Selector<AppStateType, boolean> = state =>
  state.settings.sounds;

export const GetLanguage: Selector<AppStateType, 'russian' | 'english'> =
  state => state.settings.language;

export const GetBackground: Selector<AppStateType, string> = state =>
  state.settings.background;
