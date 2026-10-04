import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(N: number, playList: number[]) {
  if (DEBUG) console.log('\n\n' + N)
  if (DEBUG) console.log(playList)
  /**
   *
   */
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
  const N = Number(lines[0])
  const list = Array.from({ length: N }, (_, i) => lines[i + 1]!.split(' ')).map(Number)
  solve(N, list)
})
