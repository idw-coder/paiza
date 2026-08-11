function calc(N, K, pArr) {
  let logContent = N + ' ' + K + '\n\n'
  for (const item of pArr) {
    logContent += item + ', '
  }

  logContent += '\n--------------------------------\n\n'

  let arr = []
  for (let i = 0; i < N; i++) {
    for (let j = 1; j <= K; j++) {
      arr.push({
        party: i,
        point: Math.floor(pArr[i] / j),
        originPoint: pArr[i],
      })
    }
  }

  for (const item of arr) {
    logContent += item.party + ' - ' + item.point + '\n'
  }

  const sorted = arr.sort((a, b) => {
    if (b.point !== a.point) {
      return b.point - a.point
    } else {
      return b.originPoint - a.originPoint
    }
  })
  logContent += '\n--------------------------------\n\n'

  for (const item of sorted) {
    logContent += `${item.party} - ${item.point} ( ${item.originPoint} ) \n`
  }

  logContent += '\n--------------------------------\n\n'
  let resArr = new Array(N).fill(0)

  for (let i = 0; i < K; i++) {
    resArr[sorted[i].party]++
  }

  const fs = require('fs')
  fs.writeFileSync('debug.log', logContent)

  console.log(resArr.join('\n'))
  return
}

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
  const K = Number(lines[0].split(' ')[1])
  const pArr = []
  for (let i = 0; i < N; i++) {
    pArr.push(Number(lines[i + 1]))
  }
  calc(N, K, pArr)
})
