function calc(N, M, orderArr, inputArr) {
  const fs = require('fs')
  const path = require('path')
  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '========== ' + filename + ' ==========\n'
  logContent += N + ' ' + M + '\n'
  for (let i = 0; i < orderArr.length; i++) {
    if (i === orderArr.length - 1) {
      logContent += orderArr[i] + '\n'
    } else {
      logContent += orderArr[i] + ', '
    }
  }

  logContent += 'inputArr\ny, x\n'
  for (let i = 0; i < inputArr.length; i++) {
    logContent += inputArr[i][0] + ', ' + inputArr[i][1] + '\n'
    if (i % N === N - 1) {
      logContent += '-\n'
    }
  }

  logContent += '\n--------------------------------\n'

  let res = -1
  const resArr = new Array(N).fill(0).map(() => new Array(N))

  const isFinish = (arr, player, x, y) => {
    const comp = {
      row: true,
      col: true,
      dir1: false,
      dir2: false,
    }
    // たて
    for (let row = 0; row < N; row++) {
      if (arr[row][x] !== player) {
        comp.row = false
        break
      }
    }
    // よこ
    for (let col = 0; col < N; col++) {
      if (arr[y][col] !== player) {
        comp.col = false
        break
      }
    }
    // ↘︎
    if (x === y) {
      comp.dir1 = true
      for (let i = 0; i < N; i++) {
        if (arr[i][i] !== player) {
          comp.dir1 = false
          break
        }
      }
    }
    // ↗︎
    if (N - x - 1 === y) {
      comp.dir2 = true
      for (let i = 0; i < N; i++) {
        if (arr[i][N - i - 1] !== player) {
          comp.dir2 = false
          break
        }
      }
    }
    return comp.row || comp.col || comp.dir1 || comp.dir2
  }

  for (let i = 0; i < inputArr.length; i++) {
    const player = orderArr[i % M]
    resArr[inputArr[i][0] - 1][inputArr[i][1] - 1] = player
    logContent += orderArr[(i + 1) % M] + '\n'
    if (isFinish(resArr, player, inputArr[i][1] - 1, inputArr[i][0] - 1)) {
      res = `${player} ${i + 1}`
      break
    }
  }

  for (let i = 0; i < resArr.length; i++) {
    logContent += resArr[i].join(', ') + '\n'
  }

  logContent += '\n--------------------------------\n'
  fs.writeFileSync('debug.log', logContent)

  console.log(res)
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
    const N = Number(lines[0].split(' ')[0])
    const M = Number(lines[0].split(' ')[1])
    const orderArr = lines[1].split(' ').map(Number)
    const inputArr = []
    for (let i = 0; i < Math.pow(N, 2); i++) {
      inputArr.push(lines[i + 2].split(' ').map(Number))
    }
    calc(N, M, orderArr, inputArr)
  })
}
