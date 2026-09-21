import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(N: number, M: number, tableList: number[]) {
  if (DEBUG) console.log('\n\n' + N + ' ' + M)
  if (DEBUG) console.log(tableList)
  let lestNum = M - N
  let current = [...tableList]
  /**
   * 時間でループ
   * 各時間で、
   * 1. 各テーブルの処理時間のカウントダウンを進める
   * 2. 各テーブルの残り処理時間を見る
   * 処理が完了（0）
   * - 残りのユーザー数
   *
   */

  for (let i = 0; ; i++) {
    const nextList = [...current]
    // current を順番に減らす
    const resetIdxList: number[] = []
    for (const [idx, item] of current.entries()) {
      if (item > 1) nextList[idx] = nextList[idx]! - 1
      if (item === 1) {
        resetIdxList.push(idx)
      }
    }
    // nextList の各要素で 0 の要素 を元の数に戻す
    // 複数の場合 各要素の idx の tableList の少ないものから戻す
    for (const resetIdx of resetIdxList.sort((a, b) => tableList[a]! - tableList[b]!)) {
      nextList[resetIdx] = tableList[resetIdx]!

      lestNum--
      if (lestNum === 0) {
        console.log(nextList.reduce((acc, cur) => Math.max(acc, cur), 0) + i + 1)
        return
      }
    }
    current = nextList
  }
}

process.stdin.resume()
process.stdin.setEncoding('utf8')

const lines: string[] = []
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
reader.on('line', (line: string) => {
  lines.push(line)
})

reader.on('close', () => {
  const [N, M] = lines[0]!.split(' ').map(Number) as [number, number]
  const t = Array.from({ length: N }, (_, i) => Number(lines[i + 1]))
  solve(N, M, t)
})
