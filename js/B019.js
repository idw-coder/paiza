function reduction (n, m, array) {
  const ratio = n / m;
  const scale = n**2 / m**2;
  let reducedArray = [];
  for (let i = 0; i < m * scale; i++) {
    reducedArray.push(new Array(m**2).fill(0));
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const y = Math.floor(i / ratio);
      const x = Math.floor(j / ratio);
      const ys = Math.floor(i % ratio);
      const xs = Math.floor(j % ratio);
      // console.log(`i: ${i}, j: ${j} => y: ${y}, x: ${x}`);
      reducedArray[y * ratio + x][ys * m + xs] = array[i][j];
    }
  }

  for (let i = 0; i < scale**2; i++) {
    
  }

  return reducedArray;
}

module.exports = { reduction };

// テスト時は標準入力処理をスキップ
if (require.main === module) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var lines = [];
  var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  reader.on('line', (line) => {
    lines.push(line);
  });

  reader.on('close', () => {
    const N = Number(lines[0].split(' ')[0]);
    const M = Number(lines[0].split(' ')[1]);

    let baseArray = [];
    for (let i = 0; i < N; i++) {
      baseArray.push(lines[i + 1].split(' ').map(Number));
    }
    console.log(baseArray);
  const result = reduction(N, M, baseArray);
  console.log(result);

  });
}