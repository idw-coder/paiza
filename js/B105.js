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
  const H = parseInt(lines[0].split(' ')[1]);
  const W = parseInt(lines[0].split(' ')[2]);

  const cells = {};
  const key = (x, y) => `${x},${y}`;

  for (let i = 0; i < 3 * N; i++) {
    let x = parseInt(lines[i + 1].split(' ')[0]);
    let y = parseInt(lines[i + 1].split(' ')[1]);
    let size = parseInt(lines[i + 1].split(' ')[2]);

    const player = i % 3; // 0:a, 1:b, 2:c

    for (let dy = 0; dy < size; dy++) {
      for (let dx = 0; dx < size; dx++) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx < 0 || xx >= W || yy < 0 || yy >= H) continue;

        const k = key(xx, yy);
        const cur = cells[k] ?? null;

        if (player === 0) { // a のターン
          if (cur === null) cells[k] = "a";
          else if (cur === "b") cells[k] = "c";
          else if (cur === "c") cells[k] = "b";
        } else if (player === 1) { // b のターン
          if (cur === null) cells[k] = "b";
          else if (cur === "a") cells[k] = "c";
          else if (cur === "c") cells[k] = "a";
        } else { // c のターン
          if (cur === null) cells[k] = "c";
          else if (cur === "a") cells[k] = "b";
          else if (cur === "b") cells[k] = "a";
        }
      }
    }
  }

  // カウント
  let countA = 0, countB = 0, countC = 0;
  for (const k in cells) {
    if (cells[k] === "a") countA++;
    else if (cells[k] === "b") countB++;
    else if (cells[k] === "c") countC++;
  }

  console.log(countA + " " + countB + " " + countC);
  });