import readline from 'readline'
const DEBUG = !!process.env.DEBUG

function solve(M: number, N: number) {
  console.error('\n\n' + N + ' ' + M)
  function make(a: number, b: number, isAdd: boolean) {
    if (isAdd) console.log(a + ' + ' + b + ' =')
    else console.log(a + ' - ' + b + ' =')
  }
  /**
   * 足し算、引き算それぞれで重複
   * 問題に出てくる数値および解答はすべて 0 ~ 99 の整数になるように
   * 条件を満たせばどのような問題の並びでも可
   *
   * ・0 ≦ M, N ≦ 5,050 (条件内で作成可能な足し算・引き算の最大数)
   * ・M + N ≧ 1
   *
   * a, b について、ゼロ埋め表記の数字 (09, 00 など) は不可とし以下の条件を満たします。
   * ・0 ≦ a, b ≦ 99
   */

  /**
   * 足し算
   */
  let addCount = 0
  LOOP: for (let a = 0; a < 100; a++) {
    for (let b = 0; a + b < 100; b++) {
      if (addCount === M) break LOOP
      make(a, b, true)
      addCount++
    }
  }
  /**
   * ひき算
   */
  let subtractCount = 0
  LOOP: for (let a = 99; a >= 0; a--) {
    for (let b = a; b >= 0; b--) {
      if (subtractCount === N) break LOOP
      make(a, b, false)
      subtractCount++
    }
  }
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
  const [M, N] = [Number(lines[0]!.split(' ')[0]), Number(lines[0]!.split(' ')[1])]

  solve(M, N)
})
