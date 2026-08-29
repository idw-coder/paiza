function Main(input) {
  const inputGrid = input.trim().split('\n')
  const [H, W] = inputGrid[0].split(' ').map(Number)
  const [R, C] = inputGrid[1].split(' ').map(Number)
  // console.log(H + ' ' + W + ' ' + R + ' ' + C);
  let result = 0
  if (R > 1) result++
  if (R < H) result++
  if (C > 1) result++
  if (C < W) result++
  console.log(result)
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'))
