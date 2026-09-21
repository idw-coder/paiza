import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(N: number, M: number, K: number, checkList: number[][], T: number) {
  let current: (number | null)[][] = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => null)
  )
  for (const check of checkList) {
    current[check[0]! - 1]![check[1]! - 1] = check[2]!
  }
  if (DEBUG)
    console.log(
      '\n\n' +
        N +
        ' ' +
        M +
        '\n' +
        K +
        '\n' +
        checkList.map((c) => c.join(' ')).join('\n') +
        '\n' +
        T +
        '\n' +
        current.map((cur) => cur.map((v) => v ?? '_').join(' ')).join('\n')
    )
  /**
   *
   * 1. 初期状態: センサー位置は測定値で初期化、それ以外は未推定状態とする
   * 2. 各反復において:
   *  ・ステップ1: 全ての未推定マスについて、同時に以下を計算する
   *  ・そのマスの上下左右の隣接マス (存在する場合) のうち、既に温度が確定しているマスの温度の平均値を計算
   *  ・1つ以上の隣接マスが確定していれば、その平均値を仮の温度とする (小数点以下切り捨て)
   *  ・ステップ2: ステップ1で計算した全ての仮温度を、一斉に適用して温度を確定させる
   * 3. 終了条件: 新たに温度が確定したマスがなくなったら終了
   *
   *
   * 各マスでループ 未確定マスが無くなるまで
   * 各マスの温度を確定
   */
  while (current.find((row) => row.includes(null))) {
    const next: (number | null)[][] = Array.from({ length: N }, () =>
      Array.from({ length: M }, () => null)
    )
    if (DEBUG) console.log(next.map((n) => n.map((v) => v ?? '_').join(' ')).join('\n'))
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < M; col++) {
        if (current[row]![col] !== null) {
          next[row]![col] = current[row]![col]!
          continue
        } else {
          const sideList = [
            0 <= row - 1 ? current[row - 1]![col] : null,
            row + 1 < N ? current[row + 1]![col] : null,
            0 <= col - 1 ? current[row]![col - 1] : null,
            col + 1 < M ? current[row]![col + 1] : null,
          ]
          const known: number[] = sideList.filter((v) => v !== null && v !== undefined)
          if (known.length > 0) {
            next[row]![col] = Math.floor(known.reduce((acc, cur) => acc + cur, 0) / known.length)
          }
        }
      }
    }
    current = next
    if (DEBUG) console.log(current.map((n) => n.map((v) => v ?? '_').join(' ')).join('\n'))
  }

  console.log(current.flatMap((row) => row.filter((v) => v !== null && T <= v)).length)
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
  const K = Number(lines[1]!)
  const checkList = Array.from({ length: K }, (_, idx) => lines[idx + 2]!.split(' ').map(Number))
  const T = Number(lines[K + 2]!)
  solve(N, M, K, checkList, T)
})
