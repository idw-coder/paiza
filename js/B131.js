function calc(N, M, inputArrayA, X, inputArrayRS) {
  
  const fs = require("fs");
  const path = require("path");

  let logContent = "";
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += "========== " + filename + " ==========\n";

  logContent += "N: " + N + "\n";
  logContent += "M: " + M + "\n";
  for (let i = 0; i < N; i++) {
    logContent += "inputArrayA[" + i + "] " + JSON.stringify(inputArrayA[i]) + "\n";
  } 
  logContent += "X: " + X + "\n";
  for (let i = 0; i < X; i++) {
    logContent += "inputArrayRS[" + i + "] " + JSON.stringify(inputArrayRS[i]) + "\n";
  }

  logContent += "--------------------------------\n";

  /**
   * 下記を繰り返し
   * 移動はまず行きたい駅の路線に移動（0円）
   * その後、路線内の移動
   * スタートは1,1
   */

  let totalCost = 0;
  let currentStation = { line: 1, station: 1 };
  for (let i = 0; i < X; i++) {
    logContent += "i " + i + "\n";
    logContent += " currentStation " + JSON.stringify(currentStation) + "\n";
    const nextStation = {
      line: inputArrayRS[i][0],
      station: inputArrayRS[i][1],
    };
    logContent += " nextStation    " + JSON.stringify(nextStation) + "\n";
    // 路線内の移動
    totalCost += Math.abs(
      inputArrayA[nextStation.line - 1][currentStation.station - 1] 
      - inputArrayA[nextStation.line - 1][nextStation.station - 1]
    );
    logContent += " " + inputArrayA[nextStation.line - 1][currentStation.station - 1] + " - " + inputArrayA[nextStation.line - 1][nextStation.station - 1] + " = " + Math.abs(
      inputArrayA[nextStation.line - 1][currentStation.station - 1] 
      - inputArrayA[nextStation.line - 1][nextStation.station - 1]
    ) + "\n";
    logContent += " totalCost " + totalCost + "\n";
    currentStation = nextStation;
    logContent += " currentStation " + JSON.stringify(currentStation) + "\n";

  }

  fs.writeFileSync("debug.log", logContent);

  console.log(totalCost);
  return;
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
    const M = parseInt(lines[0].split(" ")[1]);
    let inputArrayA = [];
    for (let i = 0; i < N; i++) {
      inputArrayA.push(lines[i + 1].split(" ").map(Number));
    }
    const X = parseInt(lines[N + 1]);
    let inputArrayRS = [];
    for (let i = 0; i < X; i++) {
      inputArrayRS.push(lines[N + 2 + i].split(" ").map(Number));
    }

    calc(N, M, inputArrayA, X, inputArrayRS);
  });
}
