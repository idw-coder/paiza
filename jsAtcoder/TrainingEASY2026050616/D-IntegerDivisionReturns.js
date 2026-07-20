function Main(input) {
  const X = BigInt(input.trim())
  const q = X / 10n
  const r = X % 10n
  console.log(String(r > 0n ? q + 1n : q))
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'))
