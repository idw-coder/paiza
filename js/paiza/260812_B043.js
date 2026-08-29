function calc(H, W, h0, w0, pArr) {
  let logContent = H + ' ' + W + '\n'
  logContent += h0 + ' ' + w0 + '\n'
  for (const item of pArr) {
    logContent += item.join(' ') + '\n'
  }

  logContent += '\n--------------------------------\n\n'

  const convert = (h, w, dir, arr) => {
    const isPoor = arr[h][w] === '.'
    arr[h][w] = isPoor ? '*' : '.'
    // 移動
    if (dir === 'E') {
      dir = isPoor ? 'N' : 'S'
      h += isPoor ? -1 : 1
    } else if (dir === 'W') {
      dir = isPoor ? 'S' : 'N'
      h += isPoor ? 1 : -1
    } else if (dir === 'S') {
      dir = isPoor ? 'E' : 'W'
      w += isPoor ? -1 : 1
    } else if (dir === 'N') {
      dir = isPoor ? 'W' : 'E'
      w += isPoor ? 1 : -1
    }

    return { h, w, dir }
  }

  let h = h0 - 1
  let w = w0 - 1
  let dir = 'N'

  for (
    let i = 0;
    i < 2000 && 0 <= h && h < H && 0 <= w && w < W;
    i++
  ) {
    logContent += h + ' ' + w + ' ' + dir + '\n'
    const res = convert(h, w, dir, pArr)

    for (const item of pArr) {
      logContent += item.join(' ') + '\n'
    }
    logContent += res.h + ' ' + res.w + ' ' + res.dir + '\n'
    logContent += '\n--------------------------------\n\n'
    h = res.h
    w = res.w
    dir = res.dir
  }

  for (const item of pArr) {
    logContent += item.join(' ') + '\n'
  }
  logContent += '\n--------------------------------\n\n'

  const fs = require('fs')
  fs.writeFileSync('debug.log', logContent)

  console.log(pArr.map((i) => i.join('')).join('\n'))
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
  const H = Number(lines[0].split(' ')[0])
  const W = Number(lines[0].split(' ')[1])
  const h0 = Number(lines[1].split(' ')[0])
  const w0 = Number(lines[1].split(' ')[1])
  const pArr = []
  for (let i = 0; i < H; i++) {
    pArr.push(lines[i + 2].split(''))
  }
  calc(H, W, h0, w0, pArr)
})
