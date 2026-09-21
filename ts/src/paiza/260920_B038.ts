import readline from 'readline'
const DEBUG = !!process.env.DEBUG

/**
 * totalL = craneL * cranelNum + turtlL * turtlNum
 * totalH = craneNum + turtlNum
 * 0 ≦ params ≦ 100
 */

function checkSumLegs(cNum: number, tNum: number, cL: number, tL: number, aL: number): boolean {
  // if (DEBUG) console.log('checking ' + cNum + ' * ' + cL + ' + ' + tNum + ' * ' + tL + ' === ' + aL)
  if (cNum * cL + tNum * tL === aL) return true
  else return false
}
function solve(allL: number, allH: number, cL: number, tL: number) {
  if (DEBUG) console.log('\n\n' + allL + ' ' + allH + ' ' + cL + ' ' + tL)

  const result: number[][] = []
  for (let cNum = 1; cNum < allH; cNum++) {
    if (checkSumLegs(cNum, allH - cNum, cL, tL, allL)) {
      result.push([cNum, allH - cNum])
    }
  }

  if (DEBUG) console.log(result)
  console.log(result.length === 1 ? result[0]!.join(' ') : 'miss')
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
  const [a, b, c, d] = lines[0]!.split(' ').map(Number) as [number, number, number, number]
  solve(a, b, c, d)
})
