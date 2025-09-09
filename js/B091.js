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
  
  const N = parseInt(lines[0]);

  const inputArray = [];
  for (let i = 0; i < N; i++) {
    inputArray[i] = (lines[i + 1].split(' ').map(Number));
  }

  // console.log(inputArray);

  // 一つ目の引数int1の値を2つ目の引数array[arrayValue, arrayValue2, ...]の各値と比較して、
  // すべてより大きい場合はint1を返す
  const compareInt1 = (int1, array) => {
    for (let i = 0; i < array.length; i++) {
      if (int1 <= array[i]) {
        return;
      }
    }
    return int1;
  }

  let mountainTopArray = [];

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
        mountainTopArray.push(compareInt1(inputArray[i][j], 
          [
            (i - 1 >= 0) ? inputArray[i - 1][j] : 0,
            (j + 1 < N) ? inputArray[i][j + 1] : 0,
            (i + 1 < N) ? inputArray[i + 1][j] : 0,
            (j - 1 >= 0) ? inputArray[i][j - 1] : 0
          ]));
    }
  }

  // 配列からundefinedを削除
  mountainTopArray = mountainTopArray.filter(value => value !== undefined).sort((a, b) => b - a);
  console.log(mountainTopArray.join('\n'));


});