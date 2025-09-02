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
  
  N = parseInt(lines[0]);

  // x,y,z個入りの値段が、A,B,C円 
  // 1 ≦ X < Y < Z ≦ 100 
  // 1 ≦ A, B, C ≦ 100000
  const x = parseInt(lines[1].split(' ')[0]);
  const a = parseInt(lines[1].split(' ')[1]);
  const y = parseInt(lines[2].split(' ')[0]);
  const b = parseInt(lines[2].split(' ')[1]);
  const z = parseInt(lines[3].split(' ')[0]);
  const c = parseInt(lines[3].split(' ')[1]);
  
  let totalPrice = Infinity;
  const maxNum = Math.ceil(N / x);

  for (let i = 0; i <= maxNum; i++) {
    for (let j = 0; j <= maxNum - i; j++) {
      for (let k = 0; k <= maxNum - i - j; k++) {
        if (i * x + j * y + z * k >= N) {
          totalPrice = Math.min(totalPrice, i * a + j * b + k * c);
        }
      }
    }
  }
  console.log(totalPrice);
  
});