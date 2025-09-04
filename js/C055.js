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
  const importantStringArray = lines[1].split('');

  function isInclude(importantStringArray, stringArray) {
    if (importantStringArray.length > stringArray.length) {
      return false;
    }
    for (let i = 0; i <= stringArray.length - importantStringArray.length; i++) {
      if (importantStringArray.join('') === stringArray.slice(i, i + importantStringArray.length).join('')) {
        return true;
      }
    }
    return false;
  };

  let noMatch = true;
  for (let i = 2; i < N + 2; i++) {
    const stringArray = lines[i].split('');
    if (isInclude(importantStringArray, stringArray)) {
      console.log(lines[i]);
      noMatch = false;
    }
  }
  if (noMatch) {
    console.log('None');
  }
});