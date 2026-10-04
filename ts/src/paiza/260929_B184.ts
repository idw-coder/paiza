import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(H: number, W: number, table: number[][], chanceList: number[]) {
  if (DEBUG) console.log('\n\n' + H + ' ' + W)
  if (DEBUG) console.log(table.join('\n'))
  if (DEBUG) console.log(chanceList)

  /**
   *
   */

  for (let i = 0; ; i++) {
    const row = table.findIndex((t) => t.includes(chanceList[i]!))
    const col = table[row]!.findIndex((t) => t === chanceList[i])
    table[row]![col] = 0

    for (const row of table) {
      let sum = 0
      for (const col of row) {
        sum += col
        if (sum > 0) break
      }
      if (sum === 0) {
        console.log(i + 1)
        return
      }
    }

    for (let col = 0; col < W; col++) {
      let sum = 0
      for (const row of table) {
        sum += row[col]!
        if (sum > 0) break
      }
      if (sum === 0) {
        console.log(i + 1)
        return
      }
    }
  }
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
  const [H, W] = lines[0]!.split(' ').map(Number) as [number, number]
  const c = Array.from({ length: H }, (_, i) => lines[i + 1]!.split(' ').map(Number))
  const N = lines[H + 1]!.split(' ').map(Number)
  solve(H, W, c, N)
})
