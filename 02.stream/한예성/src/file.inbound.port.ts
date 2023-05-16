export type FileUploadInboundPortInputDto = {
  filePath: string;
};

export type FileUploadInboundPortOutputDto = {
  result: {
    outputPath: string;
    before: {
      totalCost: number;
      totalRows: number;
    };
    after: {
      totalCost: number;
      totalRows: number;
    };
  };
};

export interface FileUploadInboundPort {
  executeNoStream(
    params: FileUploadInboundPortInputDto,
  ): Promise<FileUploadInboundPortOutputDto>;

  execute(
    params: FileUploadInboundPortInputDto,
  ): Promise<FileUploadInboundPortOutputDto>;
}
