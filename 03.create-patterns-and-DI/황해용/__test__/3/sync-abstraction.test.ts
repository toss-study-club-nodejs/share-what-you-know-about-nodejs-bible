import { syncWithAbstraction } from './sync-abstraction';

// 파일시스템의 추상화에 대해 함수를 실행하면 어떤 추상화된 동작이 일어날까를 테스트
describe('sync with abstraction', () => {
  const src = '/source'
  const dst = '/destination'
  it('copy', () => {
    // 테스트에 필요한 데이터 준비
    // 단 실제 의존성에서 필요한 게 아닌 추상화된
    const srcFiles: string[] = ['a']
    const dstFiles: string[] = []

    const actions = syncWithAbstraction(srcFiles, dstFiles, src, dst)

    const srcPath = src + srcFiles[1]
    const dstPath = dst + srcFiles[1]
    expect(actions[0]).toEqual(['COPY', srcPath, dstPath])
  });

  it('remove', () => {
    const srcFiles: string[] = []
    const dstFiles: string[] = ['a']

    const actions = syncWithAbstraction(srcFiles, dstFiles, src, dst)

    const fileToRemove = dst + dstFiles[0]
    expect(actions[0]).toEqual(['REMOVE', fileToRemove])
  });
});
