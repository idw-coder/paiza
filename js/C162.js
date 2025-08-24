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
  let cardNum = parseInt(lines[0].split(' ')[0]);
  let shuffleNum = parseInt(lines[0].split(' ')[1]);

  // cardNumの値に基づいて配列を定義
  let cardArray = [];
  for (let i = 1; i <= cardNum; i++) {
    cardArray.push(i);
  }
  
  // console.log('カード配列:', cardArray); // デバッグ用

  // シャッフル処理のループ
  for (let i = 0; i < shuffleNum; i++) {

    cardArrayA = cardArray.slice(0, cardNum / 2);
    cardArrayB = cardArray.slice(cardNum / 2);

    for (let j = 0; j < cardNum; j++) {
      if (j % 2 === 0) {
        if (j === 0) {  
          cardArray[j] = cardArrayB[j];
        } else {
          cardArray[j] = cardArrayB[j / 2];
        }
      } else {
        if (j === 1) {
          cardArray[j] = cardArrayA[j-1];
        } else {
          cardArray[j] = cardArrayA[(j-1) / 2];
        }
      }
    }
    // console.log('シャッフル後のカード配列:', cardArray); // デバッグ用
  }
  console.log(cardArray.join(' '));
});