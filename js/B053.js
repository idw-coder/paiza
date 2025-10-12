function calc(h, w, array) {
  let xDiff = [];
  xDiff[0] = array[0][1] - array[0][0];
  xDiff[1] = array[1][1] - array[1][0];

  for (let i = 0; i < 2; i++) {
    for (let j = 2; j < w; j++) {
      array[i].push(array[i][j - 1] + xDiff[i]);
    }
  }
  // console.log(array);

  let yDiff = [];
  for (let i = 0; i < w; i++) {
    yDiff.push(array[1][i] - array[0][i]);
  }
  // console.log(yDiff);

  for (let i = 2; i < h; i++) {
    array[i] = [];
    for (let j = 0; j < w; j++) {
      array[i][j] = array[i - 1][j] + yDiff[j];
    }
  }
  for (let i = 0; i < h; i++) {
    console.log(array[i].join(" "));
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
    const H = parseInt(lines[0].split(" ")[0]);
    const W = parseInt(lines[0].split(" ")[1]);

    let inputArray = [];
    for (let i = 0; i < 2; i++) {
      inputArray[i] = lines[i + 1].split(" ").map(Number);
    }

    calc(H, W, inputArray);

    });
}
