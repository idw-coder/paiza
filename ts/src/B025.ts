function calc(C_1: number, C_3: number, arr: number[]) {
  const fs = require('fs');
  const path = require('path');

  let logContent = '';
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += '———————— ' + filename + ' ———————\n';

  logContent += C_1 + '\n';
  logContent += C_3 + '\n';
  logContent += arr + '\n';

  logContent += '———————\n';

  const positionArr: (number | null)[] = [];

  logContent += positionArr + '\n';

  logContent += '———————\n';
  for (let i = 0; i < arr.length; i++) {
    positionArr[arr[i]! - 1] = i + 1;
  }
  for (let i = 0; i < C_1; i++) {
    if (positionArr[i] === undefined) positionArr[i] = null;
  }

  logContent += positionArr + '\n';
  logContent += '———————\n';

  const jump = (arr: (number | null)[]): void => {
    for (let i = 1; i <= arr.filter((item) => item !== null).length; i++) {
      // iのうさぎの場所
      let targetIndex = arr.indexOf(i);
      logContent += 'i' + i + ' tagetIndex ' + targetIndex + '\n';
      logContent += positionArr + '\n';
      if (targetIndex === -1) {
        logContent += 'continue\n';
        continue;
      }

      for (let k = targetIndex + 1; k < targetIndex + positionArr.length; k++) {
        if (k < positionArr.length && positionArr[k] === null) {
          positionArr[k] = i;
          logContent += 'i' + i + ' k' + k + ' moved ' + targetIndex + ' to ' + k + '\n';
          positionArr[targetIndex] = null;
          logContent += positionArr + '\n';
          break;
        } else if (k >= positionArr.length && positionArr[k - positionArr.length] === null) {
          positionArr[k - positionArr.length] = i;
          logContent += 'i' + i + ' k' + k + ' moved ' + targetIndex  + ' to ' + (k - positionArr.length) + '\n';
          positionArr[targetIndex] = null;
          logContent += positionArr + '\n';
          break;
        }
      }

      logContent += '———————\n';
    }
  };

  logContent += '———————\n';
  for (let i = 0; i < C_3; i++) {
    logContent += 'start' + i + '\n';
    
    jump(positionArr);
    logContent += 'end' + i + '\n' + positionArr + '\n——————————————\n';
  }
  logContent += '———————\n';

  for (let i = 1; i <= arr.length; i++) {
    console.log(positionArr.indexOf(i) + 1);
  }

  fs.writeFileSync('debug.log', logContent);

  return;
}

module.exports = { calc };

// テスト時は標準入力処理をスキップ
if (require.main === module) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var lines: string[] = []; // 文字列専用の配列
  var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  reader.on('line', (line: string) => {
    lines.push(line);
  });

  reader.on('close', () => {
    const [C_1, C_2, C_3] = lines[0]!.split(' ').map(Number) as [number, number, number];
    const arr = lines.slice(1, C_2 + 1).map(Number);

    calc(C_1, C_3, arr);
  });
}
