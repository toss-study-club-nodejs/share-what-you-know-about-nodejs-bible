import { Readable } from 'stream';

export type FileOutboundInputDto = {
  data: Readable;
};

export type FileOutboundNoStreamInputDto = {
  data: string;
};

export type FileOutboundOutputDto = {
  result: {
    path: string;
  };
};

export interface FileOutboundPort {
  outNoStream(
    params: FileOutboundNoStreamInputDto,
  ): Promise<FileOutboundOutputDto>;

  out(params: FileOutboundInputDto): Promise<FileOutboundOutputDto>;
}
