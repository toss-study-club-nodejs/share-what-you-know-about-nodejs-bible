import { SampleService } from './sample.service';
import { fileDataSource } from './file-data-source';

(async () => {
  await new SampleService().execute([fileDataSource()]);
})();
