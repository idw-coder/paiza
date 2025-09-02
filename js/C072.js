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
  
  ATK = parseInt(lines[0].split(' ')[0]);
  DEF = parseInt(lines[0].split(' ')[1]);
  AGI = parseInt(lines[0].split(' ')[2]);

  monsterNum = parseInt(lines[1]);

  noMatch = true;
  for (let i = 2; i < monsterNum + 2; i++) {
    monsterName = lines[i].split(' ')[0];
    monsterMinATK = parseInt(lines[i].split(' ')[1]);
    monsterMaxATK = parseInt(lines[i].split(' ')[2]);
    monsterMinDEF = parseInt(lines[i].split(' ')[3]);
    monsterMaxDEF = parseInt(lines[i].split(' ')[4]);
    monsterMinAGI = parseInt(lines[i].split(' ')[5]);
    monsterMaxAGI = parseInt(lines[i].split(' ')[6]);

    if (monsterMinATK <= ATK && ATK <= monsterMaxATK &&
      monsterMinDEF <= DEF && DEF <= monsterMaxDEF &&
      monsterMinAGI <= AGI && AGI <= monsterMaxAGI) {
      console.log(monsterName);
      noMatch = false;
    }
  }
  if (noMatch) {
    console.log('no evolution');
  }
});