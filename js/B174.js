function calc(S, T) {
  const fs = require('fs');
  const path = require('path');

  let logContent = '';
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += '========== ' + filename + ' ==========\n';

  logContent += S + '\n';
  logContent += T + '\n';

  logContent += '--------------------------------\n';

  // 配列を引数に取るように修正
  const fn = (arr) => {
    let tmp = [...arr];
    for (let i = 0; i < arr.length; i++) {
      if ((i === 0)) {
        if (arr[arr.length - 1] === '-' && arr[i + 1] === '-') {
          tmp[i] = T[0];
        } else if (arr[arr.length - 1] === '-' && arr[i + 1] === '+') {
          tmp[i] = T[1];
        } else if (arr[arr.length - 1] === '+' && arr[i + 1] === '-') {
          tmp[i] = T[2];
        } else {
          tmp[i] = T[3];
        }
      } else if ((i === arr.length - 1)) {
        if (arr[i - 1] === '-' && arr[0] === '-') {
          tmp[i] = T[0];
        } else if (arr[i - 1] === '-' && arr[0] === '+') {
          tmp[i] = T[1];
        } else if (arr[i - 1] === '+' && arr[0] === '-') {
          tmp[i] = T[2];
        } else {
          tmp[i] = T[3];
        }
      } else {
        if (arr[i - 1] === '-' && arr[i + 1] === '-') {
          tmp[i] = T[0];
        } else if (arr[i - 1] === '-' && arr[i + 1] === '+') {
          tmp[i] = T[1];
        } else if (arr[i - 1] === '+' && arr[i + 1] === '-') {
          tmp[i] = T[2];
        } else {
          tmp[i] = T[3];
        }
      }
    }
    return tmp;
  };

  const initial = S.join('');
  const visited = new Set([initial]);
  let resultArr = fn(S);
  let result = ''
  while (true) {
    const key = resultArr.join('');
    if (key === initial) {
      result = 'YES';
      break;
    }
    if (visited.has(key)) {
      result = 'NO';
      break;
    }
    visited.add(key);
    resultArr = fn(resultArr);
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
    const S = lines[0].split(' ')[0].split('');
    const T = lines[0].split(' ')[1].split('');

    calc(S, T);
  });
}
