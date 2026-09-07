import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(m: number, d: number, abm: number[][]) {
  if (DEBUG) console.log('\n')
  if (DEBUG) console.log(m + ' ' + d)
  if (DEBUG) console.log(abm.map((row) => row.join(' ')).join('\n'))
  const md = [
    ...(m < 10 ? [0, m] : [Math.floor(m / 10), m % 10]),
    ...(d < 10 ? [0, d] : [Math.floor(d / 10), d % 10]),
  ]
  if (DEBUG) console.log(md)
  const mdMap = new Map<number, number>()
  for (const n of md) {
    mdMap.set(n, (mdMap.get(n) ?? 0) + 1)
  }
  if (DEBUG) console.log(mdMap)

  // w_{n+1} = (a_1 * w_n + b_1) mod m_1
  // x_{n+1} = (a_2 * x_n + b_2) mod m_2
  // y_{n+1} = (a_3 * y_n + b_3) mod m_3
  // z_{n+1} = (a_4 * z_n + b_4) mod m_4
  const card: {
    w: number
    x: number
    y: number
    z: number
  } = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  }
  /**
   * ループで計算
   */
  for (let i = 1; i <= 10000; i++) {
    const currNum = [
      (abm[0]![0]! * card.w + abm[1]![0]!) % abm[2]![0]!,
      (abm[0]![1]! * card.x + abm[1]![1]!) % abm[2]![1]!,
      (abm[0]![2]! * card.y + abm[1]![2]!) % abm[2]![2]!,
      (abm[0]![3]! * card.z + abm[1]![3]!) % abm[2]![3]!,
    ]
    // if (DEBUG) console.log('currNum', currNum)
    card.w = currNum[0]!
    card.x = currNum[1]!
    card.y = currNum[2]!
    card.z = currNum[3]!
    // if (DEBUG)
    //   console.log(
    //     'card   ',
    //     currNum.map((n) => n % 10)
    //   )

    if (isPermutation(currNum.map((n) => n % 10))) {
      console.log(i)
      break
    }
  }

  // 並べ替えて一致しているか検証
  function isPermutation(arr: number[]) {
    const tmpMap = new Map<number, number>(mdMap)
    for (const n of arr) {
      const value = tmpMap.get(n)
      if (!value) return false
      tmpMap.set(n, value - 1)
    }
    return true
  }
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
  const [M, D] = [Number(lines[0]!.split(' ')[0]), Number(lines[0]!.split(' ')[1])]
  const abm: number[][] = []
  for (let i = 0; i < 3; i++) {
    abm[i] = lines[i + 1]!.split(' ').map(Number)
  }
  solve(M, D, abm)
})
