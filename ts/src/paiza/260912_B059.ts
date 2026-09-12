import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(
  H: number,
  W: number,
  N: number,
  capitalList: { name: string; x: number; y: number }[]
) {
  if (DEBUG)
    console.log(
      '\n\n' + H + ' ' + W + ' ' + N,
      '\n' +
        capitalList
          .map((c) => {
            return c.name + ' ' + c.x + ' ' + c.y
          })
          .join('\n')
    )

  const result = Array.from({ length: H }, () => Array.from({ length: W }, () => '-'))
  /**
   * マップ上の土地はその地点から上下左右での移動において首都に一番近い国に占領されます。
   * 土地から見て複数の国の首都が同じ距離である場合、その土地は境界上にあるとします。
   * あなたはマップ内を安全に移動するため、各国の占領している区域を計算しようとしています。
   * 各国の占領区域をプログラムで図示してください。境界上の土地は不定として "?" と表現してください。
   */
  for (let currentY = 0; currentY < H; currentY++) {
    for (let currentX = 0; currentX < W; currentX++) {
      const nearbyList: { countryName: string | null; distance: number } = {
        countryName: null,
        distance: Infinity,
      }
      for (const capital of capitalList) {
        const currentDistance = Math.abs(capital.x - currentX) + Math.abs(capital.y - currentY)
        if (currentDistance < nearbyList.distance) {
          nearbyList.distance = currentDistance
          nearbyList.countryName = capital.name
        } else if (currentDistance === nearbyList.distance) {
          nearbyList.countryName = null
        }
      }
      if (nearbyList.countryName !== null) result[currentY]![currentX] = nearbyList.countryName
      else result[currentY]![currentX] = '?'
    }
  }

  console.log(result.map((r) => r.join('')).join('\n'))
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
  const [H, W, N] = lines[0]!.split(' ').map(Number) as [number, number, number]
  const a = Array.from({ length: N }, (_, idx) => {
    const lineList = lines[idx + 1]!.split(' ')
    return {
      name: lineList[0]!,
      x: Number(lineList[1]!) - 1,
      y: Number(lineList[2]!) - 1,
    }
  })

  solve(H, W, N, a)
})
