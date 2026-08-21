import readline from 'readline'
function solve(s: number, goods: number[]) {
  // console.log('\n\nlog')
  // console.log('S N')
  // console.log(s + ' ' + n)
  // console.log(goods.join(', '))

  // 組み合わせを作成して check() で評価
  function search(items: number[], check: (sum: number, min: number) => void) {
    /**
     * 以降の要素を「選ぶ / 選ばない」で全通り試す DFS
     * @param idx
     * @param sum
     * @param min
     * @returns
     */
    function step(idx: number, sum: number, min: number) {
      // 全要素の採否を決め終え1つの組み合わせが完成
      if (idx === items.length) {
        check(sum, min)
        return
      }

      // items[idx] を選ばない
      step(idx + 1, sum, min)
      // items[idx] を選ぶ
      step(idx + 1, sum + items[idx]!, Math.min(min, items[idx]!))
    }

    step(0, 0, Infinity)
  }

  let ans = 0
  const check = (sum: number, min: number) => {
    if (s <= sum && sum - min < s) ans++
  }

  search(goods, check)

  console.log(ans)
  return
}

process.stdin.resume()
process.stdin.setEncoding('utf8')

const lines: string[] = [] // 文字列専用の配列
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
reader.on('line', (line: string) => {
  lines.push(line)
})

reader.on('close', () => {
  const [S, N] = [lines[0]!, lines[1]!].map(Number) as [number, number]
  const goods: number[] = []
  for (let i = 0; i < N; i++) {
    goods.push(Number(lines[i + 2]))
  }
  solve(S, goods)
})
