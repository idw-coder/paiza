import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(N: number, M: number, itemList: number[], couponList: number[][]) {
  itemList.sort((a, b) => b - a)
  couponList.sort((a, b) => b[0]! - a[0]!)
  if (DEBUG)
    console.log(
      '\n\n' + N + ' ' + M,
      '\n' + itemList.join(' '),
      '\n' + couponList.map((c) => c.join(' ')).join('\n')
    )

  let appliedIdx = 0
  /**
   * 商品の値段を超えた額のクーポン券の使用によって商品の値段を 0 未満にすることはできません。その場合は0円となります。
   * また、一つの商品につきクーポン券は一枚のみ使用できます。
   * クーポン券を適切に使用し、全ての商品の支払い総額の最小値を出力
   */
  // 各値段のクーポン
  for (let i = 0; i < M; i++) {
    if (DEBUG) console.log(itemList.join(' '))
    let nextIdx = 0
    // クーポンの枚数でループ
    for (let j = appliedIdx; j < N; j++) {
      if (j - appliedIdx < couponList[i]![1]!) {
        itemList[j] = itemList[j]! - couponList[i]![0]! > 0 ? itemList[j]! - couponList[i]![0]! : 0
        nextIdx++
      }
    }
    appliedIdx += nextIdx
    if (DEBUG) console.log(itemList.join(' '))
  }

  console.log(itemList.reduce((acc, curr) => acc + curr, 0))
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
  const a = lines[1]!.split(' ').map(Number)
  const couponList = Array.from({ length: M }, (_, idx) => lines[idx + 2]!.split(' ').map(Number))

  solve(N, M, a, couponList)
})
