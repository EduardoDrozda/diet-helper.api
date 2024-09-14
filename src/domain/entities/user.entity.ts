export type User = {
  id: string;
  email: string;
  name: string;
  password: string;

  created_at: string;
  updated_at: string;
}

export type CreateUserInput = Pick<User, 'name' | 'email' | 'password'>;
