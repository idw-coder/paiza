function calc(array) {
  let sortedArray = [];
  for (let i = 0; i < array.length; i++) {
    sortedArray.push([
      array[i][0],
      parseInt(array[i][1]),
      parseInt(array[i][2]),
    ]);
  }

  // 複数条件でソート：背の高さ昇順 → 誕生月降順 → 名前昇順
  sortedArray.sort((a, b) => {
    // 1. 背の高さで昇順ソート
    if (a[1] !== b[1]) {
      return a[1] - b[1];
    }
    // 2. 同じ背の高さなら誕生月で降順ソート
    if (a[2] !== b[2]) {
      return b[2] - a[2];
    }
    // 3. それも同じなら名前でアルファベット順（昇順）ソート
    return a[0].localeCompare(b[0]);
  });
  return sortedArray;
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
    for (let i = 1; i <= N; i++) {
      inputArray.push(lines[i].split(" "));
    }
    const result = calc(inputArray);
    for (let i = 0; i < result.length; i++) {
      console.log(result[i][0]);
    }
  });
}
