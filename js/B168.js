function calc (array) {
  let resultArray = [];
  for (let i = 0; i < 3; i++) {
    let row = array[i];
    resultArray[i] = [];
    resultArray[i].push(row[0] - row[1] - row[2] - row[3]);
    resultArray[i].push(row[0] - row[1] - row[2] + row[3]);
    resultArray[i].push(row[0] - row[1] + row[2] - row[3]);
    resultArray[i].push(row[0] - row[1] + row[2] + row[3]);
    resultArray[i].push(row[0] + row[1] - row[2] - row[3]);
    resultArray[i].push(row[0] + row[1] - row[2] + row[3]);
    resultArray[i].push(row[0] + row[1] + row[2] - row[3]);
    resultArray[i].push(row[0] + row[1] + row[2] + row[3]);
    let uniqueArray = [...new Set(resultArray[i])];
    resultArray[i] = uniqueArray;
  }

  // row[0] row[1] row[2] 重複を抽出
  let commonValues = [];
  for (let i = 0; i < resultArray[0].length; i++) {
    for (let j = 0; j < resultArray[1].length; j++) {
      for (let k = 0; k < resultArray[2].length; k++) {
        if (resultArray[0][i] === resultArray[1][j] && resultArray[1][j] === resultArray[2][k]) {
          commonValues.push(resultArray[0][i]);
        }
      }
    }
  }

  let result = { commonValuesFound: commonValues.length > 0 ? "YES" : "NO", commonValues: commonValues };
  return result;
}

module.exports = { calc };

// テスト時は標準入力処理をスキップ
if (require.main === module) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  var lines = [];
  var reader = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  reader.on('line', (line) => {
    lines.push(line);
  });

  reader.on('close', () => {
    let inputArray = [];
    for (let i = 0; i < 3; i++) {
      inputArray.push((lines[i]).split('').map(Number));
    }

    const result = calc(inputArray);
    console.log(result.commonValuesFound);
    if (result.commonValuesFound === "YES") {
      console.log(result.commonValues.join(' '));
    }
  });
}