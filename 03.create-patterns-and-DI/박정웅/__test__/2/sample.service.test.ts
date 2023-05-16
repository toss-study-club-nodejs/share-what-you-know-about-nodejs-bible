import { SampleService } from './sample.service';

describe('sample.service.test', () => {
  it('new 키워드가 막힘', () => {
    //new SampleService()
    SampleService.create();
  });
});
