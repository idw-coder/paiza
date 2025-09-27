function calcExit (h, w , y, x, array) {
  let posY = y - 1;
  let posX = x - 1;

  while (posY < h) {
    if ((0 <= posX - 1 && posX - 1 < w) && array[posY][posX - 1] === '.') {
      while ((0 <= posX - 1 && posX - 1 < w) && array[posY][posX - 1] === '.') {
        posX--;
      }
      posY++;
      if (posY === h - 1) {
        return { posY: posY + 1, posX: posX + 1 };
      }
    } else if ((0 <= posX + 1 && posX + 1 < w) && array[posY][posX + 1] === '.') {
      while ((0 <= posX + 1 && posX + 1 < w) && array[posY][posX + 1] === '.') {
        posX++;
      }
      posY++;
      if (posY === h - 1) {
        return { posY: posY + 1, posX: posX + 1 };
      }
    } else {
      posY++;
      if (posY === h - 1) {
        return { posY: posY + 1, posX: posX + 1 };
      }
    }
  }

  return { posY, posX };
}

module.exports = { calcExit };

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
    const H = lines[0].split(' ')[0];
    const W = lines[0].split(' ')[1];
    const Y = lines[1].split(' ')[0];
    const X = lines[1].split(' ')[1];

    let baseArray = [];
    for (let i = 0; i < H; i++) {
      baseArray.push(lines[i + 2].split(''));
    }
    // console.log('---');
    // for (let i = 0; i < H; i++) {
      // console.log(baseArray[i].join(''));
    // }

    const result = calcExit(H, W, Y, X, baseArray);
    console.log((result.posY) + ' ' + (result.posX));


  });
}