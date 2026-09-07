import readline from 'readline'
const DEBUG = !!process.env.DEBUG
function solve(n: number, m: number[], s: string[]) {
  if (DEBUG) console.log('\n' + n + '\n' + m.join(' ') + '\n' + s.join(' '))

  /**
   * ・S_{i,h} (文字列 S_i の先頭の文字) = S_{j,h} (文字列 S_j の先頭の文字)
   * ・S_{i,t} (文字列 S_i の末尾の文字) = S_{k,h} (文字列 S_k の先頭の文字)
   * ・S_{j,t} (文字列 S_j の末尾の文字) = S_{k,t} (文字列 S_k の末尾の文字)
   * をすべて満たす (i,j,k) の組み合わせの数を出力してください。
   *
   * ただし、(1,2,3) と (3,1,2) のように (i,j,k) の要素を入れ替えたものは同じ組み合わせとみなします。
   */

  const check = (i: string, j: string, k: string) => {
    let isTriangle = false
    const [iHead, iTail, jHead, jTail, kHead, kTail] = [
      i.split('')[0],
      i.split('')[i.length - 1],
      j.split('')[0],
      j.split('')[j.length - 1],
      k.split('')[0],
      k.split('')[k.length - 1],
    ]
    // if (DEBUG) console.log([iHead, iTail, jHead, jTail, kHead, kTail].join(' '))
    if (
      (iHead === jHead && iTail === kTail && jTail === kHead) ||
      (iHead === kHead && iTail === jTail && kTail === jHead) ||
      (jHead === kHead && jTail === iTail && kTail === iHead) ||
      (jHead === iHead && jTail === kTail && iTail === kHead) ||
      (kHead === iHead && kTail === jTail && iTail === jHead) ||
      (kHead === jHead && kTail === iTail && jTail === iHead)
    ) {
      isTriangle = true
    }
    return isTriangle
  }

  const combination = <T>(list: T[]) => {
    const combinationList: [T, T, T][] = []
    // for (let i = 0; i < list.length; i++) {
    //   for (let j = i + 1; j < list.length; j++) {
    //     for (let k = j + 1; k < list.length; k++) {
    //       combinationList.push([list[i]!, list[j]!, list[k]!])
    //     }
    //   }
    // }
    for (let i = 0; i < list.length; i++) {
      for (let j = i; j < list.length; j++) {
        for (let k = j; k < list.length; k++) {
          combinationList.push([list[i]!, list[j]!, list[k]!])
        }
      }
    }
    return combinationList
  }

  let result = 0

  combination(s).forEach((n) => {
    if (check(...n)) result++
  })
  // if (DEBUG) console.log(combination(s))

  console.log(result)
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
  const N = Number(lines[0])
  const m = lines[1]!.split(' ').map(Number)
  const s = lines[2]!.split(' ')

  solve(N, m, s)
})
