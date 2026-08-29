function calc(arr) {
  let logContent = arr.length + '\n'
  const l = arr.length
  for (let i = 0; i < l; i++) {
    logContent += i + ' ' + arr[i].join(' ') + '\n'
  }

  logContent += '\n--------------------------------\n'

  // 回転
  let rotated = new Array(l).fill(0).map(() => new Array(l))

  if (arr[l - 1][l - 1] === '.') {
    logContent += '0'
    rotated = arr
    // <┓
  } else if (arr[l - 1][0] === '.') {
    logContent += '90'
    for (let i = 0; i < l; i++) {
      for (let k = 0; k < l; k++) {
        // rotated[i][k] = arr[Math.abs(l - 1 - k)][i]
        rotated[i][k] = arr[k][Math.abs(l - 1 - i)]
      }
    }
    //
  } else if (arr[0][0] === '.') {
    logContent += '180'
    for (let i = 0; i < l; i++) {
      for (let k = 0; k < l; k++) {
        rotated[i][k] = arr[Math.abs(l - 1 - i)][Math.abs(l - 1 - k)]
      }
    }
    //
  } else {
    logContent += '270'
    for (let i = 0; i < l; i++) {
      for (let k = 0; k < l; k++) {
        // rotated[i][k] = arr[k][Math.abs(l - 1 - i)]
        rotated[i][k] = arr[Math.abs(l - 1 - k)][i]
      }
    }
  }

  logContent += '\n--------------------------------\n'

  for (let i = 0; i < l; i++) {
    logContent += rotated[i].join(' ') + '\n'
  }

  logContent += '\n--------------------------------\n'
  let res = 0

  for (let i = 1; i < l - 1; i++) {
    for (let k = 1; k < l - 1; k++) {
      if (rotated[i][k] === '#') {
        if (i === 1 && k === 1) res += Math.pow(2, 24)
        if (i === 1 && k === 2) res += Math.pow(2, 23)
        if (i === 1 && k === 3) res += Math.pow(2, 22)
        if (i === 1 && k === 4) res += Math.pow(2, 21)
        if (i === 1 && k === 5) res += Math.pow(2, 20)
        //
        if (i === 2 && k === 1) res += Math.pow(2, 19)
        if (i === 2 && k === 2) res += Math.pow(2, 18)
        if (i === 2 && k === 3) res += Math.pow(2, 17)
        if (i === 2 && k === 4) res += Math.pow(2, 16)
        if (i === 2 && k === 5) res += Math.pow(2, 15)
        //
        if (i === 3 && k === 1) res += Math.pow(2, 14)
        if (i === 3 && k === 2) res += Math.pow(2, 13)
        if (i === 3 && k === 3) res += Math.pow(2, 12)
        if (i === 3 && k === 4) res += Math.pow(2, 11)
        if (i === 3 && k === 5) res += Math.pow(2, 10)
        //
        if (i === 4 && k === 1) res += Math.pow(2, 9)
        if (i === 4 && k === 2) res += Math.pow(2, 8)
        if (i === 4 && k === 3) res += Math.pow(2, 7)
        if (i === 4 && k === 4) res += Math.pow(2, 6)
        if (i === 4 && k === 5) res += Math.pow(2, 5)
        //
        if (i === 5 && k === 1) res += Math.pow(2, 4)
        if (i === 5 && k === 2) res += Math.pow(2, 3)
        if (i === 5 && k === 3) res += Math.pow(2, 2)
        if (i === 5 && k === 4) res += Math.pow(2, 1)
        if (i === 5 && k === 5) res += Math.pow(2, 0)
      }
    }
  }

  const fs = require('fs')
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
    const inputArr = []
    for (let i = 0; i < 7; i++) {
      inputArr.push(lines[i].split(''))
    }
    calc(inputArr)
  })
}
