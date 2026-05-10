function Main(input) {
  const inputRows = input.split('\n');
  const N = parseInt(inputRows[0]);
  let tCount = 0;
  let aCount = 0;
  const rows1Arr = inputRows[1].split('');
  for (const i of rows1Arr) {
    if (i === 'T') tCount++;
    else if (i === 'A') aCount++;
  }
  if (tCount !== aCount) {
    console.log(tCount > aCount ? 'T' : 'A');
  } else {
    console.log(rows1Arr[N - 1] === 'T' ? 'A' : 'T');
  }
}
Main(require('fs').readFileSync('/dev/stdin', 'utf8'));
