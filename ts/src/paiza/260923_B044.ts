import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(H: number, W: number, grid: (string | number)[][]) {
  if (DEBUG) console.log('\n\n' + H + ' ' + W)
  if (DEBUG) console.log(grid.map((g) => g.join('')).join('\n'), '\n')

  /**
   * 盤面の外周は全て # (壁)
   */

  /**
   * grid loop
   * iteration
   * grid[row]![col] が number の場合
   * 上下左右のマス
   */
  for (let row = 0; row < H; row++) {
    for (let col = 0; col < W; col++) {
      if (typeof grid[row]![col] === 'number') {
        getRange(row, col)
        // if (DEBUG) console.log(grid.map((g) => g.join('')).join('\n'))
        // if (DEBUG) console.log('\n')
      }
    }
  }

  function getRange(row: number, col: number) {
    const power = grid[row]![col] as number
    if (DEBUG) console.log('power ', power)
    const stopped = {
      '-row': false,
      '+row': false,
      '-col': false,
      '+col': false,
    }
    for (let i = 1; i <= power; i++) {
      if (!stopped['+row'] && row + i < H && grid[row + i]![col] === '#') {
        stopped['+row'] = true
      } else if (!stopped['+row'] && row + i < H && grid[row + i]![col] === 'X') {
        grid[row + i]![col] = '.'
        if (DEBUG) console.log('+row', grid[row + i]![col])
      }
      if (!stopped['-row'] && 0 < row - i && grid[row - i]![col] === '#') {
        stopped['-row'] = true
      } else if (!stopped['-row'] && 0 < row - i && grid[row - i]![col] === 'X') {
        grid[row - i]![col] = '.'
        if (DEBUG) console.log('-row', grid[row - i]![col])
      }
      if (!stopped['+col'] && col + i < W && grid[row]![col + i] === '#') {
        stopped['+col'] = true
      } else if (!stopped['+col'] && col + i < W && grid[row]![col + i] === 'X') {
        grid[row]![col + i] = '.'
        if (DEBUG) console.log('+col', grid[row]![col + i])
      }
      if (!stopped['-col'] && 0 < col - i && grid[row]![col - i] === '#') {
        stopped['-col'] = true
      } else if (!stopped['-col'] && 0 < col - i && grid[row]![col - i] === 'X') {
        grid[row]![col - i] = '.'
        if (DEBUG) console.log('-col', grid[row]![col - i])
      }
    }
  }

  for (const row of grid) {
    for (const col of row) {
      if (col === 'X') {
        console.log('NO')
        return
      }
    }
  }

  console.log('YES')
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
  const [H, W] = [Number(lines[0]!.split(' ')[0]), Number(lines[0]!.split(' ')[1])]
  const grid = Array.from({ length: H }, (_, i) =>
    lines[i + 1]!.split('').map((i) =>
      ['1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(i) ? Number(i) : i
    )
  )
  solve(H, W, grid)
})
