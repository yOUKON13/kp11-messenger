interface LoginUser {
  login: string;
  password: string;
}

interface RegisterUser extends LoginUser {
  email: string;
  passwordConfirm: string;
}

interface Profile {
  _id: string;
  name: string;
  surname: string;
  phoneNumber: string;
  group: string;
  avatar: string;
}

interface UpdateProfile extends Profile {
  email: string;
  currentPassword: string;
  newPassword: string;
}

interface User extends LoginUser, Profile {
  token: string;
  email: string;
}

interface UserTyping {
  user: User;
  isTyping: boolean;
}

export { RegisterUser, LoginUser, User, Profile, UpdateProfile, UserTyping };
