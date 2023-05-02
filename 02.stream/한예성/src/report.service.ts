import { FileOutboundPort } from './file.outbound.port';
import { createReadStream, readFile } from 'fs';
import { promisify } from 'util';

import {
  CostMonitor,
  FilterByCost,
  csvParser,
  csvParserPromise,
  CostMonitorWithError,
} from './csv-processing';
import {
  FileUploadInboundPort,
  FileUploadInboundPortInputDto,
  FileUploadInboundPortOutputDto,
} from './file.inbound.port';
import { PassThrough, Transform, TransformCallback, pipeline } from 'stream';

const MIN_COST = 100;

export class ReportService implements FileUploadInboundPort {
  constructor(fileOutboundAdaptor: FileOutboundPort) {
    this.uploadReportOutBoundPort = fileOutboundAdaptor;
  }
  private readonly uploadReportOutBoundPort: FileOutboundPort;

  async executeNoStream(
    params: FileUploadInboundPortInputDto,
  ): Promise<FileUploadInboundPortOutputDto> {
    try {
      const file = await promisify(readFile)(params.filePath);
      const beforeFiltering = {
        totalRows: 0,
        totalCost: 0,
      };
      const afterFiltering = {
        totalRows: 0,
        totalCost: 0,
      };

      const parsedCSV = await csvParserPromise(file);
      const filteredReport = parsedCSV.reduce((acc, curr) => {
        const cost = curr['total cost'] || 0;
        beforeFiltering.totalRows += 1;
        beforeFiltering.totalCost += cost;
        if (parseFloat(cost) >= MIN_COST) {
          afterFiltering.totalRows += 1;
          afterFiltering.totalCost += cost;
          acc = acc + JSON.stringify(curr) + '\n';
        }
        return acc;
      }, '');
      const uploadRes = await this.uploadReportOutBoundPort.outNoStream({
        data: filteredReport,
      });

      console.log(uploadRes);

      return {
        result: {
          before: beforeFiltering,
          after: afterFiltering,
          outputPath: uploadRes.result.path,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async execute(
    params: FileUploadInboundPortInputDto,
  ): Promise<FileUploadInboundPortOutputDto> {
    const costFilter: FilterByCost = new FilterByCost(MIN_COST);
    const beforeFilterMonitor: CostMonitor = new CostMonitor();
    const afterFilterMonitor: CostMonitor = new CostMonitor();
    const contentStream = new PassThrough(); // Late piping 패턴
    const stringifier: Transform = new Transform({
      objectMode: true,
      transform: function (
        chunk: any,
        encoding: BufferEncoding,
        callback: TransformCallback,
      ) {
        this.push(JSON.stringify(chunk) + '\n');
        callback();
      },
    });

    createReadStream(params.filePath)
      .pipe(csvParser)
      .pipe(beforeFilterMonitor)
      .pipe(costFilter)
      .pipe(afterFilterMonitor)
      .pipe(stringifier)
      .pipe(contentStream); // Late piping 패턴

    const uploadRes = await this.uploadReportOutBoundPort.out({
      data: contentStream,
    });

    console.log(uploadRes);

    return {
      result: {
        before: beforeFilterMonitor.getResult(),
        after: afterFilterMonitor.getResult(),
        outputPath: uploadRes.result.path,
      },
    };
  }

  async executeWithError(
    params: FileUploadInboundPortInputDto,
  ): Promise<FileUploadInboundPortOutputDto> {
    const costFilter: FilterByCost = new FilterByCost(MIN_COST);
    const beforeFilterMonitor: CostMonitorWithError =
      new CostMonitorWithError();
    const afterFilterMonitor: CostMonitor = new CostMonitor();
    const contentStream = new PassThrough(); // Late piping 패턴
    const stringifier: Transform = new Transform({
      objectMode: true,
      transform: function (
        chunk: any,
        encoding: BufferEncoding,
        callback: TransformCallback,
      ) {
        this.push(JSON.stringify(chunk) + '\n');
        callback();
      },
    });

    createReadStream(params.filePath)
      .pipe(csvParser)
      .pipe(beforeFilterMonitor)
      .pipe(costFilter)
      .pipe(afterFilterMonitor)
      .pipe(stringifier)
      .pipe(contentStream); // Late piping 패턴

    const uploadRes = await this.uploadReportOutBoundPort.out({
      data: contentStream,
    });

    console.log(uploadRes);

    return {
      result: {
        before: beforeFilterMonitor.getResult(),
        after: afterFilterMonitor.getResult(),
        outputPath: uploadRes.result.path,
      },
    };
  }

  async executeWithErrorPipeline(
    params: FileUploadInboundPortInputDto,
  ): Promise<FileUploadInboundPortOutputDto> {
    const costFilter: FilterByCost = new FilterByCost(MIN_COST);
    const beforeFilterMonitor: CostMonitor = new CostMonitor();
    const afterFilterMonitor: CostMonitorWithError = new CostMonitorWithError();
    const contentStream = new PassThrough(); // Late piping 패턴
    const stringifier: Transform = new Transform({
      objectMode: true,
      transform: function (
        chunk: any,
        encoding: BufferEncoding,
        callback: TransformCallback,
      ) {
        this.push(JSON.stringify(chunk) + '\n');
        callback();
      },
    });

    await pipeline(
      createReadStream(params.filePath),
      csvParser,
      beforeFilterMonitor,
      costFilter,
      afterFilterMonitor,
      stringifier,
      contentStream, // Late piping 패턴
      (err) => {
        if (err) {
          throw err;
        }
      },
    );
    const uploadRes = await this.uploadReportOutBoundPort.out({
      data: contentStream,
    });

    console.log(uploadRes);

    return {
      result: {
        before: beforeFilterMonitor.getResult(),
        after: afterFilterMonitor.getResult(),
        outputPath: uploadRes.result.path,
      },
    };
  }
}
