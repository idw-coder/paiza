function Main(input) {
  const inputRow = input.trim().split('').map(Number) // input.trim() で末尾の改行を除去
  const sorted = inputRow.sort((a, b) => a - b)
  if (sorted[0] === 0) {
    const firstNum = sorted.findIndex((d) => d !== 0)
    ;[sorted[0], sorted[firstNum]] = [sorted[firstNum], sorted[0]]
  }
  console.log(sorted.join(''))
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'))
