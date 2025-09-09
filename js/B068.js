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
  
  H = parseInt(lines[0].split(' ')[0]);
  W = parseInt(lines[0].split(' ')[1]);
  
  const inputArray = [];
  for (let i = 0; i < H; i++) {
    inputArray[i] = (lines[i + 1].split(' ').map(Number));
  }

  const chocoSplit = (array) => {
    const result = [];
    const total = array.reduce((acc, curr) => acc + curr, 0);
    const half = total / 2;

    let splitOkFlag = false;

    // TODO: ここの処理が間違っている
    for (let i = 0; i < array.length; i++) {
      if (array.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0) === half) {
        splitOkFlag = true;
        break;
      }
    }

    if (!splitOkFlag) {
      return "No";
    }

    const arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
      if (array.slice(0, i + 1).reduce((acc, curr) => acc + curr, 0) <= half) {
        result.push("A");
      } else {
        result.push("B");
      }
    }
    return result.join("");
  }

  const resultArray = [];
  for (let i = 0; i < H; i++) {
    resultArray.push(chocoSplit(inputArray[i]));
  };

  // console.log(resultArray);

  if (resultArray.includes("No")) {
    console.log("No");
  } else {
    console.log("Yes");
    console.log(resultArray.join("\n"));
  }
});