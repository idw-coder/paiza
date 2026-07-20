function Main(input) {
  const lIndex = input.lastIndexOf('a')
  result = lIndex === -1 ? lIndex : lIndex + 1
  console.log(result)
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'))
