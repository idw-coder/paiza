import { performance } from 'node:perf_hooks'
import readline from 'readline'
const DEBUG = !!process.env.DEBUG
/**
 * rss（プロセス全体の RAM）
 * ├── heapTotal（V8 が確保した JS ヒープ）
 * │    └── heapUsed（実際に使っている JS オブジェクト）
 * ├── external（V8 外だが JS から参照）
 * │    └── arrayBuffers（そのうち ArrayBuffer / Buffer）
 * └── その他（スタック、コード、未分類）
 */
function debugMemory(label?: string) {
  if (DEBUG) {
    const line = (new Error().stack?.split('\n')[2] ?? '').match(/:(\d+):\d+\)?$/)?.[1] ?? '?'
    console.log(
      line +
        (label ? label + ' ' : '') +
        ' ' +
        Object.entries(process.memoryUsage())
          .filter(([key]) => key === 'rss' || key === 'heapTotal' || key === 'heapUsed')
          .map(([key, value]) => key + ': ' + Math.round(value / 1024 / 1024).toFixed(2) + 'MB')
          .join(', ')
    )
  }
}
let lastTime = performance.now()
/**
 *
 */
function debugTime(label?: string) {
  if (DEBUG) {
    const line = (new Error().stack?.split('\n')[2] ?? '').match(/:(\d+):\d+\)?$/)?.[1] ?? '?'
    console.log(line + (label ? label + ' ' : '') + ' ' + (performance.now() - lastTime) + 'ms')
    lastTime = performance.now()
  }
}
function solve(n: number, m: number, birds: number[][]) {
  if (DEBUG) console.log('\n')
  // if (DEBUG) console.log(n + '' + m)
  // if (DEBUG) console.log(birds.map((m) => m.join(' ')).join('\n'))
  debugMemory()
  debugTime()

  /**
   * 色がキーでその色の鳥の数を値とする
   */
  const birdMap = new Map<number, number>()
  for (let i = 0; i < n; i++) {
    birdMap.set(birds[i]![0]!, (birdMap.get(birds[i]![0]!) ?? 0) + 1)
  }
  debugMemory()
  debugTime()

  // if (DEBUG) console.log([...birdMap].map((m) => m[1]).join(' '))

  /**
   * Map<日, Map<色, 増減>>
   */
  const events = new Map<number, Map<number, number>>(
    Array.from({ length: m }, (_, idx) => [idx, new Map<number, number>()])
  )
  debugMemory()
  debugTime()

  // if (DEBUG) {
  //   console.log(
  //     [...events]
  //       .map(([day, colors]) => day + ' ' + [...colors].map((color, value) => color + ' ' + value))
  //       .join('\n')
  //   )
  // }
  for (let i = 0; i < n; i++) {
    // j日目 i色 の増減
    const day = birds[i]![1]! - 1
    const removedColor = birds[i]![0]! - 1!
    const addedColor = birds[i]![2]! - 1!
    events.get(day)!.set(removedColor, (events.get(day)!.get(removedColor) ?? 0) - 1)
    events.get(day)!.set(addedColor, (events.get(day)!.get(addedColor) ?? 0) + 1)
  }
  debugMemory()
  debugTime()

  // if (DEBUG) {
  //   console.log(
  //     [...events]
  //       .map(
  //         ([day, colors]) =>
  //           day + ' - ' + [...colors].map(([color, value]) => '[' + color + ', ' + value + ']')
  //       )
  //       .join('\n')
  //   )
  // }
  /**
   * events の各日でループ
   * その日の色の増減を birdMap に反映
   * その日の色の種類数を console.log()
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      birdMap.set(j + 1, birdMap.get(j + 1)! + (events.get(i)!.get(j) ?? 0))
      // debugMemory('80 ')
    }
    // debugMemory('82 ')
    // console.log([...birdMap.values()].filter((value) => value > 0).length)
  }
  debugMemory()
  debugTime()
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
  const [N, M] = [Number(lines[0]!.split(' ')[0]!), Number(lines[0]!.split(' ')[1]!)]
  const birds: number[][] = Array.from({ length: N }, (_, i) =>
    lines[i + 1]!.split(' ').map(Number)
  )
  solve(N, M, birds)
})
