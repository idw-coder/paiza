function calc(inputArray) {
  const N = inputArray.length;
  for (let i = 0; i < N; i++) {
    inputArray[i] = inputArray[i].split(' ').map(Number);
  }

  let pyramidArray = [];
  for (let i = 0; i < N; i++) {
    pyramidArray.push([]);
    for (let j = 0; j < N; j++) {
      pyramidArray[i][j] = 0;
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 左上
      if (i < N / 2 && j < N / 2) {
        if (i <= j) {
          pyramidArray[i][j] = i + 1;
        } else {
          pyramidArray[i][j] = j + 1;
        }
        // 右上
      } else if (i < N / 2 && j > N / 2) {
        if (i <= N - j - 1) {
          pyramidArray[i][j] = i + 1;
        } else {
          pyramidArray[i][j] = N - j;
        }
      }
      // 右下
      else if (i > N / 2 && j > N / 2) {
        if (N - i <= N - j) {
          pyramidArray[i][j] = N - i;
        } else {
          pyramidArray[i][j] = N - j;
        }
      }
      // 左下
      else if (i > N / 2 && j < N / 2) {
        if (N - i <= j) {
          pyramidArray[i][j] = N - i;
        } else {
          pyramidArray[i][j] = j + 1;
        }
      }
    }
  }

  let resultArray = [];
  for (let i = 0; i < N; i++) {
    resultArray.push([]);
    for (let j = 0; j < N; j++) {
      resultArray[i][j] = inputArray[i][j] - pyramidArray[i][j];
    }
  }
  let sum = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      sum += resultArray[i][j];
    }
  }
  return sum;
}

module.exports = {calc};

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
    for (let i = 1; i < N + 1; i++) {
      inputArray.push(lines[i]);
    }

    const result = calc(inputArray);
    console.log(result);
  });
}
