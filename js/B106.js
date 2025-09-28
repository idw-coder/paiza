function calc (h, w, n, array) {
  let sortedArray = [];
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      sortedArray.push(0);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < h; j++) {
  //     if (sortedArray[(array[i] -1) % w + w * j] === 0) {
        sortedArray[array[i] -1] = i + 1;
    //     break; // 空席に座れたらループを1回抜ける
    //   }
    }
  }
  // console.log(sortedArray);

  let resultArray = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(sortedArray[i * w + j]);
    }
    resultArray.push(row);
  }

  // console.log(resultArray);

  for (let i = 1; i < h; i++) {
    for (let j = 0; j < w; j++) {
      for (let k = 0; k < i; k++) {
        if (resultArray[i][j] !== 0 && resultArray[k][j] === 0) {
          // 上の席が空席なら入れ替え
          resultArray[k][j] = resultArray[i][j];
          resultArray[i][j] = 0;
          for (let l = 0; l < h; l++) {
            // console.log(resultArray[l].join(' '));
          }
          // console.log('---');
          break; // 入れ替えたらループを抜ける
        }
      }
    }
  }

  return resultArray;
}

module.exports = { calc };

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
    const H = parseInt(lines[0].split(' ')[0]);
    const W = parseInt(lines[0].split(' ')[1]);
    const N = parseInt(lines[0].split(' ')[2]);

    let seatArray = [];
    for (let i = 0; i < N; i++) {
      seatArray.push(parseInt(lines[i + 1]));
    }
    // console.log(seatArray);
    const result = calc(H, W, N, seatArray);
    for (let i = 0; i < H; i++) {
      console.log(result[i].join(' '));
    }
  });
}