import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(L: number, Q: number, vt: number[][]) {
  if (DEBUG) console.log('\n\n' + L + ' ' + Q, '\n' + vt.map((c) => c.join(' ')).join('\n'))
  // const result: { startTime: number; arrivalTime: number; packingTime: number }[] = []
  let result = 0
  const workTime = vt.filter((q) => q[0] === 0).sort((a, b) => a[1]! - b[1]!)
  for (const q of vt) {
    if (q[0] !== 0) {
      // result.push({
      //   startTime: q[1]!,
      //   arrivalTime: L / q[0]! + q[1]!,
      //   packingTime: workTime.find((w) => L / q[0]! + q[1]! <= w[1]!)![1]! - q[1]!,
      // })
      const startTime = q[1]!
      const arrivalTime = L / q[0]! + startTime
      const packingTime = workTime.find((w) => arrivalTime <= w[1]!)![1]! - startTime
      result = result < packingTime ? packingTime : result
    }
  }
  /**
   * 工場には 1 本のレーンがあります。
   * 各商品は、商品ごとに異なるロボットによりレーンの先頭に運搬されます。また、運搬速度はロボットにより異なる場合があります。
   * また、パッキングには大型アームが用いられます。
   * ただし、アームは 1 本しかありません。
   * アームはレーンの先頭に到達している商品をまとめてパッキングする作業を繰り返し行います。
   * パッキングは瞬時に終了する他、ロボットや後に運搬されてくる商品の邪魔になることはありません。また、アームが一度にパッキングできる商品の数に制限はありません。
   *
   * 1. 各商品について、ロボットがその商品を運び出してから、アームがその商品をパッキングするまでの時間を計測します。
   * 2. 上記で計測した時間のうち、もっとも長いものをボトルネックとします。
   * ある 1 日分のロボットとアームの作業記録が与えられるので、ボトルネックを求めるプログラムを作成してください。
   */

  console.log(result)
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
  const [L, Q] = lines[0]!.split(' ').map(Number) as [number, number]
  const vt = Array.from({ length: Q }, (_, idx) => lines[idx + 1]!.split(' ').map(Number))

  solve(L, Q, vt)
})
