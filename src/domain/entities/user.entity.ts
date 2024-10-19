export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar_id?: string;

  created_at: string;
  updated_at: string;
};

export type CreateUserInput = Pick<User, 'name' | 'email' | 'password'>;
