/**
 * @param {string} base_word
 * @returns {string}
 * @description 
 * processとは、Node.jsの標準入出力を扱うためのオブジェクトです。
 * stdinは、標準入力のストリームを表します。具体的にはこのファイルをnodeで実行すると
 * コンソールから入力されたデータがここに流れてきます。
 * 
 * 標準入力は初期状態では「待機状態」のため、resume()
 * 「データを受け取る準備ができた」ことをシステムに伝えす。
 * これにより、ユーザーがキーボードで入力したデータが適切にプログラムに流れるようになります。
 * 
 * Ctrl + C で終了
 */
process.stdin.resume();

// 標準入力のエンコーディングをUTF-8に設定します。
process.stdin.setEncoding('utf8');

/**
 * 標準入力のストリームを作成します。
 * 各行のデータをlines配列に格納します。
 */
var lines = []; // varとは、変数を宣言するためのキーワードです。constとは、定数を宣言するためのキーワードです。
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});

/**
 * 標準入力のストリームが閉じられた後の処理
 */
reader.on('close', () => {
  
  const H = parseInt(lines[0].split(' ')[0]);
  const W = parseInt(lines[0].split(' ')[1]);
  const K = parseInt(lines[0].split(' ')[2]);

  const inputArray = [];
  for (let i = 0; i < H; i++) {
    inputArray.push(lines[i + 1].split('').map(Number));
  }
  // console.log(inputArray);

  function vhNum(x, y, array, K) {
    const dirX = Math.min(K - 1, W - x - 1);
    const dirY = Math.min(K - 1, H - y - 1);
    let maxNumX = array[y][x];
    let maxNumY = array[y][x];
    for (let i = 1; i <= dirX; i++) {
      maxNumX = maxNumX * 10 + array[y][x + i];
    }
    for (let j = 1; j <= dirY; j++) {
      maxNumY = maxNumY * 10 + array[y + j][x];
    }
    return Math.max(maxNumX, maxNumY);
  }

  let maxNum = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const num = vhNum(x, y, inputArray, K);
      if (num > maxNum) {
        maxNum = num;
      }
    }
  }

  console.log(maxNum);
});