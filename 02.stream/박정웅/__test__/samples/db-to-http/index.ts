import express from 'express';
import { SampleService } from './sample.service';

(async () => {
  const app = express();
  const port = 3000;

  const service = new SampleService();
  app.get('/download', async (req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=sample.csv');
    res.setHeader('Content-type', 'text/csv; charset=utf-8');
    return service.getData(res);
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
