import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(N: number, X: number, a: number[]) {
  if (DEBUG) console.log('\n\n' + N + ' ' + X)
  if (DEBUG) console.log(a)
  let current = X
  let result = 0
  const sorted = a.sort((a, b) => b - a)
  if (DEBUG) console.log(sorted)
  /**
   * 自分の大きさ以下のスライムを取り込んで、取り込んだ分だけ大きくなることができます
   * 自分が王になったとき民がいなくては困る
   */
  if (current < sorted[sorted.length - 1]!) {
    console.log(-1)
    return
  }
  while (current <= sorted[0]!) {
    for (let i = 0; i < N; i++) {
      if (sorted[i]! <= current) {
        current += sorted[i]!
        if (DEBUG) console.log('i ' + i + ', current ' + current)
        result++
        break
      }
    }
  }
  console.log(result)
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
  const a = lines[1]!.split(' ').map(Number)
  solve(N, X, a)
})
