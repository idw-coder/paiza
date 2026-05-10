function Main(input) {
  const inputRow = input.split(' ');
  console.log(inputRow[0] + ' san');
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));
