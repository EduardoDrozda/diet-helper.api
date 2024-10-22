import 'knex';

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      avatar_url: string;
      created_at: string;
      updated_at: string;
    };
    meats: {
      id: string;
      name: string;
      description: string;
      eaten_at: string;
      type: 'INCOME' | 'OUTCOME';
      user_id: string;
      created_at: string;
      updated_at: string;
    };
    files: {
      id: string;
      name: string;
      original_name: string;
      user_id: string;
      url: string;
      type: string;
      size: number;
      created_at: string;
      updated_at: string;
    };
  }
}
