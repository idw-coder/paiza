const { cp } = require('fs');

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
  
  const N = parseInt(lines[0].split(' ')[0]);
  const replaceTextArray = lines[0].split(' ')[1].split('');
  const encryptedTextArray = lines[1].split('');

  const abcArray = [];
  for (let i = 0; i < 26; i++) {
    // 大文字のアルファベットを小文字に変換
    abcArray.push(String.fromCharCode(65 + i).toLowerCase());
  }

  const decryptedText = (baseTextArray) => {
    for (let i = 0; i < baseTextArray.length; i++) {
      if (baseTextArray[i] === ' ') {
        continue;
      }
      baseTextArray[i] = abcArray[replaceTextArray.indexOf(baseTextArray[i])];
    }
    return baseTextArray;
  }

  let decryptedTextArray = encryptedTextArray;
  for (let i = 0; i < N; i++) {
    decryptedTextArray = decryptedText(encryptedTextArray);
  }
  console.log(decryptedTextArray.join(''));
});