import instance, { newHeaders, Response } from '../base';
import { LoginUser, Profile, RegisterUser, User } from '../../types/User';

type UserResponse = {
  status: string;
  data: User;
};

const UsersAPI = {
  register(values: RegisterUser): Promise<Response<UserResponse>> {
    return instance.post('/users/register', values, { headers: newHeaders() });
  },
  login(values: LoginUser): Promise<Response<UserResponse>> {
    return instance.post('/users/login', values, { headers: newHeaders() });
  },
  auth(): Promise<Response<UserResponse>> {
    return instance.post('/users/auth', {}, { headers: newHeaders() });
  },

  createProfile(values: Profile): Promise<Response<UserResponse>> {
    return instance.post('/users/profile', values, { headers: newHeaders() });
  },
};

export default UsersAPI;
