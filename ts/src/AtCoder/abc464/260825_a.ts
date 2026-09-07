import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(s: string) {
  if (DEBUG) console.log('\n')
  if (DEBUG) console.log(s)
  /**
   *
   */
  let count = 0
  for (const el of s) {
    if (el === 'E') count++
  }

  console.log(count > s.length / 2 ? 'East' : 'West')
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
  const [S] = [lines[0]!]
  solve(S)
})
