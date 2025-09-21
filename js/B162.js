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
  const R = parseInt(lines[0].split(" ")[0]);
  const C = parseInt(lines[0].split(" ")[1]);

  // グリッドを作成、2次元配列で作成
  const grid = [];
  for (let i = 0; i < R; i++) {
    const row = [];
    for (let j = 0; j < C; j++) {
      row.push(lines[i + 1].split("")[j]);
    }
    grid.push(row);
  }

  for (let i = 0; i < R; i++) {
    // console.log(grid[i].join(" "));
  }

  function checkXsize(grid, i, j) {
    let xsize = 0;
    if (grid[i][j] !== ".") {
      return xsize;
    }

    for (let k = 1; k < Math.min(R/2 + 1, C/2 + 1); k++) {
      // console.log("k", k);
      // グリッドの範囲内でXが連続している場合はカウント
      if (i-k < 0 || j-k < 0 || i+k >= R || j+k >= C) {
        break;
      }
      if (
        (grid[i-k][j-k] === ".") &&
        (grid[i-k][j+k] === ".") &&
        (grid[i+k][j-k] === ".") &&
        (grid[i+k][j+k] === ".")
      ) {
        xsize++;
        // console.log(i, j, k, xsize);
      } else {
        break;
      }
    }
    return xsize;
  }

  let maxXsize = 0; 
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      // console.log(i, j);
      maxXsize = Math.max(maxXsize, checkXsize(grid, i, j));
    }
  }
  console.log(maxXsize);
});
