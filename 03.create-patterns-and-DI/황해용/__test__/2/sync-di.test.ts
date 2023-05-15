import { syncWithDI, FakeFileSystem } from "./sync-di";


describe('sync', () => {
  it('with DI', () => {
    const fs = new FakeFileSystem()

    // 테스트에 필요한 데이터 준비
    const source = '/source'
    const destination = '/destination'
    fs.mkdirSync(source)
    fs.mkdirSync(destination)
    const content = "I'm file"
    fs.writeFileSync(source + 'my-file', content)

    // 함수 실행
    syncWithDI(source, destination, fs)

    // copy가 되었는지 확인
    const fileExist = fs.existsSync(destination)
    expect(fileExist).toEqual(true)
  });
});
