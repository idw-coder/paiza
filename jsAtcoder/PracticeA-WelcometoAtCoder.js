function Main(input) {
  const inputRows = input.split('\n');
  const inputRows1 = inputRows[1].split(' ').map(Number);
  console.log(parseInt(inputRows[0]) + inputRows1[0] + inputRows1[1] + ' ' + inputRows[2]);
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));
