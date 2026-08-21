import readline from 'readline'
function solve(o: number, s: number, t: number, x: number, y: number, a: number) {
  // console.log('\n\nlog')
  // console.log(' o  s  t')
  // console.log(o + ' ' + s + ' ' + t)
  // console.log(' x  y  a')
  // console.log(x + ' ' + y + ' ' + a)

  const g = 9.8
  const rad = (t * Math.PI) / 180
  const ans = Math.abs(
    // prettier-ignore
    y - (o + x * Math.tan(rad) - (g * Math.pow(x, 2)) / (2 * Math.pow(s * Math.cos(rad), 2)))
  )

  console.log(ans <= a / 2 ? 'Hit ' + Math.round(ans * 10) / 10 : 'Miss')
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
  const [o, s, t] = lines[0]!.split(' ').map((n) => Number(n)) as [number, number, number]
  const [x, y, a] = lines[1]!.split(' ').map((n) => Number(n)) as [number, number, number]
  solve(o, s, t, x, y, a)
})
