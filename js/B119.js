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

  const fishArray = [];
  for (let i = 1; i <= H; i++) {
    fishArray.push(lines[i].split(' ').map(Number));
  }

  // console.log(fishArray);

  const netH = parseInt(lines[H + 1].split(' ')[0]);
  const netW = parseInt(lines[H + 1].split(' ')[1]);

  const netArray = [];
  for (let i = H + 2; i <= H + 2 + netH - 1; i++) {
    netArray.push(lines[i].split(''));
  }

  // console.log(netArray);

  const countCaughtFish = (x, y) => {
    let caughtFish = 0;
    for (let i = 0; i < netArray.length; i++) {
      for (let j = 0; j < netArray[i].length; j++) {
        if (netArray[i][j] === '#' && x + i < H && y + j < W) {
          caughtFish += fishArray[x + i][y + j];
        }
      }
    }
    return caughtFish;
  }

  for (let i = 0; i <= H - netH; i++) {
    for (let j = 0; j <= W - netW; j++) {
      countCaughtFish(i, j);
    }
  }

  let maxCaughtFish = 0;
  for (let i = 0; i <= H - netH; i++) {
    for (let j = 0; j <= W - netW; j++) {
      maxCaughtFish = Math.max(maxCaughtFish, countCaughtFish(i, j));
      // console.log(maxCaughtFish);
    }
  }

  console.log(maxCaughtFish);
});