function Main(input) {
  const nameArr = input.trim().split('')
  nameArr[0] = nameArr[0].toLowerCase()

  console.log(['Of', ...nameArr].join(''))
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'))
