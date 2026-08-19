import fs from 'fs'
import readline from 'readline'
interface Comment {
  id: number
  replyId: number | 'None'
  nice: number
  isChecked?: boolean
}
function solve(n: number, list: Comment[]) {
  let logContent = n + '\n'
  logContent += 'id  repId  nice  total' + '\n'
  list.forEach((c) => (c.isChecked = false))
  logContent +=
    list
      .map((c) => {
        return c.id + '    ' + c.replyId + '    ' + c.nice + '    ' + c.isChecked
      })
      .join('\n') + '\n\n'

  // すべて返信いいねを加算をするまでループ
  while (!list.every((l) => l.isChecked === true)) {
    for (const c of list) {
      if (c.isChecked) continue
      // ループ対象中のコメントに対していいねを加算していない返信コメントがない場合は、返信先にいいね加算
      if (list.every((l) => l.isChecked || l.replyId !== c.id)) {
        if (c.replyId !== 'None') list.find((l) => l.id === c.replyId)!.nice += c.nice
        c.isChecked = true
      }
    }
  }
  logContent +=
    list
      .map((c) => {
        return c.id + '    ' + c.replyId + '    ' + c.nice + '    ' + c.isChecked
      })
      .join('\n') + '\n'

  fs.writeFileSync('debug.log', logContent)
  console.log(list.sort((a, b) => b.nice! - a.nice! || a.id - b.id)[0]?.id)
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
  const [N] = lines[0]!.split(' ').map((n) => Number(n)) as [number]
  const commentList: Comment[] = []
  for (let i = 1; i <= N; i++) {
    commentList.push({
      id: Number(lines[i]!.split(' ')[0]!),
      replyId: lines[i]!.split(' ')[1]! === 'None' ? 'None' : Number(lines[i]!.split(' ')[1]!),
      nice: Number(lines[i]!.split(' ')[2]!),
    })
  }
  solve(N, commentList)
})
