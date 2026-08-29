function calc(N, inputArr) {
  const fs = require('fs')
  const path = require('path')
  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '========== ' + filename + ' ==========\n'
  logContent += N + '\n'
  for (let i = 0; i < 9 * Math.pow(N, 2); i++) {
    if (i % (3 * N) === 0) {
      logContent += i / (3 * N) + '\n'
    }
    // logContent += 'inputArr[' + i + '] ' + JSON.stringify(inputArr[i]) + '\n'
    logContent += 'x — ' + (i % (3 * N)) + ' ' + JSON.stringify(inputArr[i]) + '\n'
    if (i % (3 * N) === 3 * N - 1) {
      logContent += '—————\n'
    }
  }
  logContent += '--------------------------------\n'

  const objArr = inputArr.map((_, i) => {
    const z = Math.floor(i / (3 * N))
    const x = Math.floor(i % (3 * N))
    return {
      z: z,
      x: x,
      y: inputArr[i],
    }
  })
  // logContent += JSON.stringify(objArr, null, 2)

  logContent += '--------------------------------\n'

  const sumArr = []
  for (let sumX = 0; sumX < N; sumX++) {
    for (let sumY = 0; sumY < N; sumY++) {
      for (let sumZ = 0; sumZ < N; sumZ++) {
        sumArr.push({ sumX, sumY, sumZ, sum: 0 })
      }
    }
  }

  logContent += JSON.stringify(sumArr, null, 2)

  logContent += '--------------------------------\n'

  for (const i of objArr) {
    const sz = Math.floor(i.z / 3)
    const sx = Math.floor(i.x / 3)

    for (let k = 0; k < 3 * N; k++) {
      // const target = sumArr.find(
      //   (s) =>
      //     s.sumX === Math.floor(i.x / 3) &&
      //     s.sumY === Math.floor(k / 3) &&
      //     s.sumZ === Math.floor(i.z / 3)
      // )
      // target.sum += i.y[k]

      // findを使用しない
      const sy = Math.floor(k / 3)
      sumArr[sx * N * N + sy * N + sz].sum += i.y[k]
    }
  }

  logContent += '--------------------------------\n'
  logContent += JSON.stringify(sumArr, null, 2)

  console.log(Math.max(...sumArr.map((s) => s.sum)))
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
    const N = Number(lines[0])
    let inputArr = []
    for (let i = 0; i < 9 * Math.pow(N, 2); i++) {
      inputArr.push(lines[i + 1].split(' ').map(Number))
    }

    calc(N, inputArr)
  })
}
