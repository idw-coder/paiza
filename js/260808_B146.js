function calc(A, B, N, inputArr) {
  const fs = require('fs')
  const path = require('path')
  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '========== ' + filename + ' ==========\n'
  logContent += A + '\n'
  logContent += B + '\n'
  logContent += N + '\n'
  for (let i = 0; i < inputArr.length; i++) {
    if (i === inputArr.length - 1) {
      logContent += inputArr[i] + '\n'
    } else {
      logContent += inputArr[i] + ', '
    }
  }

  logContent += '--------------------------------\n'

  const maxHp = inputArr.reduce((a, b) => Math.max(a, b))

  let atkCount = Math.ceil(maxHp / B)

  logContent += 'atkCount — ' + atkCount + '\n'
  // 全体攻撃の回数
  for (let k = Math.ceil(maxHp / B); k >= 0; k--) {
    let total = k
    // 各モンスター
    for (let i = 0; i < N; i++) {
      // 単体攻撃
      total += Math.ceil(Math.max(0, inputArr[i] - k * B) / A)
    }
    atkCount = Math.min(atkCount, total)
  }

  logContent += '--------------------------------\n'
  fs.writeFileSync('debug.log', logContent)

  console.log(atkCount)
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
    const A = Number(lines[0].split(' ')[0])
    const B = Number(lines[0].split(' ')[1])
    const N = Number(lines[1])
    const inputArr = lines[2].split(' ').map(Number)
    calc(A, B, N, inputArr)
  })
}
