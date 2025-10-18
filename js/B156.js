function calc(h, w, l, r, inputArray) {
  const fs = require("fs");
  const path = require("path");

  let logContent = "";
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += "========== " + filename + " ==========\n";

  let lotationArray = [];

  // {left: 0, top: 0, right: w, bottom: h}
  let start_point = { left: 0, top: 0, right: w - 1, bottom: h - 1 };
  let direction_of_travel = 0; // 0: →, 1: ↓, 2: ←, 3: ↑

  while (
    // start_point.left <= w / 2 &&     // 左
    // start_point.top <= h / 2 &&      // 上
    // start_point.right >= w / 2 &&    // 右
    // start_point.bottom >= h / 2      // 下
    true
  ) {
    // →
    if (direction_of_travel === 0) {
      if (start_point.left > start_point.right) {
        break;
      }
      for (let i = start_point.left; i <= start_point.right; i++) {
        lotationArray.push(inputArray[start_point.top][i]);
        logContent +=
          "→ " +
          start_point.top +
          " " +
          i +
          " " +
          inputArray[start_point.top][i] +
          "\n";
      }
      start_point.top++;
      direction_of_travel++;
      logContent +=
        "--- left " +
        start_point.left +
        " top " +
        start_point.top +
        " right " +
        start_point.right +
        " bottom " +
        start_point.bottom +
        "\n";

      // ↓
    } else if (direction_of_travel === 1) {
      if (start_point.top > start_point.bottom) {
        break;
      }
      for (let i = start_point.top; i <= start_point.bottom; i++) {
        lotationArray.push(inputArray[i][start_point.right]);
        logContent +=
          "↓ " +
          i +
          " " +
          start_point.right +
          " " +
          inputArray[i][start_point.right] +
          "\n";
      }
      start_point.right--;
      direction_of_travel++;
      logContent +=
        "--- left " +
        start_point.left +
        " top " +
        start_point.top +
        " right " +
        start_point.right +
        " bottom " +
        start_point.bottom +
        "\n";

      // ←
    } else if (direction_of_travel === 2) {
      if (start_point.right < start_point.left) {
        break;
      }
      for (let i = start_point.right; i >= start_point.left; i--) {
        lotationArray.push(inputArray[start_point.bottom][i]);
        logContent +=
          "← " +
          start_point.bottom +
          " " +
          i +
          " " +
          inputArray[start_point.bottom][i] +
          "\n";
      }
      start_point.bottom--;
      direction_of_travel++;
      logContent +=
        "--- left " +
        start_point.left +
        " top " +
        start_point.top +
        " right " +
        start_point.right +
        " bottom " +
        start_point.bottom +
        "\n";
      // ↑
    } else if (direction_of_travel === 3) {
      if (start_point.bottom < start_point.top) {
        break;
      }
      for (let i = start_point.bottom; i >= start_point.top; i--) {
        lotationArray.push(inputArray[i][start_point.left]);
        logContent +=
          "↑ " +
          i +
          " " +
          start_point.left +
          " " +
          inputArray[i][start_point.left] +
          "\n";
      }
      start_point.left++;
      direction_of_travel = 0;
      logContent +=
        "--- left " +
        start_point.left +
        " top " +
        start_point.top +
        " right " +
        start_point.right +
        " bottom " +
        start_point.bottom +
        "\n";
    }
  }

  // lからrまでの要素を取り出す
  let resultArray = [];
  for (let i = l - 1; i <= r - 1; i++) {
    resultArray.push(lotationArray[i]);
  }
  console.log(resultArray.join(""));

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
    const H = parseInt(lines[0].split(" ")[0]);
    const W = parseInt(lines[0].split(" ")[1]);
    const L = parseInt(lines[1].split(" ")[0]);
    const R = parseInt(lines[1].split(" ")[1]);

    let inputArray = [];
    for (let i = 0; i < H; i++) {
      inputArray.push(lines[i + 2].split(""));
    }

    calc(H, W, L, R, inputArray);
  });
}
