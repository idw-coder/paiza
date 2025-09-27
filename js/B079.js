function calcMatch (s, t) {
  const st = s + t;
  const ts = t + s;
  // アルファベットを数字1～26に変換
  const charToNum = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  let numSt = st.split('').map(charToNum);
  let numTs = ts.split('').map(charToNum);

  // console.log(numSt, numTs);

  while (numSt.length > 1) {
    for (let i = 0; i < numSt.length; i++) {
      if (i !== numSt.length - 1) {
      numSt[i] = numSt[i] + numSt[(i + 1)];
      numSt[i] = numSt[i] > 100 ? numSt[i] - 101 : numSt[i];
      numTs[i] = numTs[i] + numTs[(i + 1)];
      numTs[i] = numTs[i] > 100 ? numTs[i] - 101 : numTs[i];
      } else { // 最後の要素は削除
        numSt.pop();
        numTs.pop();
      }
    }
    // console.log(numSt, numTs);
  }

  return (Math.max(...numSt,...numTs));
}

module.exports = { calcMatch };

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
    const s = lines[0].split(' ')[0];
    const t = lines[0].split(' ')[1];

    const result = calcMatch(s, t);
    console.log(result);

  });
}