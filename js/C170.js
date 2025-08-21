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

  /**
   * perseInt()は、文字列を整数に変換する関数です。
   * 第2引数に10を指定すると、10進数として変換します。
   */
  const shoppingNum = parseInt(lines[0].split(' ')[0], 10);
  const goalPoint = parseInt(lines[0].split(' ')[1], 10);

  let totalPoint = 0;

  for (let i = 0; i < shoppingNum; i++) {

    /**
     * Math.floor()は、小数点以下を切り捨てる関数です。
     */
    const point = Math.floor(parseInt(lines[1].split(' ')[i], 10) / 100);
    totalPoint += point;
  }

  console.log(Math.max(goalPoint - totalPoint, 0) * 100);
});