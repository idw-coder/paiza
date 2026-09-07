import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(n: number, m: number, rankings: number[][]) {
  if (DEBUG) console.log('\n')
  if (DEBUG) console.log(n + ' ' + m)
  if (DEBUG) console.log(rankings.map((r) => r.join(' ')).join('\n'))
  interface PlayerInfo {
    avgRanking: number
    isEntry: boolean
    ranking: number
  }

  const plyerInfoList: PlayerInfo[] = Array.from({ length: n }, () => {
    return { avgRanking: 0, isEntry: false, ranking: 0 }
  })
  for (let i = 0; i < n; i++) {
    // avgRankings[i] = rankings[i]!.reduce((acc, curr) => acc + curr) / m
    for (let k = 0; k < m; k++) {
      plyerInfoList[i]!.avgRanking += rankings[i]![k]! / m
      /**
       * 1 曲でも 3 位以内に入ったことのある選手が敗者復活戦に進出
       */
      if (rankings[i]![k]! <= 3) plyerInfoList[i]!.isEntry = true
    }
  }
  /**
   * 平均順位の値が同じ選手の最終的な順位は同じになります。最終的な順位が同じ x 位の選手が y 人いる場合、その次の最終的な順位は x + y 位になります。
   */
  const sorted: PlayerInfo[] = plyerInfoList.sort((a, b) => a.avgRanking - b.avgRanking)
  if (DEBUG) console.log(sorted)

  let prevAvgRanking: number | null = null
  let prevRanking: number = 0
  sorted.forEach((s, i) => {
    if (s.avgRanking === prevAvgRanking) s.ranking = prevRanking
    else {
      s.ranking = i + 1
      prevRanking = i + 1
      prevAvgRanking = s.avgRanking
    }
  })
  if (DEBUG) console.log(sorted)

  /**
   * 最終的な順位が 3 位以内の選手を除外
   */
  console.log(plyerInfoList.filter((a) => a.ranking > 3 && a.isEntry === true).length)
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
  const [N, M] = [Number(lines[0]!.split(' ')[0]), Number(lines[0]!.split(' ')[1])]
  const rankings: number[][] = []
  for (let i = 0; i < N; i++) {
    rankings[i] = lines[i + 1]!.split(' ').map(Number)
  }
  solve(N, M, rankings)
})
