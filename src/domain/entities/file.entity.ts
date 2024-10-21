export type File = {
  id: string;
  name: string;
  original_name: string;
  url: string;
  user_id: string;
  type: string;
  size: number;

  created_at: string;
  updated_at: string;
};

export type CreateFileInput = Omit<File, 'id' | 'created_at' | 'updated_at'>;
