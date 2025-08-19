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
  
  // 入力されたデータをスペースで分割して、配列に格納。そのうち、1番目の要素を取得。
  let entryPoint = parseInt(lines[0].split(' ')[0]);
  let returnRate = parseInt(lines[1].split(' ')[0]) / 100;

  let usedMoney = entryPoint;
  // 切り捨てて整数にするために、Math.floorを使用する
  entryPoint = Math.floor(entryPoint * returnRate);
  for (let i = 0; i < 6; i++) {
    usedMoney += entryPoint;
    entryPoint = Math.floor(entryPoint * returnRate);
  }

  console.log(usedMoney);
  // PS C:\ida_test\work\paiza\js> Get-Content ..\input01.txt | node C169.js
});