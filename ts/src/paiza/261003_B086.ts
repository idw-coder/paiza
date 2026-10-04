import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(H: number, W: number, grid: string[][]) {
  if (DEBUG) console.log('\n\n' + H + ' ' + W)
  if (DEBUG) console.log(grid.map((row) => row.join('')).join('\n'))

  let min = Infinity,
    minY = 0,
    minX = 0
  let topL = grid[0]![0] === '@' ? 1 : 0
  let topR = grid[0]!.slice(1)!.filter((col) => col === '@').length
  let botL = grid.slice(1).filter((row) => row[0] === '@').length
  let botR = grid
    .slice(1)
    .reduce(
      (total, row) =>
        total + row.slice(1).reduce((rowTotal, col) => rowTotal + (col === '@' ? 1 : 0), 0),
      0
    )

  /**
   * 各ケーキについて満足度は
   * ケーキの面積 + (イチゴの個数)^2
   *
   * 4 個のケーキそれぞれについて満足度を計算したとき最大値が A で最小値が B ならば、その不公平度を
   * A - B
   */
  for (let row = 1; row < H; row++) {
    const nextRowL = row !== 1 ? (grid[row - 1]![0] === '@' ? 1 : 0) : 0
    const nextRowR = row !== 1 ? grid[row - 1]!.slice(1).filter((col) => col === '@').length : 0
    if (DEBUG) console.log('nextRowL: ' + nextRowL + ', nextRowR: ' + nextRowR)
    topL += nextRowL
    topR += nextRowR
    botL -= nextRowL
    botR -= nextRowR
    if (DEBUG) console.log(topL + ' ' + topR + ' ' + botL + ' ' + botR)

    // メモ用の変数
    let curTopL = topL,
      curTopR = topR,
      curBotL = botL,
      curBotR = botR
    for (let col = 1; col < W; col++) {
      const nextColT =
        col !== 1
          ? grid
              .slice(0, row)
              .reduce((total, curRow) => total + (curRow[col - 1] === '@' ? 1 : 0), 0)
          : 0
      const nextColB =
        col !== 1
          ? grid.slice(row).reduce((total, curRow) => total + (curRow[col - 1] === '@' ? 1 : 0), 0)
          : 0

      if (DEBUG) console.log('nextColT: ' + nextColT + ', nextColB: ' + nextColB)

      curTopL += nextColT
      curTopR -= nextColT
      curBotL += nextColB
      curBotR -= nextColB
      if (DEBUG) console.log(curTopL + ' ' + curTopR + ' ' + curBotL + ' ' + curBotR)
      const happyTopL = Math.pow(curTopL, 2) + row * col
      const happyTopR = Math.pow(curTopR, 2) + row * (W - col)
      const happyBotL = Math.pow(curBotL, 2) + (H - row) * col
      const happyBotR = Math.pow(curBotR, 2) + (H - row) * (W - col)

      const maxC = Math.max(happyTopL, happyTopR, happyBotL, happyBotR)
      const minC = Math.min(happyTopL, happyTopR, happyBotL, happyBotR)
      if (maxC - minC < min) {
        min = maxC - minC
        minY = row
        minX = col
      }
    }
  }
  console.log(minY + ' ' + minX)
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
  const [H, W] = lines[0]!.split(' ').map(Number) as [number, number]
  const c = Array.from({ length: H }, (_, i) => lines[i + 1]!.split(''))
  solve(H, W, c)
})
