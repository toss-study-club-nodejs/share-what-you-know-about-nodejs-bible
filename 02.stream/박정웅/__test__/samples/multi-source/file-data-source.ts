import path from 'path';
import * as fs from 'fs';

export function fileDataSource() {
  const filePath = path.join(__dirname, 'sample.txt');
  return fs.createReadStream(filePath, { encoding: 'utf-8' });
}
