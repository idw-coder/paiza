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
  // const N = parseInt(lines[0].split(" ")[0]);
  const M = parseInt(lines[0].split(" ")[1]);
  const lightArray = lines[1].split(" ").map(Number);
  const Q = parseInt(lines[2]);

  // console.log(lightArray);
  const lightQArray = [];
  for (let i = 0; i < Q; i++) {
    lightQArray.push(lines[i + 3].split(" ").map(Number));
  }
  // lightQArrayの要素を全て-1する
  for (let i = 0; i < lightQArray.length; i++) {
    lightQArray[i][0] -= 1;
    lightQArray[i][1] -= 1;
  }
  // console.log(lightQArray);

  function addLightFunction(lightArray, startIndex, endIndex) {
    // 区間内のlightArrayの要素を合計
    let sum = 0;
    for (let j = startIndex; j <= endIndex; j++) {
      sum += lightArray[j];
    }
    // console.log(sum);
    const addTotalLight = (M * (endIndex - startIndex + 1)) - sum;
    const addLight = Math.ceil(addTotalLight / (endIndex - startIndex + 1));
    // console.log(addLight);
    // addLightが正であれば、addLightを返す
    if (addLight > 0) {
      return addLight;
    } else {
      return 0;
    }
  }

  let addLightArray = [...lightArray];
  for (let i = 0; i < lightQArray.length; i++) {
    const addLight = addLightFunction(addLightArray, lightQArray[i][0], lightQArray[i][1]);
    for (let j = lightQArray[i][0]; j <= lightQArray[i][1]; j++) {
      addLightArray[j] += addLight;
    }
    // console.log(i, addLight, addLightArray);
  }
  console.log(addLightArray.join(" "));
});
