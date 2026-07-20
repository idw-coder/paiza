function calc(N, M, X, grid) {
  const fs = require('fs')
  const path = require('path')

  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '========== ' + filename + ' ==========\n'

  logContent += 'N: ' + N + '\n'
  logContent += 'M: ' + M + '\n'
  logContent += 'X: ' + X + '\n'

  for (let i = 0; i < N; i++) {
    logContent += 'grid[' + i + '] ' + JSON.stringify(grid[i]) + '\n'
  }

  logContent += '--------------------------------\n'

  let gridAfter = grid.map((row) => [...row])
  for (let i = 0; i < N; i++) {
    for (let k = 0; k < M; k++) {
      if (
        (i - 1 >= 0 && grid[i][k] === grid[i - 1][k]) || // 上
        (i + 1 < N && grid[i][k] === grid[i + 1][k]) || // 下
        (k - 1 >= 0 && grid[i][k] === grid[i][k - 1]) || // 左
        (k + 1 < M && grid[i][k] === grid[i][k + 1]) // 右
      ) {
        gridAfter[i][k] = '#'
      }
    }
  }

  for (let i = 0; i < N; i++) {
    logContent += 'gridAfter[' + i + '] ' + JSON.stringify(gridAfter[i]) + '\n'
  }

  let gridVertical = []
  for (let k = 0; k < M; k++) {
    gridVertical[k] = gridAfter.map((row) => row[k])
  }

  for (let k = 0; k < M; k++) {
    logContent += 'gridVertical[' + k + '] ' + JSON.stringify(gridVertical[k]) + '\n'
  }

  logContent += '--------------------------------\n'

  for (let k = 0; k < M; k++) {
    gridVertical[k].sort((a, b) => {
      if (a === '#' && b !== '#') return -1
      if (a !== '#' && b === '#') return 1
      return 0
    })
    logContent += 'gridVertical[' + k + '] ' + JSON.stringify(gridVertical[k]) + '\n'
  }

  let resultGrid = []
  for (let i = 0; i < N; i++) {
    resultGrid[i] = gridVertical.map((row) => row[i])
  }

  for (let i = 0; i < N; i++) {
    console.log(resultGrid[i].join(' '))
  }

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
    const N = lines[0].split(' ').map(Number)[0]
    const M = lines[0].split(' ').map(Number)[1]
    const X = lines[0].split(' ').map(Number)[2]

    const grid = lines.slice(1).map((line) => line.split(' '))

    calc(N, M, X, grid)
  })
}
