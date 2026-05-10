function Main(input) {
  [a, b] = input.trim('\n').split(' ').map(Number);
  const nextGrid = [
    [2, 3],
    [4, 5, 1],
    [6, 7, 1],
    [8, 9, 2],
    [10, 11, 2],
    [12, 13, 3],
    [14, 15, 3],
    [4],
    [4],
    [5],
    [5],
    [6],
    [6],
    [7],
    [7],
  ];
  console.log(nextGrid[a - 1].includes(b) ? 'Yes' : 'No');
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));
