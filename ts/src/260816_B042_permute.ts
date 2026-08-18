import fs from 'fs'
import readline from 'readline'

function solve(n: number, m: number, ab: number[][]) {
  let logContent = n + ' ' + m + '\n\ni a b\n'
  for (const el of ab) {
    logContent += el.join(' ') + '\n'
  }

  logContent += '\n'
  // 不満度の合計
  const calcTotal = (after: number[][]) => {
    let total = 0
    // 比較
    for (let i = 0; i < n; i++) {
      // 前を比較
      for (let j = 0; j < i; j++) {
        if (after[i]![0]! < after[j]![0]!) total += after[i]![2]!
      }
    }
    return total
  }

  // permutations
  function permute(before: number[][]) {
    if (before.length <= 1) return [before]
    const after: number[][][] = []
    for (let i = 0; i < before.length; i++) {
      const head = before[i]! // 先頭に固定する要素をループで1つずつ切り替える
      const rest = before.filter((_, j) => j !== i)

      // head + 残りの並び を再起呼び出し push
      for (const p of permute(rest)!) {
        after.push([head, ...p])
      }
    }
    return after
  }
  const permutations = permute(ab)
  // logContent += permutations.map((perm) => perm.map((el) => el.join(' ')).join('\n')).join('\n\n')

  let ans = ab.reduce((acc, curr, idx) => acc + curr[1]! * (ab.length - idx), 0)
  logContent += 'origin ' + ans + '\n'

  for (const perm of permutations) {
    logContent += 'm ' + calcTotal(perm) + '\n'
    if (calcTotal(perm) <= m) {
      logContent += 'ok\n'
      const currentSum = perm.reduce((acc, curr, idx) => {
        return acc + curr[1]! * (perm.length - idx)
      }, 0)
      logContent += currentSum + '\n'
      ans = currentSum < ans ? currentSum : ans
    }
  }

  fs.writeFileSync('debug.log', logContent)

  console.log(ans)
  console.log(ans)
  return
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
  const [N, M] = lines[0]!.split(' ').map(Number) as [number, number]
  const ab: number[][] = []
  for (let i = 0; i < N; i++) {
    ab[i] = [i, ...lines[i + 1]!.split(' ').map(Number)]
  }

  solve(N, M, ab)
})
