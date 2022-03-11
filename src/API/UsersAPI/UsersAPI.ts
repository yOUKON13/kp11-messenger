import instance, { newHeaders, Response } from '../base';
import { LoginUser, RegisterUser } from '../../types/User';

type UserResponse = {
  status: string;
  data: {
    email: string;
    login: string;
    token: string;
  };
};

const UsersAPI = {
  register(values: RegisterUser): Promise<Response<UserResponse>> {
    return instance.post('/users/register', values, { headers: newHeaders() });
  },
  login(values: LoginUser): Promise<Response<UserResponse>> {
    return instance.post('/users/login', values, { headers: newHeaders() });
  },
};

export default UsersAPI;
