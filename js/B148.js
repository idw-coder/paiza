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
    inputArray.push(parseInt(lines[i + 1]));
  }

  // console.log(inputArray);
  // inputArrayは変えたくないので、inputArrayをコピーしてsortedArrayを作成
  const sortedArray = [...inputArray].sort((a, b) => b - a);
  // console.log(inputArray)
  // sortedArrayをもとにキーを得点、値をその得点の順位とする連想配列を作成
  const rankMap = {};
  for (let i = 0; i < sortedArray.length; i++) {
    const score = sortedArray[i];
    if (rankMap[score] === undefined) {
      rankMap[score] = i + 1;
    }
  }
  // console.log(rankMap);
  for (let i = 0; i < N; i++) {
    console.log(rankMap[inputArray[i]]);
  }


});