export type User = {
  username: string;
  password: string;
};

export type RegisterUserData = {
  username: string;
  password: string;
  passwordConfirm?: string;
};
