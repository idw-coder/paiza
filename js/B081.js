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
  
  H = parseInt(lines[0].split(' ')[0]);
  W = parseInt(lines[0].split(' ')[1]);
  
  const inputArray = [];
  for (let i = 0; i < H; i++) {
    inputArray.push(lines[i + 1].split(''));
  }

  const neighborCount = (array) => {
    let count = 0;
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        // 上
        if (i !== 0) {
          if (array[i - 1][j] === '#' && array[i][j] === '#') {
            count++;
          }
        }
        // 右
        if (j !== W - 1) {
          if (array[i][j] === '#' && array[i][j + 1] === '#') {
            count++;
          }
        }
      }
    }
    return count * 2;
  }
  const neighbor = neighborCount(inputArray);
  // console.log("neighbor: " + neighbor);

  const loopCount = (array) => {
    let count = 0;
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        if (array[i][j] === '#') {
          count++;
        }
      }
    }
    return count * 4;
  }
  const loop = loopCount(inputArray);
  // console.log("loop: " + loop);

  console.log(loop - neighbor);
});