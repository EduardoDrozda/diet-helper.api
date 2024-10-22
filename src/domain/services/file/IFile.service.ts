import { GetFileDTO } from '@application/dtos/file/get-file.dto';
import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';

export const FILE_SERVICE = Symbol('FileService');

export interface IFileService {
  upload(userId: string, data: UploadFileDTO): Promise<GetFileDTO>;
  update(file: GetFileDTO, data: UploadFileDTO): Promise<GetFileDTO>;
  findByUrl(url: string): Promise<GetFileDTO>;
}
