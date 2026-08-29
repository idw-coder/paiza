import fs from 'fs'
import path from 'node:path'

const filename = process.argv[2]
if (!filename) {
  console.error(
    'npx tsx scripts/generate-input/ts/260826_abc464_c.ts <ファイル名>\nファイル名入力してください'
  )
  process.exit(1)
}

const outPath = path.resolve(process.cwd(), filename)

let inputData = ''

/**
 * N M
 * A1 D1 B1
 * A2 D2 B2
 * ⋮
 * An Dn Bn
 */
// const N = 3 * Math.pow(10, 5)
// const M = 3 * Math.pow(10, 5)
const N = 30000
const M = 30000
inputData += N + ' ' + M + '\n'
for (let i = 0; i < N; i++) {
  inputData +=
    [
      Math.floor(Math.random() * N) + 1,
      Math.floor(Math.random() * M) + 1,
      Math.floor(Math.random() * N) + 1,
    ].join(' ') + '\n'
}

fs.writeFileSync(outPath, inputData)
