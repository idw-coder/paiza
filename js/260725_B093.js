function calc(N, M, arr1, arr2) {
  const fs = require('fs')
  const path = require('path')
  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '========== ' + filename + ' ==========\n'
  logContent += N + '\n'
  logContent += M + '\n'
  logContent += N + '\n'
  for (let i = 0; i < N; i++) {
    logContent += 'arr1[' + i + '] ' + JSON.stringify(arr1[i]) + '\n'
  }
  for (let i = 0; i < M; i++) {
    logContent += 'arr2[' + i + '] ' + JSON.stringify(arr2[i]) + '\n'
  }
  logContent += '--------------------------------\n'

  const hit = arr1
    .filter((i) => {
      return arr2.some((q) => i.content.includes(q))
    })
    .sort((a, b) => a.createdAt - b.createdAt)

  if (!hit.length) {
    console.log('None')
  }
  logContent += '--------------------------------\n'
  for (let i = 0; i < hit.length; i++) {
    logContent += 'hit[' + i + '] ' + JSON.stringify(hit[i]) + '\n'
    console.log(hit[i].id)
  }
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
    const arr1 = []
    const arr2 = []
    for (let i = 0; i < N; i++) {
      const [y, m, d] = lines[i * 2 + 2].split(' ').map(Number)
      arr1.push({
        id: i + 1,
        content: lines[i * 2 + 1].split(' ')[1],
        createdAt: new Date(y, m - 1, d),
      })
    }
    for (let i = N * 2 + 1; i < N * 2 + M + 1; i++) {
      arr2.push(lines[i].split(' ')[1])
    }

    calc(N, M, arr1, arr2)
  })
}
