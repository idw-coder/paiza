import readline from 'readline'

type LandPrice = { x: number; y: number; p: number }

function solve(x: number, y: number, k: number, N: number, list: LandPrice[]) {
  console.error('\n\n' + y + ' ' + x)
  console.error(k)
  console.error(N)
  // console.table(list)

  /**
   * A (x, y) からの距離が近い順に k 個の点を見つけます。 その k 点の地価の平均が予測する地価の値となります。
   * A からの距離が同じ点はないものとします。
   *
   * list sort
   */

  const sorted = [...list]
    .sort((a, b) => (x - a.x) ** 2 + (y - a.y) ** 2 - ((x - b.x) ** 2 + (y - b.y) ** 2))
    .slice(0, k)
  // console.table(sorted)
  console.log(Math.round(sorted.reduce((acc, cur) => acc + cur.p, 0) / k))
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
  const [x, y] = [Number(lines[0]!.split(' ')[0]), Number(lines[0]!.split(' ')[1])]
  const k = Number(lines[1])
  const N = Number(lines[2])
  const list = Array.from({ length: N }, (_, idx) => {
    return {
      x: Number(lines[idx + 3]!.split(' ')[0]!),
      y: Number(lines[idx + 3]!.split(' ')[1]!),
      p: Number(lines[idx + 3]!.split(' ')[2]!),
    }
  })

  solve(x, y, k, N, list)
})
