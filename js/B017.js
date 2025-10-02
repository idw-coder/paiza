function calc(array) {
  console.log(array);
  let result;
  // FourCard * 1~4
  if (
    (array[0] === "*" && array[1] === "*" && array[2] === "*") ||
    (array[1] === "*" && array[2] === "*" && array[3] === "*") ||
    (array[0] === "*" && array[2] === "*" && array[3] === "*") ||
    (array[0] === "*" && array[1] === "*" && array[3] === "*") ||
    (array[0] === "*" && array[1] === "*" && array[2] === array[3]) ||
    (array[1] === "*" && array[2] === "*" && array[0] === array[3]) ||
    (array[2] === "*" && array[3] === "*" && array[0] === array[1]) ||
    (array[0] === "*" && array[1] === array[2] && array[2] === array[3]) ||
    (array[3] === "*" && array[0] === array[1] && array[1] === array[2]) ||
    (array[1] === "*" && array[0] === array[2] && array[2] === array[3]) ||
    (array[2] === "*" && array[0] === array[1] && array[1] === array[3]) ||
    (array[0] === array[1] && array[1] === array[2] && array[2] === array[3])
  ) {
    result = "FourCard";

  // ThreeCard * 0 ~ 2
  } else if (
    (array[0] === "*" && array[1] === "*") ||
    (array[1] === "*" && array[2] === "*") ||
    (array[2] === "*" && array[3] === "*") ||
    (array[0] === "*" && array[2] === "*") ||
    (array[0] === "*" && array[3] === "*") ||
    (array[1] === "*" && array[3] === "*") ||
    (array[0] === "*" && array[1] === array[2]) ||
    (array[0] === "*" && array[1] === array[3]) ||
    (array[0] === "*" && array[2] === array[3]) ||
    (array[1] === "*" && array[0] === array[2]) ||
    (array[1] === "*" && array[0] === array[3]) ||
    (array[1] === "*" && array[2] === array[3]) ||
    (array[2] === "*" && array[0] === array[1]) ||
    (array[2] === "*" && array[0] === array[3]) ||
    (array[2] === "*" && array[1] === array[3]) ||
    (array[3] === "*" && array[0] === array[1]) ||
    (array[3] === "*" && array[0] === array[2]) ||
    (array[3] === "*" && array[1] === array[2]) ||
    (array[0] === array[1] && array[1] === array[2]) ||
    (array[1] === array[2] && array[2] === array[3]) ||
    (array[0] === array[1] && array[1] === array[3]) ||
    (array[0] === array[2] && array[2] === array[3])
  ) {
    result = "ThreeCard";

  // TwoPair * 0
  } else if (
    (array[0] === array[1] && array[2] === array[3]) ||
    (array[1] === array[2] && array[3] === array[0]) ||
    (array[0] === array[2] && array[1] === array[3])
  ) {
    result = "TwoPair";

  // OnePair * 1
  } else if (
    (array[0] === "*") ||
    (array[1] === "*") ||
    (array[2] === "*") ||
    (array[3] === "*") ||
    (array[0] === array[1]) ||
    (array[1] === array[2]) ||
    (array[2] === array[3]) ||
    (array[0] === array[2]) ||
    (array[0] === array[3]) ||
    (array[1] === array[3])
  ) {
    result = "OnePair";
  } else {
    result = "NoPair";
  }
  return result;
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
    const inputArray = lines[0].split("");
    const result = calc(inputArray);
    console.log(result);
  });
}
