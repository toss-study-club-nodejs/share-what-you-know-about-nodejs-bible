import { S3OutboundAdaptor } from '../src/s3.outbound.adaptor';
import { WriteFileOutboundAdaptor } from '../src/write-file.outbound.adaptor';
import { ReportService } from '../src/report.service';
import { FileOutboundPort } from '../src/file.outbound.port';

import * as path from 'path';

describe('UploadReportService Spec', () => {
  test('CSV 파일 읽어서 필터링, 모니터링 후 S3 업로드 - 스트림 처리 O, 성공', async () => {
    const outboundAdaptor: FileOutboundPort = new S3OutboundAdaptor();
    const uploadReportService: ReportService = new ReportService(
      outboundAdaptor,
    );
    const { result } = await uploadReportService.execute({
      filePath: path.join(__dirname, '../sample_file/sample.csv'),
    });
    expect(result?.before?.totalRows).toEqual(49999);
    expect(result?.after?.totalRows).toEqual(11510);
  }); // 5.4MB, 11510 rows csv : 1sec 670ms

  test('CSV 파일 읽어서 필터링, 모니터링 후 S3 업로드 - 스트림 처리 X, 성공', async () => {
    const outboundAdaptor: FileOutboundPort = new S3OutboundAdaptor();
    const uploadReportService: ReportService = new ReportService(
      outboundAdaptor,
    );
    const { result } = await uploadReportService.executeNoStream({
      filePath: path.join(__dirname, '../sample_file/sample.csv'),
    });
    expect(result?.before?.totalRows).toEqual(49999);
    expect(result?.after?.totalRows).toEqual(11510);
  }); // 5.4MB, 11510 rows csv 2sec 836ms

  test('CSV 파일 읽어서 필터링, 모니터링 후 S3 업로드 - 스트림 처리 중간에 에러', () => {
    const outboundAdaptor: FileOutboundPort = new S3OutboundAdaptor();
    const uploadReportService: ReportService = new ReportService(
      outboundAdaptor,
    );

    expect(async () => {
      await uploadReportService.executeWithError({
        filePath: path.join(__dirname, '../sample_file/sample.csv'),
      });
    }).rejects.toThrow();
  });

  test('CSV 파일 읽어서 필터링, 모니터링 후 S3 업로드 - 스트림 처리 중간에 에러 pipeline', () => {
    const outboundAdaptor: FileOutboundPort = new S3OutboundAdaptor();
    const uploadReportService: ReportService = new ReportService(
      outboundAdaptor,
    );

    expect(async () => {
      await uploadReportService.executeWithErrorPipeline({
        filePath: path.join(__dirname, '../sample_file/sample.csv'),
      });
    }).rejects.toThrow();
  });

  test('CSV 파일 읽어서 필터링, 모니터링 후 파일로 쓰기 - 스트림 처리 O, 성공', async () => {
    const outboundAdaptor: FileOutboundPort = new WriteFileOutboundAdaptor();
    const writeReportService: ReportService = new ReportService(
      outboundAdaptor,
    );
    const { result } = await writeReportService.execute({
      filePath: path.join(__dirname, '../sample_file/sample.csv'),
    });

    expect(result?.before?.totalRows).toEqual(49999);
    expect(result?.after?.totalRows).toEqual(11510);
  }); // 1.7 sec

  test('CSV 파일 읽어서 필터링, 모니터링 후 파일로 쓰기 - 스트림 처리 X, 성공', async () => {
    const outboundAdaptor: FileOutboundPort = new WriteFileOutboundAdaptor();
    const writeReportService: ReportService = new ReportService(
      outboundAdaptor,
    );
    const { result } = await writeReportService.executeNoStream({
      filePath: path.join(__dirname, '../sample_file/sample.csv'),
    });

    expect(result?.before?.totalRows).toEqual(49999);
    expect(result?.after?.totalRows).toEqual(11510);
  }); // 986 ms
});
