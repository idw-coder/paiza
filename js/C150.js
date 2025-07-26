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
  const possibleDistance = lines[0].split(' ')[1];

  const myHouseX = lines[1].split(' ')[0];
  const myHouseY = lines[1].split(' ')[1];

  const possibleHouses = [];
  for (let i = 2; i < lines.length; i++) {
    const houseX = lines[i].split(' ')[0];
    const houseY = lines[i].split(' ')[1];

    // 距離を計算、Math.absは絶対値を計算する関数です。
    const distance = Math.abs(houseX - myHouseX) + Math.abs(houseY - myHouseY);
    if (distance <= possibleDistance) {
      possibleHouses.push(distance);
    }
  }

  console.log(possibleHouses.length);
});