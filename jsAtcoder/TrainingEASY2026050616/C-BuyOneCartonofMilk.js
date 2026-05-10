function Main(input) {
  const inputArr = input.trim('\n').split(' ').map(Number);
  console.log(inputArr);
  const [N, S, M, L] = [...inputArr];
  console.log(N + ' ' + S + ' ' + M + ' ' + L);
  let result = Infinity;
  for (let i = 0; i <= 17; i++) {
    for (let j = 0; j <= 17; j++) {
      for (let k = 0; k <= 17; k++) {
        if (6 * i + 8 * j + 12 * k >= N) {
          result = Math.min(result, S * i + M * j + L * k);
        }
      }
    }
  }
  console.log(result);
}

Main(require('fs').readFileSync('/dev/stdin', 'utf8'));
