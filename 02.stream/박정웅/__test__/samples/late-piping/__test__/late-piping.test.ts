import { DataSources, FooRepository, FooService } from '../sample';

describe('late-piping.test', () => {
  it('test', async () => {
    const repository = new FooRepository();
    const mockDataSources = [createMockDataSource('1'), createMockDataSource('2')];
    const service = new FooService(repository, mockDataSources);

    await service.collectData();

    expect(repository.findAll()).toEqual(['1', '2']);
  });
});

function createMockDataSource(value: string): DataSources {
  return {
    getData: jest.fn().mockResolvedValue(value),
  };
}
