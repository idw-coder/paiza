function calc(N, inputArray) {
  const fs = require("fs");
  const path = require("path");

  let logContent = "";
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += "========== " + filename + " ==========\n";

  logContent += "N: " + N + "\n";
  logContent += "inputArray: " + JSON.stringify(inputArray) + "\n";

  let minDiff = Infinity;
  for (let i = 0; i < 1 << N; i++) {
  let balance = {
    left: 0,
    right: 0,
    diff: 0,
  };
  
    for (let j = 0; j < N; j++) {
      if (i & (1 << j)) {
        balance.left += inputArray[j];
      } else {
        balance.right += inputArray[j];
      }
    }
    balance.diff = Math.abs(balance.left - balance.right);
    if (balance.diff < minDiff) {
      minDiff = balance.diff;
    }
    logContent += "balance: " + JSON.stringify(balance) + "\n";
  }
  logContent += "minDiff: " + minDiff + "\n";

  console.log(minDiff);
  fs.writeFileSync("debug.log", logContent);
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
    const N = parseInt(lines[0]);

    const inputArray = lines[1].split(" ").map(Number);

    calc(N, inputArray);
  });
}
