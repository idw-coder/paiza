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
  N = parseInt(lines[1].split(' ')[0]);
  T = parseInt(lines[1].split(' ')[1]);

  // 2次元配列を作成
  const inputArray = [];
  for (let i = 0; i < N; i++) {
    inputArray.push(lines[i + 2].split(' ').map(Number));
  }

  // カウント用のオブジェクト
  const countObject = {};
  inputArray.forEach(subArray => {
    const key = JSON.stringify(subArray);
    // 数値や配列は参照で比較されるため、文字列に変換して比較
    countObject[key] = (countObject[key] || 0) + 1;
  });

  // console.log(countObject);

  const sortedCountArray = Object.entries(countObject).sort((a, b) => b[1] - a[1]); // 出現回数でソート

  let sum = 0;
  const maxIndex = Math.min(T, sortedCountArray.length);
  for (let i = 0; i < maxIndex; i++) {
    sum += sortedCountArray[i][1];
  }

  console.log(sum);

});