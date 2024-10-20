export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  avatar_url?: string;

  created_at: string;
  updated_at: string;
};

export type CreateUserInput = Pick<User, 'name' | 'email' | 'password'>;

export type UpdateServiceInput = Pick<
  User,
  'id' | 'name' | 'email' | 'avatar_url'
>;
