function calc(S_1, S_2) {
  const fs = require('fs')
  const path = require('path')

  let logContent = ''
  // ファイル名を取得
  const filename = path.basename(__filename)
  logContent += '———————— ' + filename + ' ———————\n'

  logContent += S_1 + '\n'
  logContent += S_2 + '\n'

  logContent += '--------------------------------\n'

  const toNum = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 'A') {
        arr[i] = 0
      } else if (arr[i] === 'B') {
        arr[i] = 1
      } else if (arr[i] === 'C') {
        arr[i] = 2
      } else if (arr[i] === 'D') {
        arr[i] = 3
      } else {
        arr[i] = 4
      }
    }
    return arr
  }

  logContent += toNum(S_1) + '\n'
  logContent += toNum(S_2) + '\n'

  logContent += '--------------------------------\n'

  const to10Demi = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] * Math.pow(5, arr.length - i - 1)
    }
    return arr
  }

  logContent += to10Demi(S_1) + '\n'
  logContent += to10Demi(S_2) + '\n'

  logContent += '--------------------------------\n'

  let total = [...S_1, ...S_2].reduce((sum, n) => sum + n, 0)
  logContent += total + '\n'

  logContent += '--------------------------------\n'

  const to5Demi = (totalNum) => {
    let resultArr = []
    let calcNum = totalNum
    for (let i = 10; i >= 0; i--) {
      let div = Math.floor(calcNum / Math.pow(5, i))
      let rem = calcNum % Math.pow(5, i)
      resultArr.push(div)
      calcNum = rem
    }
    return resultArr
  }

  logContent += to5Demi(total) + '\n'

  logContent += '--------------------------------\n'

  const toABC = (arr) => {
    let tmpArr = []
    let top0remove = true
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0 && !top0remove) {
        tmpArr.push(arr[i])
      } else if (arr[i] !== 0) {
        tmpArr.push(arr[i])
        top0remove = false
      }
    }
    for (let i = 0; i < tmpArr.length; i++) {
      if (tmpArr[i] === 0) {
        tmpArr[i] = 'A'
      } else if (tmpArr[i] === 1) {
        tmpArr[i] = 'B'
      } else if (tmpArr[i] === 2) {
        tmpArr[i] = 'C'
      } else if (tmpArr[i] === 3) {
        tmpArr[i] = 'D'
      } else if (tmpArr[i] === 4) {
        tmpArr[i] = 'E'
      }
    }

    return tmpArr.length === 0 ? 'A' : tmpArr.join('')
  }

  logContent += toABC(to5Demi(total)) + '\n'
  console.log(toABC(to5Demi(total)))

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
    const S_1 = lines[0].split(' ')[0].split('')
    const S_2 = lines[0].split(' ')[1].split('')

    calc(S_1, S_2)
  })
}
