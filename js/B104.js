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
  
  N = parseInt(lines[0].split(' ')[0]);
  M = parseInt(lines[0].split(' ')[1]);
  
  answerArray = [];

  for (let i = 0; i < N; i++) {
    answerArray.push(lines[i + 1].split(' '));
  }

  for (let i = 0; i < M; i++) {
    let count = 0;
    let sum = 0;
    for (let j = 0; j < N; j++) {
      // 0 以上 100 以下の整数は有効
      const s = answerArray[j][i];          // 文字列
      if (/^\d+$/.test(s)) {                // ← 整数表記のみ許可（先頭0可）
        const v = Number(s);
        if (0 <= v && v <= 100) {
          sum += v;
          count++;
        }
      }
    }
    if (count === 0) {
      console.log(0);
    } else {
      console.log(Math.floor(sum / count));
    }
  }

});