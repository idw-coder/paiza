function calc(N, inputArray) {
  const fs = require('fs');
  const path = require('path');

  let logContent = '';
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += '========== ' + filename + ' ==========\n';

  logContent += 'N: ' + N + '\n';
  for (let i = 0; i < N; i++) {
    logContent += 'inputArray[' + i + '] ' + JSON.stringify(inputArray[i]) + '\n';
  }

  logContent += '--------------------------------\n';

  // 全部分数列の中央値を収集
  const medians = [];
  for (let l = 0; l < N; l++) {
    for (let r = l; r < N; r++) {
      // 部分数列 inputArray[l..r] を取り出してソート
      const sub = inputArray.slice(l, r + 1).sort((a, b) => a - b);
      const len = sub.length;
      let median;
      if (len % 2 === 1) {
        // 奇数：中央の値
        median = sub[Math.floor(len / 2)];
      } else {
        // 偶数：中央2つの平均
        median = (sub[len / 2 - 1] + sub[len / 2]) / 2;
      }
      medians.push(median);
    }
  }
  // 集めた中央値全体の中央値を求める
  medians.sort((a, b) => a - b);
  const totalLen = medians.length;
  let result;
  if (totalLen % 2 === 1) {
    result = medians[Math.floor(totalLen / 2)];
  } else {
    result = (medians[totalLen / 2 - 1] + medians[totalLen / 2]) / 2;
  }

  logContent += result;

  fs.writeFileSync('debug.log', logContent);
  console.log(result);

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
    const N = parseInt(lines[0]);
    const inputArray = lines[1].split(' ').map(Number);

    calc(N, inputArray);
  });
}
