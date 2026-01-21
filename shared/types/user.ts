export interface User {
  username: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

export type PublicUser = Omit<User, 'password'>