function calc(array1, array2) {
  // console.log(array1, array2);
  const N = array1.length;
  const M = array2.length;

  let resultArray = [];
  for (let k = 0; k < M; k++) {
    let wordLength = array2[k].length;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        for (let l = 0; l < wordLength; l++) {
          if (i + l < N && j + l < N && array1[i + l][j + l] === array2[k][l]) {
            if (l === wordLength - 1) {
              resultArray.push([j + 1, i + 1]);
            }
          } else {
            // console.log(array1[i + l][j + l], array2[k][l], "break");
            break;
          }
        }
      }
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    console.log(resultArray[i].join(" "));
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
    const M = parseInt(lines[0].split(" ")[1]);

    let inputArray1 = [];
    for (let i = 0; i < N; i++) {
      inputArray1.push(lines[i + 1].split(""));
    }
    let inputArray2 = [];
    for (let i = 0; i < M; i++) {
      inputArray2.push(lines[N + 1 + i].split(""));
    }

    calc(inputArray1, inputArray2);
  });
}
