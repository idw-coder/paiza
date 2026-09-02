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
  // debugMemory()
  // debugTime()

  /**
   * 色がキーでその色の鳥の数を値とする
   * birds の 1日目から作成
   */
  const birdMap = new Map<number, number>()
  for (let i = 0; i < n; i++) {
    birdMap.set(birds[i]![0]!, (birdMap.get(birds[i]![0]!) ?? 0) + 1)
  }
  // debugMemory()
  debugTime()

  // if (DEBUG)
  //   console.log(
  //     'birdMapの初期値 ' +
  //       [...birdMap].map(([color, value]) => '[' + color + 'の色が ' + value + '匹]').join(' ')
  //   )

  /**
   * Map<日, Map<色, 増減>>
   */
  const events = new Map<number, Map<number, number>>(
    Array.from({ length: m }, (_, idx) => [idx, new Map<number, number>()])
  )
  // debugMemory()
  debugTime()

  // if (DEBUG) {
  //   console.log(
  //     [...events]
  //       .map(([day, colors]) => day + ' ' + [...colors].map((color, value) => color + ' ' + value))
  //       .join('\n')
  //   )
  // }
  for (let i = 0; i < n; i++) {
    // i日目 の増減
    const day = birds[i]![1]! - 1
    const removedColor = birds[i]![0]!
    const addedColor = birds[i]![2]!
    events.get(day)!.set(removedColor, (events.get(day)!.get(removedColor) ?? 0) - 1)
    events.get(day)!.set(addedColor, (events.get(day)!.get(addedColor) ?? 0) + 1)
  }
  // debugMemory()
  debugTime()

  if (DEBUG) {
    console.log(
      [...events]
        .map(
          ([day, colors]) =>
            day +
            1 +
            '日目 - ' +
            [...colors].map(([color, value]) => '[' + color + 'の色が ' + value + '匹]')
        )
        .join('\n') + '\n'
    )
  }

  let numType = [...birdMap.values()].filter((value) => value > 0).length
  /**
   * events の各日でループ
   * その日の変化した色でループ
   * 増減を birdMap に反映
   */
  for (let i = 0; i < m; i++) {
    // if (DEBUG) console.log(i + 1 + '日目')
    if (events.get(i)!.size === 0) {
      console.log(numType)
      continue
    } else {
      // 増減したかをみる
      let numChange = 0
      /**
       * events の各 color で
       * - birdsMap にその color がない場合は birdsMap のキーに新しく color を追加して numChange++
       * - birdsMap にその color があり かつ 増の場合は birdsMap の対象 color の 値に value を追加
       * - birdsMap にその color があり かつ 減 かつ birdsMap の 対象 color の値 - value が 0 の場合は birdsMap の対象 color の 値に value を追加して、numChange--
       * - birdsMap にその color があり かつ 減 かつ birdsMap の 対象 color の値 - value が !0 の場合は birdsMap の対象 color の 値に value を追加
       */
      for (const [color, value] of events.get(i)!) {
        // birdsMap にその color がない場合は birdsMap のキーに新しく color を追加して numChange++
        if (!birdMap.get(color)) {
          birdMap.set(color, 1)
          numChange++
        } else if (
          // birdsMap にその color があり かつ 増の場合は birdsMap の対象 color の 値に value を追加
          birdMap.get(color) !== undefined &&
          birdMap.get(color) !== 0 &&
          value > 0
        ) {
          birdMap.set(color, birdMap.get(color)! + value)
        } else if (
          // birdsMap にその color があり かつ 減 かつ birdsMap の 対象 color の値 - value が 0 の場合は irdsMap の対象 color の 値に value を追加して、numChange--
          birdMap.get(color) !== undefined &&
          birdMap.get(color) !== 0 &&
          birdMap.get(color)! + value === 0
        ) {
          birdMap.set(color, birdMap.get(color)! + value)
          numChange--
        } else if (
          // birdsMap にその color があり かつ 減 かつ birdsMap の 対象 color の値 - value が !0 の場合は birdsMap の対象 color の 値に value を追加
          birdMap.get(color) !== undefined &&
          birdMap.get(color) !== 0 &&
          birdMap.get(color)! + value !== 0
        ) {
          birdMap.set(color, birdMap.get(color)! + value)
        }
        // debugMemory()
      }
      // debugMemory()

      // if (DEBUG)
      //   console.log(
      //     [...birdMap].map(([color, value]) => '[' + color + 'の色が ' + value + '匹]').join(' ')
      //   )
      if (numChange === 0) console.log(numType)
      else {
        numType += numChange
        console.log(numType)
      }
    }
    // debugTime()
  }
  // debugMemory()
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
