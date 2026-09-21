import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(
  H: number,
  W: number,
  N: number,
  M: number,
  pArr: string[][],
  Q: number,
  moveList: number[][]
) {
  if (DEBUG)
    console.log(
      '\n\n' +
        H +
        ' ' +
        W +
        '\n' +
        N +
        ' ' +
        M +
        '\n' +
        pArr.map((p) => p.join('')).join('\n') +
        '\n' +
        Q +
        '\n' +
        moveList.map((q) => q.join(' ')).join('\n')
    )
  const result: string[][] = Array.from({ length: H }, () => Array.from({ length: W }, () => '_'))
  /**
   * curr が # next が # → _
   * curr が # next が _ → #
   * curr が _ next が # → #
   * curr が _ next が _ → _
   *
   * next は 現在の raw col が N x M の
   * 範囲外 の場合 そのまま next 使用しない
   * 範囲内 の場合 pArr の [raw - y][col - x]
   */
  for (let i = 0; i < Q; i++) {
    for (let raw = 0; raw < H; raw++) {
      for (let col = 0; col < W; col++) {
        // 範囲内
        if (
          moveList[i]![1]! - 1 <= raw &&
          raw < moveList[i]![1]! + N - 1 &&
          moveList[i]![0]! - 1 <= col &&
          col < moveList[i]![0]! + M - 1
        ) {
          const current = result[raw]![col]!
          const nextY = raw - moveList[i]![1]! + 1
          const nextX = col - moveList[i]![0]! + 1
          const next = pArr[nextY]![nextX]!
          // if (DEBUG) console.log(next)
          if (current === '#' && next === '#') {
            result[raw]![col]! = '_'
          } else if (current === '#' && next === '_') {
            result[raw]![col]! = '#'
          } else if (current === '_' && next === '#') {
            result[raw]![col]! = '#'
          } else if (current === '_' && next === '_') {
            result[raw]![col]! = '_'
          }
        }
      }
    }
  }
  console.log(result.map((r) => r.join('')).join('\n'))
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
  const [H, W] = lines[0]!.split(' ').map(Number) as [number, number]
  const [N, M] = lines[1]!.split(' ').map(Number) as [number, number]
  const pArr = Array.from({ length: N }, (_, idx) => lines[idx + 2]!.split(''))
  const Q = Number(lines[N + 2]!)
  const qArr = Array.from({ length: Q }, (_, idx) => lines[idx + 3 + N]!.split(' ').map(Number))

  solve(H, W, N, M, pArr, Q, qArr)
})
