function calc(w, h, n, x, y, inputArray) {
  const fs = require("fs");
  const path = require("path");

  let logContent = "";
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += "========== " + filename + " ==========\n";

  logContent += "w: " + w + "\n";
  logContent += "h: " + h + "\n";
  logContent += "n: " + n + "\n";
  logContent += "x: " + x + "\n";
  logContent += "y: " + y + "\n";
  logContent += "inputArray: " + JSON.stringify(inputArray) + "\n";

  // dir_i は "U", "D", "R", "L" のいずれかで与えられ、 それぞれ、上、下、右、左への移動を表します。
  for (let i = 0; i < n; i++) {
    const dir = inputArray[i][0];
    const m = inputArray[i][1];
  
    if (dir === "U") y += m;
    else if (dir === "D") y -= m;
    else if (dir === "R") x += m;
    else if (dir === "L") x -= m;

    // マップ端ラップ処理
    
    x = ((x % w) + w) % w;
    y = ((y % h) + h) % h;
  }

  fs.writeFileSync("debug.log", logContent);

  console.log(x + " " + y);
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
    const w = parseInt(lines[0].split(" ")[0]);
    const h = parseInt(lines[0].split(" ")[1]);
    const n = parseInt(lines[0].split(" ")[2]);
    const x = parseInt(lines[1].split(" ")[0]);
    const y = parseInt(lines[1].split(" ")[1]);
    
    let inputArray = [];
    for (let i = 0; i < n; i++) {
      inputArray.push(lines[i + 2].split(" "));
      inputArray[i][1] = parseInt(inputArray[i][1]);
    }

    calc(w, h, n, x, y, inputArray);
  });
}
