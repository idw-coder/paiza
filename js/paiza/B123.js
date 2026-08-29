function calc(gridA, gridB) {
  const fs = require('fs')
  const path = require('path')

  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '———————— ' + filename + ' ———————\n'

  logContent += gridA.map((r) => {
    return (
      r.map(
        (i) => i
        // + typeof i
      ) + '  '
    )
  })
  logContent += '\n'
  logContent += gridB.map((r) => {
    return (
      r.map(
        (i) => i
        // + typeof i
      ) + '\n'
    )
  })
  logContent += '--------------------------------\n'

  const fnA = (arr1, arr2) => {
    let resultArr = []
    for (let i = 0; i < 3; i++) {
      if (arr2[0] === 'a') {
        resultArr[i] = arr1[i] === 1 || arr2[i + 1] === 1 ? 1 : 0
      } else if (arr2[0] === 'b') {
        resultArr[i] = arr1[i] === 0 || arr2[i + 1] === 0 ? 0 : 1
      } else {
        resultArr[i] = arr1[i] !== arr2[i + 1] ? 1 : 0
      }
    }
    return resultArr
  }

  for (let i = 0; i < gridB.length; i++) {
    for (let k = 0; k < gridA.length; k++) {
      gridA[k] = fnA(gridA[k], gridB[i])
    }
  }

  logContent += gridA.map((row) => row + '  ') + '\n'

  logContent += '--------------------------------\n'
  const resultArr = gridA.map((r) => Number(r.join('')))

  logContent += resultArr + '\n'
  logContent += gridA.map((r) => typeof Number(r.join(''))) + '\n'

  for (let i = 0; i < gridA.length; i++) {
    if (resultArr[i] === resultArr.reduce((a, b) => Math.max(a, b))) {
      console.log(i + 1)
    }
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
    const [C_1, C_2] = lines[0].split(' ').map((c) => Number(c))
    const gridA = lines.slice(1, C_1 + 1).map((line) => line.split(' ').map(Number))
    const gridB = lines
      .slice(C_1 + 1, C_1 + C_2 + 1)
      .map((line) => line.split(' ').map((i) => (i === '0' || i === '1' ? Number(i) : i)))

    calc(gridA, gridB)
  })
}
