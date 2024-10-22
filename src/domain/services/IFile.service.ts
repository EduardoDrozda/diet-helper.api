import { GetFileDTO } from '@application/dtos/file/get-file.dto';
import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';

export const FILE_SERVICE = Symbol('FileService');

export interface UploadParams {
  isPublic?: boolean;
}
export interface IFileService {
  upload(
    userId: string,
    data: UploadFileDTO,
    params?: UploadParams,
  ): Promise<GetFileDTO>;
  update(
    file: GetFileDTO,
    data: UploadFileDTO,
    params?: UploadParams,
  ): Promise<GetFileDTO>;
  findByUrl(url: string): Promise<GetFileDTO>;
}
