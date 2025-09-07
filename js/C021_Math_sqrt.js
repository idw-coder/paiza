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
  
  const xc = parseInt(lines[0].split(' ')[0]);
  const yc = parseInt(lines[0].split(' ')[1]);
  const r_1 = parseInt(lines[0].split(' ')[2]);
  const r_2 = parseInt(lines[0].split(' ')[3]);
  const n = parseInt(lines[1]);

  for (let i = 2; i < n + 2; i++) {
    const x = parseInt(lines[i].split(' ')[0]);
    const y = parseInt(lines[i].split(' ')[1]);

    /**
     * Math.sqrt は、平方根を求める関数です。
     * ** は、累乗を求める演算子です。
     */
    (Math.sqrt((x - xc) ** 2 + (y - yc) ** 2) >= r_1 && Math.sqrt((x - xc) ** 2 + (y - yc) ** 2) <= r_2) 
    ? console.log('yes') : console.log('no');
  }
});