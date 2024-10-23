import { FileMimeType } from '@domain/enums';

export class UploadFileDTO {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: FileMimeType;
  size: number;
  buffer: Buffer;
}
