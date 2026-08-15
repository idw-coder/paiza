import fs from 'fs'
import readline from 'readline'

function solve(N: number, lists: number[][]) {
  let logContent = N + '\n'
  const vertLists: number[][] = []
  const horiLists: number[][] = []
  for (const list of lists) {
    logContent += list.join(' ') + '\n'
    if (list[0] === list[2]) vertLists.push(list)
    if (list[1] === list[3]) horiLists.push(list)
  }

  const sXVlists = [...vertLists].sort((a, b) => a[1]! - b[1]!).sort((a, b) => a[0]! - b[0]!)
  const sYHlists = [...horiLists].sort((a, b) => a[0]! - b[0]!).sort((a, b) => a[1]! - b[1]!)

  logContent += '\nXsorted ┃ ┃ Vertical \n'
  for (const list of sXVlists) {
    logContent += list.join(' ') + '\n'
  }
  logContent += '\nYsorted ━ ━ Horizontal \n'
  for (const list of sYHlists) {
    logContent += list.join(' ') + '\n'
  }

  interface LineV {
    fixedX: number
    y: { start: number; end: number }
  }
  interface LineH {
    x: { start: number; end: number }
    fixedY: number
  }
  const cross = (lVert: LineV, lHori: LineH) => {
    if (
      // y
      lVert.y.start <= lHori.fixedY &&
      lHori.fixedY <= lVert.y.end &&
      // x
      lHori.x.start <= lVert.fixedX &&
      lVert.fixedX <= lHori.x.end
    ) {
      logContent += '(' + lVert.fixedX + ', ' + lHori.fixedY + ')\n'
      return {
        x: lVert.fixedX,
        y: lHori.fixedY,
      }
    } else {
      return false
    }
  }

  const calc = (v1: LineV, v2: LineV, h1: LineH, h2: LineH) => {
    // 並行している線分が重なっていない
    // ┃ ┃
    if (v1.y.end <= v2.y.start) return 0
    if (v2.y.end <= v1.y.start) return 0
    // ━ ━
    if (h1.x.end <= h2.x.start) return 0
    if (h2.x.end <= h1.x.start) return 0
    // 交差しているか
    const upperLeft = cross(v1, h1)
    const upperRight = cross(v2, h1)
    const lowerLeft = cross(v1, h2)
    const lowerRight = cross(v2, h2)
    if (!upperLeft || !upperRight || !lowerLeft || !lowerRight) return 0
    logContent += '\n'
    logContent += `${v2.fixedX - v1.fixedX} * ${h2.fixedY - h1.fixedY}\n`
    logContent += (v2.fixedX - v1.fixedX) * (h2.fixedY - h1.fixedY) + '\n'
    return (v2.fixedX - v1.fixedX) * (h2.fixedY - h1.fixedY)
  }

  const vertPairs: [LineV, LineV][] = []
  for (let i = 0; i < sXVlists.length; i++) {
    for (let j = i + 1; j < sXVlists.length; j++) {
      vertPairs.push([
        { fixedX: sXVlists[i]![0]!, y: { start: sXVlists[i]![1]!, end: sXVlists[i]![3]! } },
        { fixedX: sXVlists[j]![0]!, y: { start: sXVlists[j]![1]!, end: sXVlists[j]![3]! } },
      ])
    }
  }
  const horiPairs: [LineH, LineH][] = []
  for (let i = 0; i < sYHlists.length; i++) {
    for (let j = i + 1; j < sYHlists.length; j++) {
      horiPairs.push([
        { x: { start: sYHlists[i]![0]!, end: sYHlists[i]![2]! }, fixedY: sYHlists[i]![1]! },
        { x: { start: sYHlists[j]![0]!, end: sYHlists[j]![2]! }, fixedY: sYHlists[j]![1]! },
      ])
    }
  }

  let result = Infinity
  for (let i = 0; i < vertPairs.length; i++) {
    for (let j = 0; j < horiPairs.length; j++) {
      const curr = calc(vertPairs[i]![0], vertPairs[i]![1], horiPairs[j]![0], horiPairs[j]![1])
      if (0 < curr && curr < result) result = curr
    }
  }

  fs.writeFileSync('debug.log', logContent)

  console.log(result)
  return
}

process.stdin.resume()
process.stdin.setEncoding('utf8')

const lines: string[] = [] // 文字列専用の配列
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
reader.on('line', (line: string) => {
  lines.push(line)
})

reader.on('close', () => {
  const N = Number(lines[0])
  const lists: number[][] = []
  for (let i = 0; i < N; i++) {
    lists.push(lines[i + 1]!.split(' ').map(Number))
  }

  solve(N, lists)
})
