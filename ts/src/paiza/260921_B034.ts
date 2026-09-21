import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(
  sX: number,
  sY: number,
  d_f: number,
  d_r: number,
  d_b: number,
  d_l: number,
  cList: string[][]
) {
  let currFace: '+Y' | '-Y' | '+X' | '-X' = '+Y'
  const position = [sX, sY]

  const rangeMove = {
    '+Y': { F: [0, d_f], R: [d_r, 0], B: [0, -d_b], L: [-d_l, 0] },
    '+X': { F: [d_f, 0], R: [0, -d_r], B: [-d_b, 0], L: [0, d_l] },
    '-Y': { F: [0, -d_f], R: [-d_r, 0], B: [0, d_b], L: [d_l, 0] },
    '-X': { F: [-d_f, 0], R: [0, d_r], B: [d_b, 0], L: [0, -d_l] },
  }
  const turnList = {
    '+Y': { R: '+X', B: '-Y', L: '-X' },
    '+X': { R: '-Y', B: '-X', L: '+Y' },
    '-Y': { R: '-X', B: '+Y', L: '+X' },
    '-X': { R: '+Y', B: '+X', L: '-Y' },
  }
  if (DEBUG) console.log('\n\n' + sX + ' ' + sY)
  if (DEBUG) console.log(d_f + ' ' + d_r + ' ' + d_b + ' ' + d_l)
  if (DEBUG) console.log(cList)
  if (DEBUG) console.log(rangeMove)
  /**
   * cList でループ
   *
   */
  for (let i = 0; i < cList.length; i++) {
    if (cList[i]![0] === 'm') {
      const curDir = cList[i]![1]
      if (currFace === '+Y' && curDir === 'F') {
        position[0]! += rangeMove['+Y'].F[0]!
        position[1]! += rangeMove['+Y'].F[1]!
      } else if (currFace === '+Y' && curDir === 'R') {
        position[0]! += rangeMove['+Y'].R[0]!
        position[1]! += rangeMove['+Y'].R[1]!
      } else if (currFace === '+Y' && curDir === 'B') {
        position[0]! += rangeMove['+Y'].B[0]!
        position[1]! += rangeMove['+Y'].B[1]!
      } else if (currFace === '+Y' && curDir === 'L') {
        position[0]! += rangeMove['+Y'].L[0]!
        position[1]! += rangeMove['+Y'].L[1]!
      } else if (currFace === '+X' && curDir === 'F') {
        position[0]! += rangeMove['+X'].F[0]!
        position[1]! += rangeMove['+X'].F[1]!
      } else if (currFace === '+X' && curDir === 'R') {
        position[0]! += rangeMove['+X'].R[0]!
        position[1]! += rangeMove['+X'].R[1]!
      } else if (currFace === '+X' && curDir === 'B') {
        position[0]! += rangeMove['+X'].B[0]!
        position[1]! += rangeMove['+X'].B[1]!
      } else if (currFace === '+X' && curDir === 'L') {
        position[0]! += rangeMove['+X'].L[0]!
        position[1]! += rangeMove['+X'].L[1]!
      } else if (currFace === '-Y' && curDir === 'F') {
        position[0]! += rangeMove['-Y'].F[0]!
        position[1]! += rangeMove['-Y'].F[1]!
      } else if (currFace === '-Y' && curDir === 'R') {
        position[0]! += rangeMove['-Y'].R[0]!
        position[1]! += rangeMove['-Y'].R[1]!
      } else if (currFace === '-Y' && curDir === 'B') {
        position[0]! += rangeMove['-Y'].B[0]!
        position[1]! += rangeMove['-Y'].B[1]!
      } else if (currFace === '-Y' && curDir === 'L') {
        position[0]! += rangeMove['-Y'].L[0]!
        position[1]! += rangeMove['-Y'].L[1]!
      } else if (currFace === '-X' && curDir === 'F') {
        position[0]! += rangeMove['-X'].F[0]!
        position[1]! += rangeMove['-X'].F[1]!
      } else if (currFace === '-X' && curDir === 'R') {
        position[0]! += rangeMove['-X'].R[0]!
        position[1]! += rangeMove['-X'].R[1]!
      } else if (currFace === '-X' && curDir === 'B') {
        position[0]! += rangeMove['-X'].B[0]!
        position[1]! += rangeMove['-X'].B[1]!
      } else if (currFace === '-X' && curDir === 'L') {
        position[0]! += rangeMove['-X'].L[0]!
        position[1]! += rangeMove['-X'].L[1]!
      }
    } else if (cList[i]![0] === 't') {
      if (currFace === '+Y' && cList[i]![1] === 'R')
        currFace = turnList['+Y'].R as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '+Y' && cList[i]![1] === 'B')
        currFace = turnList['+Y'].B as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '+Y' && cList[i]![1] === 'L')
        currFace = turnList['+Y'].L as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '+X' && cList[i]![1] === 'R')
        currFace = turnList['+X'].R as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '+X' && cList[i]![1] === 'B')
        currFace = turnList['+X'].B as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '+X' && cList[i]![1] === 'L')
        currFace = turnList['+X'].L as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '-Y' && cList[i]![1] === 'R')
        currFace = turnList['-Y'].R as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '-Y' && cList[i]![1] === 'B')
        currFace = turnList['-Y'].B as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '-Y' && cList[i]![1] === 'L')
        currFace = turnList['-Y'].L as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '-X' && cList[i]![1] === 'R')
        currFace = turnList['-X'].R as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '-X' && cList[i]![1] === 'B')
        currFace = turnList['-X'].B as '+Y' | '-Y' | '+X' | '-X'
      else if (currFace === '-X' && cList[i]![1] === 'L')
        currFace = turnList['-X'].L as '+Y' | '-Y' | '+X' | '-X'
    }

    if (DEBUG) console.log('\n' + currFace)
    if (DEBUG) console.log(position)
  }
  console.log(position.join(' '))
}

process.stdin.resume()
process.stdin.setEncoding('utf8')

const lines: string[] = []
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
reader.on('line', (line: string) => {
  lines.push(line)
})

reader.on('close', () => {
  const [sX, sY] = lines[0]!.split(' ').map(Number) as [number, number]
  const [d_f, d_r, d_b, d_l] = lines[1]!.split(' ').map(Number) as [number, number, number, number]
  const N = Number(lines[2]!)
  const e = Array.from({ length: N }, (_, i) => lines[i + 3]!.split(' '))
  solve(sX, sY, d_f, d_r, d_b, d_l, e)
})
