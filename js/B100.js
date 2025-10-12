function calc(array1, array2) {
  // console.log(array1);
  // array1 [0]に変化、[1]秒遅れて、[2]変化
  

  //  array1の一番遅い変化が届く時間
  let maxTime1 = 0;
  for (let i = 0; i < array1.length; i++) {
    maxTime1 = Math.max(maxTime1, array1[i][0] + array1[i][1]);
  }
  const maxTime2 = Math.max(...array2, maxTime1);
  // console.log(maxTime2);

  let originalArray = [];
  let value = 0;
  for (let i = 0; i <= maxTime2; i++) {
    for (let j = 0; j < array1.length; j++) { 
      if (i === array1[j][0]) {
        value += array1[j][2];
        // console.log(i, value);
      }
    }
    originalArray.push(value);
  }

  let delayedArray = [];
  let delayedValue = 0;
  for (let i = 0; i <= maxTime2; i++) {
    for (let j = 0; j < array1.length; j++) {
      if (i === (array1[j][0] + array1[j][1])) {
        delayedValue += array1[j][2];
      }
    }
    delayedArray.push(delayedValue);
  }

  for (let i = 0; i < array2.length; i++) {
    // console.log(array2[i], originalArray[array2[i]], delayedArray[array2[i]]);
    console.log(originalArray[array2[i]] - delayedArray[array2[i]]);
  }
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

    let inputArray1 = [];
    for (let i = 1; i < N + 1; i++) {
      inputArray1[i - 1] = lines[i].split(" ").map(Number);
    }

    const Q = parseInt(lines[N + 1]);

    let inputArray2 = [];
    for (let i = N + 2; i < N + 2 + Q; i++) {
      inputArray2.push(parseInt(lines[i]));
    }

    calc(inputArray1, inputArray2);
  });
}
