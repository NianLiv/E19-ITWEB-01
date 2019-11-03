export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface UserSignUp {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
}
