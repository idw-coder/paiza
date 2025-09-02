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
  
  const N = parseInt(lines[0]);

  let array = [];
  for (let i = 0; i < N; i++) {
    array.push(lines[i + 1].split(''));
  }

  isAnagram = (arr1, arr2) => {
    return JSON.stringify([...arr1].sort()) === JSON.stringify([...arr2].sort());
  }

  // sampleMerged = [...array[0], ...array[1]];
  // console.log('sampleMerged', sampleMerged);
  // sampleResult = isAnagram(sampleMerged, array[3]);
  // console.log('target', array[3]);
  // console.log('sampleResult', sampleResult);

  let count = 0;

  for (let i = 0; i < N; i++) {
    for (let j = i; j < N; j++) {
      for (let k = 0; k < N; k++) {
        // if (k !== i && k !== j) {
          const merged = [...array[i], ...array[j]];
          if (isAnagram(merged, array[k])) {
            count++;
          }
        // }
      }
    }
  }
  console.log(count);
  });