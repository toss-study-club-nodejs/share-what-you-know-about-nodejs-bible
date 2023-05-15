import { sync } from "./sync";
import * as fs from 'fs';

describe('without DI', () => {
  it('sync', () => {
    // 실제 fs에 테스트에 필요한 데이터 준비
    const source = '/source'
    const destination = '/destination'
    fs.mkdirSync(source)
    fs.mkdirSync(destination)
    const fileName = source + '/my-file'
    const content = "I'm file"
    fs.writeFileSync(fileName, content)

    // 함수 실행
    sync(source, destination)

    // fs에 copy가 되었는지 확인
    const fileExist = fs.existsSync(destination)
    expect(fileExist).toEqual(true)

    // 테스트에 사용된 파일 제거
    fs.unlinkSync(source)
    fs.unlinkSync(destination)
  });
});
