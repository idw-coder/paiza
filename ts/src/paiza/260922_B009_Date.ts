import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(N: number, speakerList: [string, number][]) {
  let totalTime = 10 * 60
  let isBreak = false

  if (DEBUG) console.log('\n\n' + N)
  if (DEBUG) console.log(speakerList)
  /**
   * 発表予定者のトーク終了予定時刻（現在の発表者の終了時刻 + 10分休憩 + 次の発表者の持ち時間）が
   * 12:01 以降になる場合においては、現在のトークが終了後、10分休憩の代わりに1時間のお昼休憩を一度だけとります。
   *
   * iteration speakerList
   *  totalTime が 12:00 > 0
   *    true:  50 を totalTime に追加 totalTime 出力 totalTime + speaker.time を出力
   *    false: 50 を --------------- totalTime 出力 totalTime + speaker.time を出力
   */

  for (const speaker of speakerList) {
    if (totalTime !== 10 * 60) totalTime += 10
    if (DEBUG) console.log(totalTime)

    const result: string[] = []
    if (!isBreak && 12 * 60 < totalTime + speaker[1]) {
      totalTime += 50
      isBreak = true
      result.push(toHourMin(totalTime))
    } else result.push(toHourMin(totalTime))
    totalTime += speaker[1]!
    result.push(toHourMin(totalTime))
    console.log(result.join(' - ') + ' ' + speaker[0])
    if (DEBUG) console.log('\n')
  }
}

/**
 *
 * @param min
 * @returns
 */
function toHourMin(min: number) {
  return new Date(min * 60 * 1_000).toISOString().slice(11, 16)
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
  const t = Array.from({ length: N }, (_, i) => {
    const [name, time] = lines[i + 1]!.split(' ')
    return [name, Number(time)] as [string, number]
  })
  solve(N, t)
})
