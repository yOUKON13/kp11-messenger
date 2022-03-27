import instance, { newHeaders, Response } from '../base';
import { LoginUser, Profile, RegisterUser, UpdateProfile, User } from '../../types/User';

type UserResponse = {
  status: string;
  data: User;
};

type UsersResponse = {
  status: string;
  data: {
    users: Array<User>;
  };
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
  updateProfile(values: UpdateProfile): Promise<Response<UserResponse>> {
    return instance.patch('/users/profile', values, { headers: newHeaders() });
  },

  getByName(name: string, page: number): Promise<Response<UsersResponse>> {
    return instance.get(`/users?q=${name}&p=${page}`, {
      headers: newHeaders(),
    });
  },

  getById(id: string): Promise<Response<UserResponse>> {
    return instance.get(`/users/${id}`, {
      headers: newHeaders(),
    });
  },
};

export default UsersAPI;
