import { Selector } from 'react-redux';
import { AppStateType } from '../../store';

export const GetLoadingStatus: Selector<AppStateType, boolean> = state => state.app.isLoading;

export const GetMessage: Selector<AppStateType, any> = state => state.app.message;
