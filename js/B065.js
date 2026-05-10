function calc(H, W, N, grid) {
  const fs = require('fs');
  const path = require('path');

  let logContent = '';
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += '========== ' + filename + ' ==========\n';

  logContent += H + '\n';
  logContent += W + '\n';
  logContent += N + '\n';

  for (let i = 0; i < N; i++) {
    logContent += 'grid[' + i + '] ' + JSON.stringify(grid[i]) + '\n';
  }

  logContent += '--------------------------------\n';

  let gridA = Array.from({ length: H }, () => new Array(Number(W)).fill('.'));

  for (let i = 0; i < H; i++) {
    logContent += 'gridA[' + i + '] ' + JSON.stringify(gridA[i]) + '\n';
  }

  logContent += '--------------------------------\n';

  let wordGrid = [];
  for (let i = 0; i < N; i++) {
    wordGrid[i] = grid[i][3].split('');
    logContent += wordGrid[i] + '\n';
  }

  logContent += '--------------------------------\n';

  for (i = 0; i < N; i++) {
    if (grid[i][2] === 0) {
      for (k = 0; k < grid[i][3].length; k++) {
        gridA[grid[i][0] + k - 1][grid[i][1] - 1] = wordGrid[i][k];
      }
    } else if (grid[i][2] === 1) {
      for (k = 0; k < grid[i][3].length; k++) {
        gridA[grid[i][0] - 1][grid[i][1] + k - 1] = wordGrid[i][k];
      }
    }
  }

  for (let i = 0; i < H; i++) {
    logContent += 'gridA[' + i + '] ' + JSON.stringify(gridA[i]) + '\n';
    console.log(gridA[i].join(''));
  }

  fs.writeFileSync('debug.log', logContent);

  return;
}

module.exports = { calc };

// テスト時は標準入力処理をスキップ
if (require.main === module) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var lines = [];
  var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  reader.on('line', (line) => {
    lines.push(line);
  });

  reader.on('close', () => {
    const H = lines[0].split(' ')[0];
    const W = lines[0].split(' ')[1];
    const N = lines[1];

    const grid = lines.slice(2).map((line) => {
      return line.split(' ').map((part, index) => (index !== 3 ? Number(part) : part));
    });

    calc(H, W, N, grid);
  });
}
