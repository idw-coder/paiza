function calc(H, W, N, point, grid) {
  const fs = require('fs')
  const path = require('path')
  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '========== ' + filename + ' ==========\n'
  logContent += H + '\n'
  logContent += W + '\n'
  logContent += N + '\n'
  logContent += point.x + '\n'
  logContent += point.y + '\n'
  for (let i = 0; i < H; i++) {
    logContent += 'grid[' + i + '] ' + JSON.stringify(grid[i]) + '\n'
  }
  logContent += '--------------------------------\n'

  const radius = Math.floor(N / 2)
  const changeGrid = grid
    .slice(
      // 中心（point.y）から N/2 -Y方向に移動した場所が 0 以上
      radius < point.y - 1 ? point.y - 1 - radius : 0,
      point.y - 1 + radius < H - 1 ? point.y - 1 + radius + 1 : H - 1 + 1
    )
    .map((i) =>
      i.slice(
        radius < point.x - 1 ? point.x - 1 - radius : 0,
        point.x - 1 + radius < W - 1 ? point.x - 1 + radius + 1 : W - 1 + 1
      )
    )

  for (let i = 0; i < changeGrid.length; i++) {
    logContent += 'changeGrid[' + i + '] ' + JSON.stringify(changeGrid[i]) + '\n'
  }

  console.log(
    [].concat(...changeGrid).filter((n) => {
      return n === '.'
    }).length
  )

  logContent += '--------------------------------\n'
  fs.writeFileSync('debug.log', logContent)
  return
}

module.exports = { calc }

// テスト時は標準入力処理をスキップ
if (require.main === module) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')

  var lines = []
  var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  reader.on('line', (line) => {
    lines.push(line)
  })

  reader.on('close', () => {
    const H = lines[0].split(' ')[0]
    const W = lines[0].split(' ')[1]
    const N = lines[0].split(' ')[2]
    const point = {
      x: Number(lines[1].split(' ')[1]),
      y: Number(lines[1].split(' ')[0]),
    }
    const grid = lines.slice(2).map((i) => i.split(''))

    calc(H, W, N, point, grid)
  })
}
Number()
