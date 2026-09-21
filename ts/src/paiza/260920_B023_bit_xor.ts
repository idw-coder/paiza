import readline from 'readline'
const DEBUG = !!process.env.DEBUG

// bit0 top / bit1 topL / bit2 topR / bit3 mid / bit4 botL / bit5 botR / bit6 bot
const SEGMENTS = [
  0b1110111, // 0
  0b0100100, // 1
  0b1011101, // 2
  0b1101101, // 3
  0b0101110, // 4
  0b1101011, // 5
  0b1111011, // 6
  0b0100101, // 7
  0b1111111, // 8
  0b1101111, // 9
]

function bitCount(n: number): number {
  return n.toString(2).replaceAll('0', '').length
}

function countDifferentSegments(fromDigit: number, toDigit: number): number {
  // XOR は、2つの数字で異なるセグメントだけを1にする。
  return bitCount(SEGMENTS[fromDigit]! ^ SEGMENTS[toDigit]!)
}

function canMoveWithinDigit(fromDigit: number, toDigit: number): boolean {
  return (
    bitCount(SEGMENTS[fromDigit]!) === bitCount(SEGMENTS[toDigit]!) &&
    countDifferentSegments(fromDigit, toDigit) === 2
  )
}

function canRemoveOneSegment(fromDigit: number, toDigit: number): boolean {
  return (
    bitCount(SEGMENTS[fromDigit]!) - bitCount(SEGMENTS[toDigit]!) === 1 &&
    countDifferentSegments(fromDigit, toDigit) === 1
  )
}

function canAddOneSegment(fromDigit: number, toDigit: number): boolean {
  return (
    bitCount(SEGMENTS[toDigit]!) - bitCount(SEGMENTS[fromDigit]!) === 1 &&
    countDifferentSegments(fromDigit, toDigit) === 1
  )
}

function solve(digits: number[]) {
  if (DEBUG) console.log('\n\n' + digits)

  const results = new Set<string>()

  // 同じ桁の中でマッチ棒を1本移動する。
  for (let index = 0; index < digits.length; index++) {
    for (let toDigit = 0; toDigit <= 9; toDigit++) {
      if (!canMoveWithinDigit(digits[index]!, toDigit)) continue

      const changed = [...digits]
      changed[index] = toDigit
      results.add(changed.join(''))
    }
  }

  // ある桁からマッチ棒を1本取り、別の桁へ移動する。
  for (let from = 0; from < digits.length; from++) {
    for (let to = 0; to < digits.length; to++) {
      if (from === to) continue

      for (let fromDigit = 0; fromDigit <= 9; fromDigit++) {
        if (!canRemoveOneSegment(digits[from]!, fromDigit)) continue

        for (let toDigit = 0; toDigit <= 9; toDigit++) {
          if (!canAddOneSegment(digits[to]!, toDigit)) continue

          const changed = [...digits]
          changed[from] = fromDigit
          changed[to] = toDigit
          results.add(changed.join(''))
        }
      }
    }
  }

  // 全結果は同じ桁数なので、文字列順と数値順は一致する。
  console.log(results.size > 0 ? [...results].sort().join('\n') : 'none')
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
  const S = lines[0]!.split('').map(Number)
  solve(S)
})
