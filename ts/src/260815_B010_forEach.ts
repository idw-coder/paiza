import fs from 'fs'
import readline from 'readline'

function solve(t: string, u: number, a: number[], b: number[]) {
  let logContent = t + ' ' + u + '\n'
  logContent += a.join(', ') + '\n'
  logContent += b.join(', ') + '\n'

  const isA = t === 'A'
  const isB = t === 'B'
  const passerX = isA ? a[u]! : b[u]!
  logContent += passerX + '\n'

  const isOffside = (x: number) => {
    logContent += '\n' + x
    if (isA && passerX < x && [...b].sort((l, r) => r - l)[1]! < x) {
      logContent += ' true'
      return true
    } else if (isB && x < passerX && x < [...a].sort((l, r) => l - r)[1]!) {
      logContent += ' true'
      return true
    } else {
      logContent += ' false'
      return false
    }
  }

  const result: number[] = []
  if (isA) a.forEach((el, idx) => isOffside(el) && result.push(idx + 1))
  if (isB) b.forEach((el, idx) => isOffside(el) && result.push(idx + 1))

  fs.writeFileSync('debug.log', logContent)

  console.log('\n')
  console.log(result.length ? result.join('\n') : 'None')
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
  const T = lines[0]!.split(' ')[0]!
  const U = Number(lines[0]?.split(' ')[1]) - 1
  const A = lines[1]!.split(' ').map(Number)
  const B = lines[2]!.split(' ').map(Number)

  solve(T, U, A, B)
})
