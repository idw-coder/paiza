function countAdventurers (x, y, array, h, w) {
  let maxNum = 0;
  x = x - 1; // 0始まりに変換
  y = y - 1;

  let countNorth = 0;
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < w; j++) {
      countNorth += (array[i][j] === '#' ? 0 : Number(array[i][j])) || 0;
    }
  }
  let countWest = 0;
  for (let i = 0; i < h; i++) {
    for (let j = x + 1; j < w; j++) {
      countWest += (array[i][j] === '#' ? 0 : Number(array[i][j])) || 0;
    }
  }
  let countSouth = 0;
  for (let i = y + 1; i < h; i++) {
    for (let j = 0; j < w; j++) {
      countSouth += (array[i][j] === '#' ? 0 : Number(array[i][j])) || 0;
    }
  }
  let countEast = 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < x; j++) {
      countEast += (array[i][j] === '#' ? 0 : Number(array[i][j])) || 0;
    }
  }

  maxNum = Math.max(countNorth, countEast, countSouth, countWest);
  resultDirection = maxNum === countNorth ? 'N' :
                    maxNum === countEast ? 'E' :
                    maxNum === countSouth ? 'S' : 'W';
  return { resultDirection, maxNum };
}

module.exports = { countAdventurers };

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
    const Y = parseInt(lines[1].split(' ')[0]);
    const X = parseInt(lines[1].split(' ')[1]);

    const inputArray = [];
    for (let i = 2; i < H + 2; i++) {
      // 文字列のまま配列に格納
      inputArray.push(lines[i].split(''));
    }

    const result = countAdventurers(X, Y, inputArray, H, W);
    resultDirection = result.resultDirection;
    maxNum = result.maxNum;
    console.log(resultDirection, maxNum);
  });
}