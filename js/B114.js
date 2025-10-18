function calc(N, K, inputArray) {
  
  // inputArrayの要素の配列を値の大きい順にソート
  for (let i = 0; i < N; i++) {
    inputArray[i].sort((a, b) => b - a);
  }

  // 最初は全員が候補
  let candidates = [];
  for (let i = 0; i < N; i++) {
    candidates.push(i);
  }
  
  // 各順位で絞り込み
  for (let rank = 0; rank < K; rank++) {
    // 候補者の中での最大値を見つける
    let maxValue = -1;
    for (let c of candidates) {
      maxValue = Math.max(maxValue, inputArray[c][rank]);
    }
    
    // 最大値を持つプレイヤーだけを残す
    candidates = candidates.filter(c => inputArray[c][rank] === maxValue);
    
    // 1人に絞れたら終了
    if (candidates.length === 1) break;
  }
  
  // 結果を出力（番号は1から）
  for (let c of candidates) {
    console.log(c + 1);
  }
}

module.exports = { calc };

// テスト時は標準入力処理をスキップ
if (require.main === module) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  var lines = [];
  var reader = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  reader.on("line", (line) => {
    lines.push(line);
  });

  reader.on("close", () => {
    const N = parseInt(lines[0].split(" ")[0]);
    const K = parseInt(lines[0].split(" ")[1]);

    let inputArray = [];
    for (let i = 0; i < N; i++) {
      inputArray.push(lines[i + 1].split(" ").map(Number));
    }

    calc(N, K, inputArray);
  });
}
