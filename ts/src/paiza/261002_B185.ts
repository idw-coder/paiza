import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(N: number, S: string) {
  if (DEBUG) console.log('\n\n' + N + ' ' + S)

  type Love = { l: number | null; o: number | null; v: number | null; e: number | null }
  const loveList: Love[] = []
  /**
   *
   */
  for (let i = 0; i < S.length; i++) {
    check(i, S[i]!)
  }

  function check(idx: number, s: string) {
    const nextList: Love[] = []
    if (s === 'L') nextList.push({ l: idx, o: null, v: null, e: null })
    else if (s === 'O') {
      for (const loveObj of loveList) {
        if (loveObj.l !== null && loveObj.o === null) {
          nextList.push({ ...loveObj })
          loveObj.o = idx
        }
      }
    } else if (s === 'V') {
      for (const loveObj of loveList) {
        if (loveObj.o !== null && loveObj.v === null) {
          nextList.push({ ...loveObj })
          loveObj.v = idx
        }
      }
    } else if (s === 'E') {
      for (const loveObj of loveList) {
        if (loveObj.v !== null && loveObj.e === null) {
          nextList.push({ ...loveObj })
          loveObj.e = idx
        }
      }
    }
    loveList.push(...nextList)
  }

  console.log(loveList.filter((love) => love.e !== null).length)
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
  const N = Number(lines[0]!)
  const S = lines[1]!
  solve(N, S)
})
