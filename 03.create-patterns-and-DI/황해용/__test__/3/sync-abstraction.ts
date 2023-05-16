import * as fs from 'fs';
import { PathLike } from 'fs';

//실제 fs없이 테스트할 수 없을까?
//외부에 아무 의존성이 없는 core를 만들고 외부세계를 표현하는 입력에 대해 이 core가 어떻게 반응하는지

function sync() {
  // 입력 수집
  // 파일 리스트가 주어지면 
  const src = '/source'
  const dst = '/destination'
  const srcFiles = fs.readdirSync(src) // ['a', 'b', 'c']
  const dstFiles = fs.readdirSync(dst) // ['b', 'e']

  // 의존성 없는 비즈니스 로직 수행하는 함수
  // 어떤 파일을 복사하거나 제거해야할까?
  const actions = syncWithAbstraction(srcFiles, dstFiles, src, dst)

  // 출력 적용
  for (const action of actions) {
    switch (action[0]) {
      case 'COPY':
        fs.copyFileSync(action[1], action[2])
        break
      case 'REMOVE':
        fs.unlinkSync(action[1])
        break
    }
  }
}


export function syncWithAbstraction(srcFiles: string[], dstFiles: string[], src: PathLike, dst: PathLike) {
  const actions = []

  for (const srcFile of srcFiles) {
    // source에 있지만 dst에 없으면 copy
    const needCopy = !dstFiles.includes(srcFile)
    if (needCopy) {
      const sourcePath = src + srcFile
      const destPath = dst + srcFile
      actions.push(['COPY', sourcePath, destPath])
    }
  }

  for (const dstFile of dstFiles) {
    // source에 없으면 삭제
    const needRemove = !srcFiles.includes(dstFile)
    if (needRemove) {
      const path = dst + dstFile
      actions.push(['REMOVE', path])
    }
  }

  return actions
}



