import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(N: number, X: number, list: number[][]) {
  const resultList = {
    item_1: -Infinity,
    item_2: -Infinity,
    item_3: -Infinity,
  }
  if (DEBUG) console.log('\n\nnum: ' + N + ', Setting: ' + X)
  if (DEBUG) console.log(list)
  /**
   * おかずは N 種類あり、その中から1つ以上3つ以下選ぶことができます。
   * ただし、同じおかずを重複して選ぶことはできません。
   * 日替わり弁当の値段がちょうど X 円になるような組み合わせの中で
   * もっとも満足できるようにおかずを決めたときの日替わり弁当の満足度を出力してください。
   * ・3 ≦ N ≦ 100
   * ・300 ≦ X ≦ 3,000
   * ・100 ≦ v_i ≦ 1,000 (1 ≦ i ≦ N)
   * ・-100 ≦ a_i ≦ 100 (1 ≦ i ≦ N)
   */
  for (let item_1 = 0; item_1 < N; item_1++) {
    const totalV1 = list[item_1]![0]!
    if (totalV1 === X) resultList.item_1 = Math.max(resultList.item_1, list[item_1]![1]!)
    for (let item_2 = item_1 + 1; item_2 < N; item_2++) {
      const totalV2 = list[item_1]![0]! + list[item_2]![0]!
      if (totalV2 === X)
        resultList.item_2 = Math.max(resultList.item_2, list[item_1]![1]! + list[item_2]![1]!)
      for (let item_3 = item_2 + 1; item_3 < N; item_3++) {
        const totalV3 = list[item_1]![0]! + list[item_2]![0]! + list[item_3]![0]!
        if (totalV3 === X)
          resultList.item_3 = Math.max(
            resultList.item_3,
            list[item_1]![1]! + list[item_2]![1]! + list[item_3]![1]!
          )
      }
    }
  }
  console.log(Math.max(resultList.item_1, resultList.item_2, resultList.item_3))
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
  const [N, X] = [Number(lines[0]!.split(' ')[0]), Number(lines[0]!.split(' ')[1])]
  const list = Array.from({ length: N }, (_, i) => [
    Number(lines[1]!.split(' ')[i]!),
    Number(lines[2]!.split(' ')[i]!),
  ])
  solve(N, X, list)
})
