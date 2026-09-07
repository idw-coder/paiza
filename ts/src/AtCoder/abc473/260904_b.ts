import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(n: number, arr: number[]) {
  if (DEBUG) console.log('\n')
  if (DEBUG) console.log(n)
  if (DEBUG) console.log(arr.join(' '))
  let result = 0
  /**
   * Map を作成
   * キー: arr の値
   * 値: arr のその値の要素の個数
   */
  const aMap = new Map()
  for (const a of arr) {
    if (aMap.has(a)) aMap.set(a, aMap.get(a) + 1)
    else aMap.set(a, 1)
  }
  aMap.forEach((m, key) => {
    if (m % 2 !== 0) {
      result += key
    }
  })
  console.log(result)
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
  const N = Number(lines[0]!)
  const A = lines[1]!.split(' ').map(Number)
  solve(N, A)
})
