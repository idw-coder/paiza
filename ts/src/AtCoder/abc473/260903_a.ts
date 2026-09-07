import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(n: number, a: number[]) {
  if (DEBUG) console.log('\n')
  if (DEBUG) console.log(n)
  if (DEBUG) console.log(a.join(' '))
  /**
   *
   */

  a.splice(0, n / 2)
  console.log(
    a.reduce((acc, cur) => {
      return acc + cur
    }, 0)
  )
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
