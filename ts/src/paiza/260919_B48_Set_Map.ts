import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(N: number, M: number, bArr: number[][], aList: number[]) {
  if (DEBUG)
    console.log(
      '\n\n' +
        N +
        ' ' +
        M +
        '\n' +
        bArr.map((b) => b.join(' ')).join('\n') +
        '\n' +
        aList.join('\n')
    )
  const callList = new Set(aList)
  if (DEBUG) console.log(callList)
  let result = 0
  const reachList: Map<number, number> = new Map()
  /**
   * a をループ
   * 既存の状況 たて 横 斜め を判定
   *  ビンゴ リーチであれば、残りの数字 を push
   *
   */
  // y
  for (let i = 0; i < N; i++) {
    const notSelected = bArr[i]!.filter((b) => !callList.has(b))
    if (2 < notSelected.length) continue
    else if (notSelected.length === 1) {
      reachList.set(
        notSelected![0]!,
        reachList.get(notSelected![0]!) ? reachList.get(notSelected![0]!)! + 1 : 1
      )
    } else if (notSelected.length === 0) result++
  }
  // x
  for (let i = 0; i < N; i++) {
    const currentList = bArr.map((row) => row[i]!)
    const notSelected = currentList!.filter((b) => !callList.has(b))
    if (2 < notSelected.length) continue
    else if (notSelected.length === 1) {
      reachList.set(
        notSelected![0]!,
        reachList.get(notSelected![0]!) ? reachList.get(notSelected![0]!)! + 1 : 1
      )
    } else if (notSelected.length === 0) result++
  }
  // ↘︎
  const dList = bArr.map((row, idx) => row[idx]!)
  // ↗︎
  const uList = bArr.map((row, idx) => row[N - idx - 1]!)
  for (const list of [dList, uList]) {
    const notSelected = list!.filter((b) => !callList.has(b))
    if (2 < notSelected.length) continue
    else if (notSelected.length === 1) {
      reachList.set(
        notSelected![0]!,
        reachList.get(notSelected![0]!) ? reachList.get(notSelected![0]!)! + 1 : 1
      )
    } else if (notSelected.length === 0) result++
  }

  if (DEBUG) console.log(reachList)

  console.log(result + Math.max(0, ...reachList.values()))
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
  const bArr = Array.from({ length: N }, (_, idx) => lines[idx + 1]!.split(' ').map(Number))
  const aArr = Array.from({ length: M - 1 }, (_, idx) => lines[idx + N + 1]!).map(Number)

  solve(N, M, bArr, aArr)
})
