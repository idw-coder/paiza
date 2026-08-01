function calc(N, M, K, arr) {
  const fs = require('fs')
  const path = require('path')
  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '========== ' + filename + ' ==========\n'
  logContent += N + '\n'
  logContent += M + '\n'
  logContent += K + '\n'
  for (let i = 0; i < K; i++) {
    logContent += 'arr[' + i + '] ' + JSON.stringify(arr[i]) + '\n'
  }
  logContent += '--------------------------------\n'

  const fn = (n, m, arr) => {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (0 <= n + dr - 1 && n + dr - 1 < N && 0 <= m + dc - 1 && m + dc - 1 < M) {
          arr[n + dr - 1][m + dc - 1] = 1
        }
      }
    }
  }

  logContent += '--------------------------------\n'

  const resArr = Array.from({ length: N }, () => new Array(M).fill(0))

  arr.map((i) => {
    fn(i[0], i[1], resArr)
    for (let i = 0; i < N; i++) {
      logContent += 'resArr[' + i + '] ' + JSON.stringify(resArr[i]) + '\n'
    }

    logContent += '--------------------------------\n'
  })
  console.log(resArr.flat(1).reduce((acc, cur) => acc + cur))

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
    const N = Number(lines[0].split(' ')[0])
    const M = Number(lines[0].split(' ')[1])
    const K = Number(lines[1])
    let arr = []
    for (let i = 0; i < K; i++) {
      arr.push(lines[i + 2].split(' ').map(Number))
    }

    calc(N, M, K, arr)
  })
}
