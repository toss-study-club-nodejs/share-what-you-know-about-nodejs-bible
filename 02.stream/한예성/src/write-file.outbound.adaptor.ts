import {
  FileOutboundPort,
  FileOutboundInputDto,
  FileOutboundOutputDto,
  FileOutboundNoStreamInputDto,
} from './file.outbound.port';
import { createWriteStream, writeFile } from 'fs';
import * as path from 'path';
import { promisify } from 'util';

export class WriteFileOutboundAdaptor implements FileOutboundPort {
  async outNoStream(
    params: FileOutboundNoStreamInputDto,
  ): Promise<FileOutboundOutputDto> {
    console.log('file out start');
    const file: string = params.data;
    const outputFilePath: string = path.join(
      __dirname,
      `../sample_file/output-${new Date()}.ndjson`,
    );
    await promisify(writeFile)(outputFilePath, file);

    return {
      result: {
        path: outputFilePath,
      },
    };
  }

  async out(params: FileOutboundInputDto): Promise<FileOutboundOutputDto> {
    return new Promise((resolve, _) => {
      console.log('file out start');
      const fileStream = params.data;
      const outputFilePath: string = path.join(
        __dirname,
        '../sample_file/output.ndjson',
      );
      fileStream.pipe(createWriteStream(outputFilePath)).on('finish', () => {
        resolve({
          result: {
            path: outputFilePath,
          },
        });
      });
    });
  }
}
