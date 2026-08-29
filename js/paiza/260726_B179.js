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
  for (let i = 0; i < M; i++) {
    logContent += 'arr[' + i + '] ' + JSON.stringify(arr[i]) + '\n'
  }
  logContent += '--------------------------------\n'

  let result = 0
  let index = 0

  const combine = (index, selectedArr) => {
    // 選択肢のインデックス || 選択した数
    if (selectedArr.length === K) {
      if (
        selectedArr.reduce((previousValue, currentValue) => {
          return previousValue + currentValue
        }, 0) %
          N ===
        0
      ) {
        result++
      }
      return
    }
    if (index === M) {
      return
    }
    combine(index + 1, [...selectedArr, arr[index]])
    combine(index + 1, selectedArr)
  }

  combine(index, [])

  logContent += '--------------------------------\n'
  console.log(result)
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
    const K = Number(lines[0].split(' ')[2])
    const arr = lines[1].split(' ').map(Number)

    calc(N, M, K, arr)
  })
}
