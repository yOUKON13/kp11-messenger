interface LoginUser {
  login: string;
  password: string;
}

interface RegisterUser extends LoginUser {
  email: string;
  passwordConfirm: string;
}

interface Profile {
  name: string;
  surname: string;
  phoneNumber: string;
  group: string;
}

interface User extends LoginUser, Profile {
  token: string;
}

export { RegisterUser, LoginUser, User, Profile };
