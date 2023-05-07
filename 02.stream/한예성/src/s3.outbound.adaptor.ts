import { S3 } from 'aws-sdk';
import {
  FileOutboundPort,
  FileOutboundInputDto,
  FileOutboundOutputDto,
  FileOutboundNoStreamInputDto,
} from './file.outbound.port';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;

export class S3OutboundAdaptor implements FileOutboundPort {
  constructor() {
    this.s3 = new S3({
      region: 'eu-west-1',
      endpoint: 'http://localhost:4566',
      s3ForcePathStyle: true,
      maxRetries: 3,
    });
  }

  private readonly s3: S3;

  private async upload(data: any): Promise<SendData> {
    const s3Params = {
      Body: data,
      Key: 'output.ndjson',
      Bucket: 'test-bucket',
    };
    const options = {
      partSize: 5 * 1024 * 1024, // partSize 5 MiB to 5 GiB
      queueSize: 5, // how many concurrent uploads
    };

    return this.s3
      .upload(s3Params, options)
      .on('httpUploadProgress', (progress) => {
        console.log(`${progress.loaded} / ${progress.total}`);
      })
      .promise();
  }

  async outNoStream(
    params: FileOutboundNoStreamInputDto,
  ): Promise<FileOutboundOutputDto> {
    const uploadResult = await this.upload(params.data);

    return {
      result: {
        path: uploadResult.Location,
      },
    };
  }

  async out(params: FileOutboundInputDto): Promise<FileOutboundOutputDto> {
    const uploadResult = await this.upload(params.data);

    return {
      result: {
        path: uploadResult.Location,
      },
    };
  }
}
