const { cp } = require('fs');

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
  
  const n = parseInt(lines[0]);

  const inputArray = [];
  for (let i = 0; i < n; i++) {
    inputArray.push(lines[i + 1]);
  }

  const nowPage = (array) => {
    const resultArray = [];
    const history = [];
    for (let i = 0; i < array.length; i++) {
      const q = array[i];
      // use the back buttonが含まれているか
      if (q.includes('use the back button')) {
        // 履歴が2件以上場合
        if (history.length > 1) {
          history.pop();
        } 
      } else if (q.startsWith('go to ')) {
        // 'go to ' の後ろ全てがページ名
        const page = q.slice(6);
        // 新しいページに移動（進む履歴は自然消滅＝スタック末尾を現在にするだけ）
        history.push(page);
      }

      // 現在ページを出力配列に追加
      // （履歴が空のケースは問題文の前提上起きないが、保険で 'blank page' を補う）
      resultArray.push(history.length ? history[history.length - 1] : 'blank page');
    }

    return resultArray;
  };

  const resultArray = nowPage(inputArray);
  for (let i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i]);
  }

});