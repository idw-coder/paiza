function Main(input) {
  const inputNum = parseInt(input)
  console.log(inputNum)
  const h = Math.floor(inputNum / 60)
  const m = 10 > inputNum % 60 ? `0${inputNum % 60}` : inputNum % 60
  console.log(21 + h + ':' + m)
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'))
// echo "33" | node jsAtcoder/A-When.js
