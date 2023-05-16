import * as fs from 'fs';
import { PathLike } from 'fs';

// 두 파일 디렉터리를 동기화하는 코드
// 두 디렉터리를 각각 source, destination 이라하고

// 1. source에 있지만 destination에 없으면 source에서 destination으로 copy
// 2. source에 없고 destination에만 있다면 destination에 있는 파일 삭제
export function sync(src: PathLike, dst: PathLike) {
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

// source : 1, 2, 3
// destination : 2, 4

// result -> 1, 2, 3






