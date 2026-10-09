import readline from 'readline'
const DEBUG = !!process.env.DEBUG

type Movie = { startTime: number; endTime: number }

function solve(N: number, playList: Movie[]) {
  if (DEBUG) console.log('\n\n' + N)
  const sortedList = [...playList].sort((a, b) => a.endTime - b.endTime)
  if (DEBUG) console.table(sortedList)
  /**
┌─────────┬───────────┬─────────┐
│ (index) │ startTime │ endTime │
├─────────┼───────────┼─────────┤
│ 0       │ 2         │ 4       │
│ 1       │ 5         │ 7       │
│ 2       │ 4         │ 7       │
│ 3       │ 8         │ 10      │
└─────────┴───────────┴─────────┘
     */
  let result = 0
  let lastEnd = -Infinity
  /**
   *
   * greedy algorithm
   *
   * ## playList を 終了時間で sort
   *
   * for const movie of sortedList
   * lastEnd より movie.startTime が遅い場合
   * length++ して lastEnd を更新
   */

  for (const movie of sortedList) {
    if (lastEnd < movie.startTime) {
      result++
      lastEnd = movie.endTime
    }
  }

  console.log(result)
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
      startTime: lines[i + 1]!.split(' ').map(Number)[0]!,
      endTime: lines[i + 1]!.split(' ').map(Number)[0]! + lines[i + 1]!.split(' ').map(Number)[1]!,
    }
  })
  solve(N, list)
})
