function solve(N, H, W, sy, sx, pArr) {
  let logContent = N + ' ' + H + ' ' + W + '\n'
  logContent += sy + ' ' + sx + '\n'
  logContent += pArr.join(' ') + '\n'

  logContent += '\n--------------------------------\n\n'

  let dice = {
    f: 1,
    b: 6,
    u: 2,
    d: 5,
    l: 3,
    r: 4,
  }

  logContent += '  ' + dice.u + '\n'
  logContent += dice.l + ' ' + dice.f + ' ' + dice.r + ' (' + dice.b + ')\n'
  logContent += '  ' + dice.d + '\n'

  let curY = sy
  let curX = sx
  const handle = (y, x, dir, { f, b, u, d, l, r }) => {
    let rotated
    if (dir === 'U') {
      curY += -1
      rotated = {
        f: d,
        b: u,
        u: f,
        d: b,
        l: l,
        r: r,
      }
    } else if (dir === 'D') {
      curY += 1
      rotated = {
        f: u,
        b: d,
        u: b,
        d: f,
        l: l,
        r: r,
      }
    } else if (dir === 'L') {
      curX += -1
      rotated = {
        f: r,
        b: l,
        u: u,
        d: d,
        l: f,
        r: b,
      }
    } else if (dir === 'R') {
      curX += 1
      rotated = {
        f: l,
        b: r,
        u: u,
        d: d,
        l: b,
        r: f,
      }
    }
    return rotated
  }

  logContent += '\n--------------------------------\n\n'
  let resArr = Array.from({ length: H }, () => Array(W).fill(0))

  logContent += '\n--------------------------------\n\n'

  resArr[sy - 1][sx - 1] = dice.b
  for (let i = 0; i < N; i++) {
    dice = handle(curY, curX, pArr[i], dice)
    resArr[curY - 1][curX - 1] = dice.b

    logContent += '(' + curY + ', ' + curX + ')\n'
    logContent += '  ' + dice.u + '\n'
    logContent += dice.l + ' ' + dice.f + ' ' + dice.r + ' (' + dice.b + ')\n'
    logContent += '  ' + dice.d + '\n'
    logContent += '\n--------------------------------\n\n'
  }

  const fs = require('fs')
  fs.writeFileSync('debug.log', logContent)

  console.log('\n')
  // map((i))はiよりrowの方が直感的にわかりやすい、iは添字のイメージ
  console.log(resArr.map((i) => i.join(' ')).join('\n'))
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
  const H = Number(lines[0].split(' ')[1])
  const W = Number(lines[0].split(' ')[2])
  const sy = Number(lines[1].split(' ')[0])
  const sx = Number(lines[1].split(' ')[1])
  const pArr = lines[2].split('')
  solve(N, H, W, sy, sx, pArr)
})
