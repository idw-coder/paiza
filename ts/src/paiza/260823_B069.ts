import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(h: number, w: number, grid: string[][], n: number, rewards: number[][]) {
  // if (DEBUG) console.log('\n')
  // if (DEBUG) console.log(h + ' ' + w)
  // if (DEBUG) console.log(grid.map((g) => g.join('')).join('\n'))
  // if (DEBUG) console.log(n)
  // if (DEBUG) console.log('y, x\n' + rewards.map((g) => g.join(', ')).join('\n'))

  interface Positon {
    y: number
    x: number
  }
  /**
   * recurse
   * 行動可能な y, x を 移動して checked しつつ、もし rewardsがある y, x であれば、その rewards の要素を splice する
   *
   * 終了条件
   * 行動可能な y, x を全て checked or rewards.lenght === 0
   *
   * 終了時点で
   * rewards を全て checked を判定
   */
  function recurse({ y, x }: Positon) {
    grid[y]![x] = 'checked'
    const findedIndex = rewards.findIndex((r) => r[0] === y && r[1] === x)
    if (findedIndex !== -1) rewards.splice(findedIndex, 1)
    if (rewards.length === 0) return 'YES'
    const argList: Positon[] = []
    if (0 < y && grid[y - 1]![x] === '#') argList.push({ y: y - 1, x: x })
    if (y < h - 1 && grid[y + 1]![x] === '#') argList.push({ y: y + 1, x: x })
    if (0 < x && grid[y]![x - 1] === '#') argList.push({ y: y, x: x - 1 })
    if (x < w - 1 && grid[y]![x + 1] === '#') argList.push({ y: y, x: x + 1 })
    for (const n of argList) {
      if (grid[n.y]![n.x] === 'checked') continue
      const result = recurse(n)
      if (result === 'YES') return 'YES'
    }
    return 'NO'
  }

  console.log(recurse({ y: 0, x: 0 }))

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
  const [H, W] = [Number(lines[0]!.split(' ')[0]), Number(lines[0]!.split(' ')[1])]
  const grid: string[][] = []
  for (let i = 0; i < H; i++) {
    grid[i] = lines[i + 1]!.split('')
  }
  const N = Number(lines[H + 1])
  const rewards = []
  for (let i = 0; i < N; i++) {
    rewards[i] = lines[H + 2 + i]!.split(' ').map((l) => Number(l) - 1)
  }
  solve(H, W, grid, N, rewards)
})
