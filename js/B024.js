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
process.stdin.setEncoding("utf8");

/**
 * 標準入力のストリームを作成します。
 * 各行のデータをlines配列に格納します。
 */
var lines = []; // varとは、変数を宣言するためのキーワードです。constとは、定数を宣言するためのキーワードです。
var reader = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
reader.on("line", (line) => {
  lines.push(line);
});

/**
 * 標準入力のストリームが閉じられた後の処理
 */
reader.on("close", () => {

  const r = parseFloat(lines[0]);

  let v = 0;
  for (let i = 0; i <= r; i++) {
    // rが整数の場合
    if (r % 1 === 0) {
      if (i === r) {
        v += r;
        // console.log(i, r, v, "整数");
      }
      // rが少数の場合
    } else if (i === Math.floor(r)) {
        v += Math.ceil(r);
        // console.log(i, Math.ceil(r), v);
    } else {
    const height = Math.ceil(Math.sqrt(r * r - ((i + 1) * (i + 1))));
    v += height;
      // console.log(i, height, v);
    }
  }

  console.log(v * 4);


});
