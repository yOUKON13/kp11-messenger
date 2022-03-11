import { Selector } from 'react-redux';
import { AppStateType } from '../../store';

export const GetLoadingStatus: Selector<AppStateType, boolean> = state =>
  state.app.isLoading;
