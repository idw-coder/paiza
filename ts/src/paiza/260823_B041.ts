import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(k: number, n: number, grid: string[][]) {
  if (DEBUG) console.log('\n')
  if (DEBUG) console.log(k + '\n' + n)
  if (DEBUG) console.log(grid.map((g) => g.join('')).join('\n'))

  let count = 0
  const result = (function repeat(cur: string[][]) {
    const nxt: string[][] = Array.from({ length: cur.length * cur.length }, () => [])
    for (let curRow = 0; curRow < cur.length; curRow++) {
      for (let curCol = 0; curCol < cur.length; curCol++) {
        if (cur[curRow]![curCol] === '#') {
          for (let nxtRow = 0; nxtRow < cur.length; nxtRow++) {
            nxt[curRow * cur.length + nxtRow]!.push(...cur[nxtRow]!)
          }
        } else {
          for (let nxtRow = 0; nxtRow < cur.length; nxtRow++) {
            nxt[curRow * cur.length + nxtRow]!.push(...'.'.repeat(cur.length))
          }
        }
        // if (DEBUG) console.log(nxt.map((r) => r.join('')).join('\n'))
        // if (DEBUG) console.log('\n')
      }
    }
    count++
    if (count >= k) return nxt
    return repeat(nxt)
  })(grid)

  console.log(result!.map((r) => r.join('')).join('\n'))

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
  const [K, N] = [Number(lines[0]), Number(lines[1])]
  const grid: string[][] = []
  for (let i = 0; i < N; i++) {
    grid[i] = lines[i + 2]!.split('')
  }
  solve(K, N, grid)
})
