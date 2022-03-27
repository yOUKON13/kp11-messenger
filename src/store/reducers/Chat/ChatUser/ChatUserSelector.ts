import { Selector } from 'react-redux';
import { AppStateType } from '../../../store';
import { User } from '../../../../types/User';

export const GetAddUsers: Selector<AppStateType, Array<User>> = state =>
  state.chat.user.users;

export const GetAddUsersLoading: Selector<AppStateType, boolean> = state =>
  state.chat.user.isLoading;

export const GetAddUsersLastPage: Selector<AppStateType, boolean> = state =>
  state.chat.user.isLastPage;
