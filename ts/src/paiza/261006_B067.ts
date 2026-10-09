import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(
  N: number,
  taskList: { requiredDays: number; startDays: number; endDays: number; doneDays: number }[]
) {
  console.error('\n\n' + N)
  if (DEBUG) console.table(taskList)
  /*
   * 各タスクは開始日から着手でき、終了日までの間に必要日数分こなせば完了です。
   *
   * 与えられた優先度順に並べられているタスクから、実行可能な優先度の一番高いタスクを常に実行する際、
   * 全てのタスクを終了日までに完了できる場合は "YES"、
   * なんらかのタスクを終了日までに完了できない場合は "NO" を出力
   *
   *
   */

  for (let day = 1; ; day++) {
    console.error('i ' + day + '\n')
    if (taskList.some((t) => t.doneDays < t.requiredDays && t.endDays < day)) {
      console.log('NO')
      return
    }
    if (taskList.every((t) => t.doneDays === t.requiredDays)) {
      console.log('YES')
      return
    }
    // startDays以降 && doneDays < requiredDays
    const current = taskList.find((t) => t.startDays <= day && t.doneDays < t.requiredDays)
    if (current) {
      current.doneDays++
      console.error(current)
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
  const N = Number(lines[0])
  const list = Array.from({ length: N }, (_, i) => {
    return {
      requiredDays: lines[i + 1]!.split(' ').map(Number)[0]!,
      startDays: lines[i + 1]!.split(' ').map(Number)[1]!,
      endDays: lines[i + 1]!.split(' ').map(Number)[2]!,
      doneDays: 0,
    }
  })
  solve(N, list)
})
