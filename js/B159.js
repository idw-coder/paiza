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


function calculateSatisfaction(arrays, indexA, indexB, indexC, M) {
  if (arrays[indexA][0] + arrays[indexB][0] + arrays[indexC][0] > M) {
    return -1;
  }

  if (arrays[indexA][2] === arrays[indexB][2]
    || arrays[indexB][2] === arrays[indexC][2]
    || arrays[indexC][2] === arrays[indexA][2]) {
    return -1;
  }
  return arrays[indexA][1] + arrays[indexB][1] + arrays[indexC][1];
}
// テスト用のエクスポート
module.exports = { calculateSatisfaction };

/**
 * 標準入力のストリームが閉じられた後の処理
 */
reader.on('close', () => {
  
  const N = parseInt(lines[0].split(' ')[0]);
  const M = parseInt(lines[0].split(' ')[1]);

  const calorieArray = lines[1].split(' ').map(Number);
  const satisfactionArray = lines[2].split(' ').map(Number);
  const typeArray = lines[3].split(' ').map(Number);

  let allArrays = [];
  for (let i = 0; i < N; i++) {
    allArrays.push([calorieArray[i], satisfactionArray[i], typeArray[i]]);
  }
  // console.log(allArrays);

  let maxSatisfaction = -1;

  for (let i = 0; i < N - 2; i++) {
    for (let j = i + 1; j < N - 1; j++) {
      for (let k = j + 1; k < N; k++) {
        const satisfaction = calculateSatisfaction(allArrays, i, j, k, M);
        if (satisfaction > maxSatisfaction) {
          maxSatisfaction = satisfaction;
        }
      }
    }
  }

  console.log(maxSatisfaction);
});