import { IFileService } from '@domain/services';

export const fileServiceMock: IFileService = {
  upload: jest.fn(),
  update: jest.fn(),
  findByUrl: jest.fn(),
};
