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
  
  const H = parseInt(lines[0].split(' ')[0]);
  const W = parseInt(lines[0].split(' ')[1]);
  const N = parseInt(lines[1]);

  let array = [];
  for (let i = 0; i < H; i++) {
    array.push(lines[i + 2].split(' ').map(Number));
  }

  function maxCalc(array, x, y) {
    let max = 0;
    let maxLeft = 0;
    let maxRight = 0;
    let maxUp = 0;
    let maxDown = 0;
    // 左にN個のマスがある場合
    if (x > N) {
      for (let i = 0; i < N; i++) {
        maxLeft += array[y][x - i];
      }
    } else {
      for (let i = 0; i < x; i++) {
        maxLeft += array[y][x - i];
      }
    }
    // 右にN個のマスがある場合
    if (W - x > N) {
      for (let i = 0; i < N; i++) {
        maxRight += array[y][x + i];
      }
    } else {
      for (let i = 0; i < W - x; i++) {
        maxRight += array[y][x + i];
      }
    }
    // 上にN個のマスがある場合
    if (y > N) {
      for (let i = 0; i < N; i++) {
        maxUp += array[y - i][x];
      }
    } else {
      for (let i = 0; i < y; i++) {
        maxUp += array[y - i][x];
      } 
    }
    // 下にN個のマスがある場合
    if (H - y > N) {
      for (let i = 0; i < N; i++) {
        maxDown += array[y + i][x];
      }
    } else {
      for (let i = 0; i < H - y; i++) {
        maxDown += array[y + i][x];
      }
    }
    max = Math.max(maxLeft, maxRight, maxUp, maxDown);
    return max;
  }

  let max = 0;
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      const result = maxCalc(array, j, i);
      if (result > max) {
        max = result;
      }
    }
  }
  console.log(max);
});