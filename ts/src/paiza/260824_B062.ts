import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(n: number, h: number, w: number, grid: string[][]) {
  // if (DEBUG) console.log('\n')
  // if (DEBUG) console.log(n)
  // if (DEBUG) console.log(h + ' ' + w)
  // if (DEBUG) console.log(grid.map((g) => g.join('')).join('\n'))
  interface Position {
    y: number
    x: number
    dir: 'u' | 'd' | 'l' | 'r'
  }
  let checked = 0
  let pos: Position = { y: 0, x: 0, dir: 'r' }
  /**
   *
   */
  for (let i = 0; i < n; i++) {
    // check
    if (grid[pos.y]![pos.x] === '#') {
      checked++
      if (n <= checked) break
    }
    grid[pos.y]![pos.x] = '/'
    // 移動
    const nxt = move({ y: pos.y, x: pos.x, dir: pos.dir })
    if (nxt.y === pos.y && nxt.x === pos.x && nxt.dir === pos.dir) break
    pos = nxt
    // if (DEBUG) console.log(i)
    // if (DEBUG) console.log(grid.map((g) => g.join('')).join('\n'))
    // if (DEBUG) console.log('\n')
  }

  function move({ y, x, dir }: Position) {
    let nxt: Position = {
      y,
      x,
      dir,
    }
    if (
      (0 === y || grid[y - 1]![x] === '/') &&
      (x === w - 1 || grid[y]![x + 1] === '/') &&
      (y === h - 1 || grid[y + 1]![x] === '/') &&
      (0 === x || grid[y]![x - 1] === '/')
    ) {
      return nxt
    }
    if (dir === 'u') {
      if (0 < y && grid[y - 1]![x] !== '/') nxt.y--
      else {
        nxt.dir = 'r'
        nxt = move(nxt)
      }
    }
    if (dir === 'r') {
      if (x < w - 1 && grid[y]![x + 1] !== '/') nxt.x++
      else {
        nxt.dir = 'd'
        nxt = move(nxt)
      }
    }
    if (dir === 'd') {
      if (y < h - 1 && grid[y + 1]![x] !== '/') nxt.y++
      else {
        nxt.dir = 'l'
        nxt = move(nxt)
      }
    }
    if (dir === 'l') {
      if (0 < x && grid[y]![x - 1] !== '/') nxt.x--
      else {
        nxt.dir = 'u'
        nxt = move(nxt)
      }
    }

    return nxt
  }

  console.log(checked)
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
  const [N, H, W] = [
    Number(lines[0]!),
    Number(lines[1]!.split(' ')[0]),
    Number(lines[1]!.split(' ')[1]),
  ]
  const grid: string[][] = []
  for (let i = 0; i < H; i++) {
    grid[i] = lines[i + 2]!.split('')
  }
  solve(N, H, W, grid)
})
