import { Selector } from 'react-redux';
import { User } from '../../../types/User';
import { AppStateType } from '../../store';

export const GetShowingUser: Selector<AppStateType, User | null> = state => state.user.showingUser;

export const GetUserWindowActive: Selector<AppStateType, boolean> = state => state.user.isUserWindowActive;
