import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(n: number, l: number, r: number, s: string) {
  // 必要な区間を考える
  if (DEBUG) console.log('\n')
  let pos = 0
  let out = ''
  let prev = ''
  for (const m of s.matchAll(/\d+|\D/g)) {
    if (/\D/.test(m[0])) prev = m[0]
    else {
      const num = Number(m[0])
      if (pos < l && l < pos + num && pos + num < r) {
        if (DEBUG) console.log(prev.repeat(pos + num - l + 1))
        out += prev.repeat(pos + num - l + 1)
      } else if (pos < l && r <= pos + num) {
        out += prev.repeat(r - l + 1)
        if (DEBUG) console.log(prev.repeat(r - l + 1))
        break
      } else if (l <= pos && pos + num < r) {
        if (DEBUG) console.log(prev.repeat(num))
        out += prev.repeat(num)
      } else if (l < pos && r <= pos + num) {
        if (DEBUG) console.log(prev.repeat(r - pos))
        out += prev.repeat(r - pos)
        break
      }
      pos += num
    }
  }
  if (DEBUG) console.log('\n\n')
  if (DEBUG) console.log(n + '\n' + l + ' ' + r)
  if (DEBUG) console.log(JSON.stringify(s.split('')))
  if (DEBUG) console.log(JSON.stringify([...s.matchAll(/\d+|\D/g)].map((m) => m[0])))
  console.log(out)

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
  const N = Number(lines[0])
  const [L, R] = lines[1]!.split(' ').map(Number) as [number, number]
  const S = lines[2]!
  solve(N, L, R, S)
})
