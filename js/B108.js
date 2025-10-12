function calc(n, m, array1, array2) {
  // array1を2次元配列に変換
  let array12D = [];
  for (let i = 0; i < n; i++) {
    array12D.push([Number(array1[i])]);
  }
  // console.log(array12D);

  let currentIndex = 0;
  for (let i = 0; i < m; i++) {
    if (array12D[currentIndex % array12D.length][0] >= array2[i]) {
      array12D[currentIndex % array12D.length].push(parseInt(array2[i]));
      currentIndex++;
      // console.log("array12D[currentIndex % array12D.length][0]", array12D[currentIndex % array12D.length][0]);
      // console.log("array2[i]", i, array2[i]);
      // console.log("収まった", array12D[currentIndex % array12D.length][0]);
    } else {
  let remainingPeople = array2[i];
  
  while (remainingPeople > 0) {
    let canBoard = Math.min(remainingPeople, array12D[currentIndex % array12D.length][0]);
    array12D[currentIndex % array12D.length].push(canBoard);
    remainingPeople -= canBoard;
    currentIndex++;
  }
}
  }

  for (let i = 0; i < array12D.length; i++) {
    console.log(array12D[i].slice(1).reduce((prev, next) => prev + next, 0));
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
    let inputArray2 = [];
    for (let i = 1; i < N + 1; i++) {
      inputArray1.push(lines[i]);
    }
    for (let i = N + 1; i < N + M + 1; i++) {
      inputArray2.push(parseInt(lines[i]));
    }

    // console.log(inputArray1);
    // console.log("inputArray2", inputArray
    calc(N, M, inputArray1, inputArray2);
  });
}
