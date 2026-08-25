import fs from 'fs'
import readline from 'readline'

function solve(h: number, w: number, grid: string[][]) {
  let logContent = h + ' ' + w + '\n'
  logContent += grid.map((y) => y.join(' ')).join('\n') + '\n'

  logContent += '\n'

  interface MoveState {
    x: number
    y: number
    dir: 'up' | 'down' | 'left' | 'right'
  }
  /**
   * 現在の地点と進行方向とマスを引数で受け取り
   * 受け取ったマスは#にする、また
   * 移動可能の場合、移動後の地点と進行方向
   * 移動不可の場合は現在の地点を返す
   */
  const ans = (function move(curr: MoveState) {
    logContent += JSON.stringify(curr) + '\n'
    logContent += grid.map((y) => y.join(' ')).join('\n') + '\n'
    grid[curr.y]![curr.x] = '#'
    if (curr.dir === 'up') {
      if (curr.y !== 0 && grid[curr.y - 1]![curr.x] !== '#') return move({ ...curr, y: curr.y - 1 })
      else if (curr.x !== w && grid[curr.y]![curr.x + 1] !== '#') return move({ ...curr, x: curr.x + 1, dir: 'right' })
      else if (curr.x !== 0 && grid[curr.y]![curr.x - 1] !== '#') return move({ ...curr, x: curr.x - 1, dir: 'left' })
      else return curr
    }
    if (curr.dir === 'down') {
      if (curr.y !== h && grid[curr.y + 1]![curr.x] !== '#') return move({ ...curr, y: curr.y + 1 })
      else if (curr.x !== 0 && grid[curr.y]![curr.x - 1] !== '#') return move({ ...curr, x: curr.x - 1, dir: 'left' })
      else if (curr.x !== w && grid[curr.y]![curr.x + 1] !== '#') return move({ ...curr, x: curr.x + 1, dir: 'right' })
      else return curr
    }
    if (curr.dir === 'left') {
      if (curr.x !== 0 && grid[curr.y]![curr.x - 1] !== '#') return move({ ...curr, x: curr.x - 1 })
      else if (curr.y !== 0 && grid[curr.y - 1]![curr.x] !== '#') return move({ ...curr, y: curr.y - 1, dir: 'up' })
      else if (curr.y !== h && grid[curr.y + 1]![curr.x] !== '#') return move({ ...curr, y: curr.y + 1, dir: 'down' })
      else return curr
    }
    if (curr.dir === 'right') {
      if (curr.x !== w && grid[curr.y]![curr.x + 1] !== '#') return move({ ...curr, x: curr.x + 1 })
      else if (curr.y !== h && grid[curr.y + 1]![curr.x] !== '#') return move({ ...curr, y: curr.y + 1, dir: 'down' })
      else if (curr.y !== 0 && grid[curr.y - 1]![curr.x] !== '#') return move({ ...curr, y: curr.y - 1, dir: 'up' })
      else return curr
    }
  })({ x: 0, y: 0, dir: 'right' })

  fs.writeFileSync('debug.log', logContent)

  console.log(ans!.x + ' ' + ans!.y)
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
  const [H, W] = lines[0]!.split(' ').map((n) => Number(n) - 1) as [number, number]
  const grid: string[][] = []
  for (let i = 0; i <= H; i++) {
    grid.push(lines[i + 1]!.split(''))
  }

  solve(H, W, grid)
})
