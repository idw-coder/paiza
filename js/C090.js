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
  
  const inputArr = lines[0].split('');
  
  let dialNum = 0;
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === '0') {
      dialNum += 12;
    } else if (inputArr[i] === '1') {
      dialNum += 3;
    } else if (inputArr[i] === '2') {
      dialNum += 4;
    } else if (inputArr[i] === '3') {
      dialNum += 5;
    } else if (inputArr[i] === '4') {
      dialNum += 6;
    } else if (inputArr[i] === '5') {
      dialNum += 7;
    } else if (inputArr[i] === '6') {
      dialNum += 8;
    } else if (inputArr[i] === '7') {
      dialNum += 9;
    } else if (inputArr[i] === '8') {
      dialNum += 10;
    } else if (inputArr[i] === '9') {
      dialNum += 11;
    }
  }
  console.log(dialNum * 2);
});