import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(
  H: number,
  W: number,
  grid: string[][],
  sX: number,
  sY: number,
  dirList: ('U' | 'D' | 'L' | 'R')[]
) {
  if (DEBUG)
    console.log(
      '\n\n' + H + ' ' + W + '\n' + grid.map((g) => g.join('')).join('\n'),
      '\n' + sX + ' ' + sY + '\n' + dirList.join(' ')
    )

  const current = {
    x: sX - 1,
    y: sY - 1,
  }
  const dir = {
    x: { U: 0, D: 0, L: -1, R: 1 },
    y: { U: -1, D: 1, L: 0, R: 0 },
  }
  /**
   * 土の床のマスにくるか壁にぶつかるまで、足を出した方向に滑り続けてしまいます
   * 土: '.', 氷: '#'
   * N 回の各移動の方向が与えられるので、 N 回の移動を終えた後にあなたがいるマスの座標を答えてください。
   */
  for (const d of dirList) {
    while (true) {
      // if (DEBUG) console.log(d)
      // if (DEBUG) console.log(dir.y[d] + ' ' + dir.x[d])
      // if (DEBUG) console.log(current)
      const nextY = current.y + dir.y[d]
      const nextX = current.x + dir.x[d]
      if (nextY < 0 || H <= nextY || nextX < 0 || W <= nextX) break
      current.y = nextY
      current.x = nextX
      if (grid[current.y]![current.x] === '.') break
    }
  }
  const result = { x: current.x + 1, y: current.y + 1 }
  console.log(result.x + ' ' + result.y)
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
  const grid: string[][] = Array.from({ length: H }, (_, idx) => lines[idx + 1]!.split(''))
  const [sX, sY] = lines[H + 1]!.split(' ').map(Number) as [number, number]
  const N = Number(lines[H + 2]!)
  const dirList = Array.from({ length: N }, (_, idx) => lines[idx + H + 3]!) as (
    'U' | 'D' | 'L' | 'R'
  )[]

  solve(H, W, grid, sX, sY, dirList)
})
