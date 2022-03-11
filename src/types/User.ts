interface LoginUser {
  login: string;
  password: string;
}

interface RegisterUser {
  login: string;
  password: string;
  email: string;
  passwordConfirm: string;
}

export { RegisterUser, LoginUser };
