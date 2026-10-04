import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(a: number[], b: number[]) {
  if (DEBUG) console.log('\n\n' + a + ' ' + b)
  /**
   *
   */
  const aInitial = parseInt(a.join(''), 2)
  const bInitial = parseInt(b.join(''), 2)
  // const MIRROR = [1, 6, 5, 4, 3, 2, 7]
  const MIRROR = [0, 5, 4, 3, 2, 1, 6]
  // const ROTATION = [4, 5, 6, 1, 2, 3, 7]
  const ROTATION = [3, 4, 5, 0, 1, 2, 6]
  const aMirror = parseInt(MIRROR.map((i) => a[i]).join(''), 2)
  const bMirror = parseInt(MIRROR.map((i) => b[i]).join(''), 2)
  const aRotation = parseInt(ROTATION.map((i) => a[i]).join(''), 2)
  const bRotation = parseInt(ROTATION.map((i) => b[i]).join(''), 2)
  // if (DEBUG)
  //   console.log(
  //     MIRROR.map((i) => a[i]),
  //     MIRROR.map((i) => b[i])
  //   )
  // if (DEBUG) console.log('aInitial' + aInitial + ' aMirror' + aMirror + ', aRotation' + aRotation)
  // if (DEBUG) console.log('bInitial' + bInitial + ' bMirror' + bMirror + ', bRotation' + bRotation)
  const SEGMENTS = [
    0b1111110, // 0
    0b0110000, // 1
    0b1101101, // 2
    0b1111001, // 3
    0b0110011, // 4
    0b1011011, // 5
    0b1011111, // 6
    0b1110010, // 7
    0b1111111, // 8
    0b1111011, // 9
  ]
  if (DEBUG) console.log(SEGMENTS)

  console.log(SEGMENTS.includes(aInitial) && SEGMENTS.includes(bInitial) ? 'Yes' : 'No')
  console.log(SEGMENTS.includes(aMirror) && SEGMENTS.includes(bMirror) ? 'Yes' : 'No')
  console.log(SEGMENTS.includes(aRotation) && SEGMENTS.includes(bRotation) ? 'Yes' : 'No')
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
  const a = lines[0]!.split(' ').map(Number)
  const b = lines[1]!.split(' ').map(Number)
  solve(a, b)
})
