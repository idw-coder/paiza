import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(h: number, w: number, grid: string[][]) {
  if (DEBUG) console.log('\n')
  if (DEBUG) console.log(h + '' + w)
  if (DEBUG) console.log(grid.map((m) => m.join('')).join('\n'))

  /**
   *
   */
  while (!grid[0]!.includes('#')) grid.shift()
  while (!grid[grid.length - 1]!.includes('#')) grid.pop()
  while (grid.every((row) => row[0]! === '.')) grid.forEach((row) => row.shift())
  while (grid.every((row) => row[grid[0]!.length - 1]! === '.')) grid.forEach((row) => row.pop())

  console.log(grid.map((m) => m.join('')).join('\n'))
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
  const [H, W] = [Number(lines[0]!.split(' ')[0]!), Number(lines[0]!.split(' ')[1]!)]
  const grid: string[][] = Array.from({ length: H }, (_, i) => lines[i + 1]!.split(''))
  solve(H, W, grid)
})
