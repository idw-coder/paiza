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
  
  array = [];
  arrBomCol = [];
  for (let i = 0; i < W; i++) {
    arrBomCol.push('.');
  }

  for (let h = 0; h < H; h++) {
    array[h] = lines[h + 1].split('');
    for (let w = 0; w < W; w++) {
      if (array[h][w] === '#') {
        arrBomCol[w] = '#';
      }
    }
  }

  // console.log(arrBomCol);

  let count = 0;
  for (let h = 0; h < H; h++) {
    if (array[h].includes('#')) {
      count += W;
    } else {
      for (let w = 0; w < W; w++) {
        if (arrBomCol[w] === '#') {
          count++;
        }
      }
    }
  }
  console.log(count);
});