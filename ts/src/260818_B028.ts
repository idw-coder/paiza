import fs from 'fs'
import readline from 'readline'
interface Log {
  from: number
  isGroup: number
  to: number
  message: string
}
function solve(n: number, g: number, m: number, gList: number[][], mList: Log[]) {
  let logContent = n + ' ' + g + ' ' + m + '\n'
  logContent += gList.map((g) => g.join(' ')).join('\n') + '\n'
  logContent += mList.map((m) => m.from + ' ' + m.isGroup + ' ' + m.to + ' ' + m.message).join('\n') + '\n'

  logContent += '\n'

  const ans: string[][] = Array.from({ length: n }, () => [])

  // メッセージリストでループ
  for (const obj of mList) {
    if (obj.isGroup === 0) {
      ans[obj.from - 1]?.push(obj.message)
      ans[obj.to - 1]?.push(obj.message)
    } else {
      gList[obj.to - 1]?.slice(1).forEach((n) => ans[n - 1]?.push(obj.message))
    }
  }

  fs.writeFileSync('debug.log', logContent)

  console.log(ans.map((a) => a.join('\n')).join('\n--\n'))
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
  const [n, g, m] = lines[0]!.split(' ').map((n) => Number(n)) as [number, number, number]
  const gList: number[][] = []
  for (let i = 1; i <= g; i++) {
    gList.push(lines[i]!.split(' ').map(Number))
  }
  const mList: Log[] = []
  for (let i = g + 1; i <= m + g; i++) {
    mList.push({
      from: Number(lines[i]!.split(' ')[0]!),
      isGroup: Number(lines[i]!.split(' ')[1]!),
      to: Number(lines[i]!.split(' ')[2]!),
      message: lines[i]!.split(' ')[3]!,
    })
  }
  solve(n, g, m, gList, mList)
})
