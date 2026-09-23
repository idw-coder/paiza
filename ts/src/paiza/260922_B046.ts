import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(N: number, n_1: number, d_1: string, n_2: number, d_2: string) {
  if (DEBUG) console.log('\n\n' + N)
  if (DEBUG) console.log(n_1 + ' ' + d_1)
  if (DEBUG) console.log(n_2 + ' ' + d_2)
  if (DEBUG) console.log(Math.PI)
  /**
   * N - S / S - N / W - E / E - W の場合 n_1 + n_2
   * N - N / S - S / W - W / E - E の場合 Math.abs(n_1 - n_2)
   * N - E / N - W / S - E / S - W /
   * W - N / W - S / E - N / E - S の場合
   * Math.abs(n_1 - n_2) + Math.min(n_1, n_2) * Math.PI / 2
   */

  const stra = new Set(['N-S', 'S-N', 'W-E', 'E-W'])
  const same = new Set(['N-N', 'S-S', 'W-W', 'E-E'])
  const notS = new Set(['N-W', 'N-E', 'S-W', 'S-E', 'W-N', 'W-S', 'E-N', 'E-S'])
  if (DEBUG) console.log([d_1, d_2])
  if (stra.has(`${d_1}-${d_2}`)) console.log((n_1 + n_2) * 100)
  else if (same.has(`${d_1}-${d_2}`)) console.log(Math.abs(n_1 - n_2) * 100)
  else if (notS.has(`${d_1}-${d_2}`))
    console.log((Math.abs(n_1 - n_2) + (Math.min(n_1, n_2) * Math.PI) / 2) * 100)
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
  const N = Number(lines[0]!)
  const [n_1, n_2] = [Number(lines[1]!.split(' ')[0]), Number(lines[2]!.split(' ')[0])]
  const [d_1, d_2] = [lines[1]!.split(' ')[1]!, lines[2]!.split(' ')[1]!]
  solve(N, n_1, d_1, n_2, d_2)
})
