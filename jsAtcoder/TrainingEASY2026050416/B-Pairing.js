function Main(input) {
  const inputArr = input.trim('\n').split(' ').map(Number)
  let count = 0
  outer: while (inputArr.length > 0) {
    for (let i = 0; i < inputArr.length; i++) {
      for (let k = i + 1; k < inputArr.length; k++) {
        if (inputArr[i] === inputArr[k]) {
          inputArr.splice(k, 1)
          inputArr.splice(i, 1)
          count++
          continue outer
        }
      }
    }
    break
  }
  console.log(count)
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'))
