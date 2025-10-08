function calc(n, m, array1, array2) {
  // array1を2次元配列に変換
  let array12D = [];
  for (let i = 0; i < n; i++) {
    array12D.push(array1[i].split('').map(Number));
  }
  console.log(array12D);

  let currentIndex = 0;
  for (let i = 0; i < m; i++) {
    if (array12D[currentIndex % array12D.length][0] >= array2[i]) {
      array12D[currentIndex % array12D.length].push(parseInt(array2[i]));
      currentIndex++;
      console.log("収まった",array12D[currentIndex % array12D.length][0]);
    } else {
      array12D[currentIndex % array12D.length].push(parseInt(array12D[currentIndex % array12D.length][0]));
      currentIndex++;
      while (array12D[currentIndex % array12D.length][0] < (array2[i] - array12D[(currentIndex - 1) % array12D.length][0])) {
        array12D[currentIndex % array12D.length].push(parseInt(array2[i] - array12D[(currentIndex - 1) % array12D.length][0]));
        //もともとの値と、引き算した値を出力
        console.log("もともとの値",array12D[currentIndex % array12D.length][0]);
        console.log("引き算した値",array12D[(currentIndex - 1) % array12D.length][0]);
        currentIndex++;
      }
      array12D[currentIndex % array12D.length].push(parseInt(array2[i]));
      currentIndex++;
    }
  }

  return array12D;
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
    const N = parseInt(lines[0].split(' ')[0]);
    const M = parseInt(lines[0].split(' ')[1]);

    let inputArray1 = [];
    let inputArray2 = [];
    for (let i = 1; i < N + 1; i++) {
      inputArray1.push(lines[i]);
    }
    for (let i = N + 1; i < N + M + 1; i++) {
      inputArray2.push(lines[i]);
    }

    // console.log(inputArray1);
    // console.log(inputArray2);

    const result = calc(N, M, inputArray1, inputArray2);
    console.log(result);
  });
}
