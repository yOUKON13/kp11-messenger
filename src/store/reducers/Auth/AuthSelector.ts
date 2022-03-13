import { Selector } from 'react-redux';
import { User } from '../../../types/User';
import { AppStateType } from '../../store';

export const GetUser: Selector<AppStateType, User | null> = state =>
  state.auth.user;
