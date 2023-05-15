import * as fs from 'fs';
import { PathLike, writeFile } from 'fs';

// 두 파일 디렉터리를 동기화하는 코드
// 두 디렉터리를 각각 source, destination 이라하고
// 1. source에 있지만 destination에 없으면 source에서 destination으로 copy
// 2. source에 없고 destination에만 있다면 destination에 있는 파일 삭제
export function syncWithDI(src: PathLike, dst: PathLike, fs: any) {
  const srcFiles = fs.readdirSync(src)
  const dstFiles = fs.readdirSync(dst)

  // source에 있지만 dst에 없으면 copy
  for (const fileName of srcFiles) {
    if (!dstFiles.includes(fileName)) {
      const sourcePath = src + fileName
      const destPath = dst + fileName
      fs.copyFileSync(sourcePath, destPath)
    }
  }

  // source에 없으면 삭제
  for (const dstFile of dstFiles) {
    if (srcFiles.includes(dstFile)) {
      fs.unlinkSync(dst + dstFile)
    }
  }
}



export class FakeFileSystem {
  //copy
  copyFileSync(path, file) {
    return ['COPY', path, file]
  }

  // remove
  unlinkSync(dst) {
    return ['REMOVE', dst]
  }

  mkdirSync(src) {
    // ... 

  }

  writeFileSync(src, filename) {
    // ...

  }

  existsSync(path) {
    // ...
  }


}



