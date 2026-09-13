import readline from 'readline'
const DEBUG = !!process.env.DEBUG
type Day = 'off' | 'work'
function solve(N: number, M: number, s: Day[]) {
  if (DEBUG) console.log('\n\n' + N + ' ' + M, '\n' + s.join(' '))

  let max = 0
  /**
   * アルゴリズム
   * しゃくとり法（Two Pointers / Sliding Window）
   * https://atcoder.jp/contests/awc0056/editorial/18868
   */

  for (let left = 0; left < s.length - M; left++) {
    let right = left + 1
    let rest = M
    if (s[left] === 'work' && rest === 0) continue
    else if (s[left] === 'work' && 0 < rest) rest--
    while (right <= s.length - 1) {
      if (s[right] === 'off') right++
      else if (1 <= rest) {
        rest--
        right++
      } else {
        break
      }
    }
    max = Math.max(max, right - left)
  }
  console.log(max)
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
  const [N, M] = lines[0]!.split(' ').map(Number) as [number, number]
  const s = Array.from({ length: N }, (_, idx) => lines[idx + 1]!) as Day[]

  solve(N, M, s)
})
