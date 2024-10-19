import { FileMimeType } from '@domain/enums';

export type AppMimeType = 'image/png' | 'image/jpeg';

export class UploadFileDTO {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: FileMimeType;
  size: number;
  buffer: Buffer;
}
