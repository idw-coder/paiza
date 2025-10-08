function count(arrayA, arrayB) {
  let count = 0;
  const smallArray = arrayA.length < arrayB.length ? arrayA : arrayB;
  const bigArray = arrayA.length >= arrayB.length ? arrayA : arrayB;
  for (let i = 0; i < smallArray.length; i++) {
    for (let j = i + 1; j <= smallArray.length; j++) {
      const bigArrayText = bigArray.join('');
      const smallArrayText = smallArray.slice(i, j).join('');
      if (bigArrayText.indexOf(smallArrayText) !== -1) {
        count = Math.max(count, j - i);
        // console.log(count);
      }
    }
  }
  return count;
}

function calc(inputArray) {
  let explodeArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    explodeArray[i] = inputArray[i].split('');
  }
  let maxCount = 0;
  for (let i = 0; i < explodeArray.length; i++) {
    for (let j = i + 1; j < explodeArray.length; j++) {
      maxCount = Math.max(maxCount, count(explodeArray[i], explodeArray[j]));
    }
  }
  return maxCount;
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
