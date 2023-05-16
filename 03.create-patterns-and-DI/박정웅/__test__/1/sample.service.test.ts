import { CompanyType, DataProcessor, DataProcessorFactory } from './sample.service';

describe('sample.service.test', () => {
  it('DataProcessor', async () => {
    const mockClient = { request: jest.fn().mockResolvedValue([{ id: '', account: '' }]) };
    const mockRepository = { save: jest.fn() };
    const dataProcessor = new DataProcessor(mockClient, mockRepository);

    await dataProcessor.process();

    expect(mockClient.request).toBeCalledTimes(1);
    expect(mockRepository.save).toBeCalledTimes(1);
  });

  /**
   * 생성 로직이 필요한 케이스
   *
   * 생성 또는 부트스트랩 과정에서 로직이 필요한 케이스
   */
  it('생성 또는 부트스트랩 과정에서 로직이 필요한 케이스', async () => {
    const env: { targetCompanyList: CompanyType[] } = { targetCompanyList: ['tosspayments'] };
    for (const company of env.targetCompanyList) {
      await DataProcessorFactory.createFor(company).process();
    }
  });
});
