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
  
  N = parseInt(lines[0].split(' ')[0]);
  X = parseInt(lines[0].split(' ')[1]);
  Y = parseInt(lines[0].split(' ')[2]);

  const returnArray = [];
  for (let i = 0; i < N; i++) {
    returnArray.push(parseInt(lines[i + 1]));
  }

  const sortReturnArray = returnArray.sort((a, b) => b - a);

  let overDay = -1;
  let currentX = X;
  for (let i = 0; i < N; i++) {
    currentX *= sortReturnArray[i];
    if (currentX / (i + 1) >= Y) {
      // console.log(currentX / (i + 1));
      overDay = i + 1;
      break;
    }
  }

  console.log(overDay);
});