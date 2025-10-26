function calc(N, inputArray, calledArray) {
  
  const fs = require("fs");
  const path = require("path");

  let logContent = "";
  // ファイル名を取得
  const filename = path.basename(__filename);
  logContent += "========== " + filename + " ==========\n";

  logContent += "N: " + N + "\n";
  logContent +=
    "inputArray:\n" + inputArray.map((row) => row.join(" ")).join("\n") + "\n";
  logContent += "calledArray:\n" + calledArray.join(" ") + "\n";

  let resultArray = [];
  logContent += "--------------------------------\n";
  // 横のビンゴをチェック
  for (let i = 0; i < 4; i++) {
    logContent += "横 " + i + "行目 " + inputArray[i].join(" ") + "\n";
    let remaining_numbers = inputArray[i];
    for (let j = 0; j < 4; j++) {
      if (calledArray.includes(inputArray[i][j])) {
        remaining_numbers = remaining_numbers.filter(
          (number) => number !== inputArray[i][j]
        );
        // logContent += "削除後の配列: " + remaining_numbers.join(" ") + "\n";
      }
    }
    if (remaining_numbers.length === 1) {
      logContent += "リーチ　 " + remaining_numbers[0] + "\n";
      resultArray.push(remaining_numbers[0]);
      break;
    }
    // logContent += "横の残り " + remaining_numbers.join(" ") + "\n";
  }
  logContent += "--------------------------------\n";

  // 縦のビンゴをチェック
  for (let i = 0; i < 4; i++) {
    logContent +=
      "縦 " + i + "列目 " + inputArray.map((row) => row[i]).join(" ") + "\n";
    let remaining_numbers = inputArray.map((row) => row[i]);
    for (let j = 0; j < 4; j++) {
      if (calledArray.includes(inputArray[j][i])) {
        remaining_numbers = remaining_numbers.filter(
          (number) => number !== inputArray[j][i]
        );
      }
    }
    if (remaining_numbers.length === 1) {
      logContent += "リーチ　 " + remaining_numbers[0] + "\n";
      resultArray.push(remaining_numbers[0]);
      break;
    }
    // logContent += "縦の残り " + remaining_numbers.join(" ") + "\n";
  }

  logContent += "--------------------------------\n";

  // 斜めのビンゴをチェック
  let remaining_numbers = [];
  // 左上から右下への斜め
  logContent += "左上から右下への斜め\n";
  for (let i = 0; i < 4; i++) {
    remaining_numbers.push(inputArray[i][i]);
  }
  // シャローコピーを作成
  const remaining_numbers_copy1 = [...remaining_numbers];
  logContent += "斜めの配列 " + remaining_numbers.join(" ") + "\n";
  for (let i = 0; i < 4; i++) {
    logContent += remaining_numbers_copy1[i] + "をチェック\n";
    if (calledArray.includes(remaining_numbers_copy1[i])) {
      remaining_numbers = remaining_numbers.filter(
        (number) => number !== remaining_numbers_copy1[i]
      );
      logContent += remaining_numbers_copy1[i] + "を削除\n";
    }
    if (remaining_numbers.length === 1) {
      logContent += "リーチ　 " + remaining_numbers[0] + "\n";
      resultArray.push(remaining_numbers[0]);
      break;
    }
    // logContent += "斜めの残り " + remaining_numbers.join(" ") + "\n";
  }
  logContent += "remaining_numbers " + remaining_numbers.join(" ") + "\n";
  logContent += "copy1 " + remaining_numbers_copy1.join(" ") + "\n";

  logContent += "--------------------------------\n";
  // 左下から右上への斜め
  logContent += "左下から右上への斜め\n";
  remaining_numbers = [];
  for (let i = 0; i < 4; i++) {
    remaining_numbers.push(inputArray[3 - i][i]);
  }
  const remaining_numbers_copy2 = [...remaining_numbers];
  logContent += "斜めの配列 " + remaining_numbers.join(" ") + "\n";
  for (let i = 0; i < 4; i++) {
    logContent += remaining_numbers_copy2[i] + "をチェック\n";
    if (calledArray.includes(remaining_numbers_copy2[i])) {
      remaining_numbers = remaining_numbers.filter(
        (number) => number !== remaining_numbers_copy2[i]
      );
      logContent += remaining_numbers_copy2[i] + "を削除\n";
    }
    if (remaining_numbers.length === 1) {
      logContent += "リーチ　 " + remaining_numbers[0] + "\n";
      resultArray.push(remaining_numbers[0]);
      break;
    }
  }
  // logContent += "斜めの残り " + remaining_numbers.join(" ") + "\n";
  if (resultArray.length > 0) {
    console.log(resultArray[0]);
  } else {
    console.log("no");
  }

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
    let inputArray = [];
    for (let i = 0; i < 4; i++) {
      inputArray.push(lines[i + 1].split(" ").map(Number));
    }

    let calledArray = [];
    for (let i = 0; i < N; i++) {
      calledArray.push(parseInt(lines[i + 5]));
    }

    calc(N, inputArray, calledArray);
  });
}
