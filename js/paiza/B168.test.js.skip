const { calc } = require('./B168.js');
const fs = require("fs");
const path = require("path");

// input01.txtを読み込んでテストデータに変換する関数
function loadTestData(filename) {
  const filePath = path.join(__dirname, "..", filename);
  const data = fs.readFileSync(filePath, "utf8").trim().split("\n");
  let baseArray = [];
  for (let i = 0; i < 3; i++) {
    baseArray.push((data[i]).split('').map(Number));
  }
  return {baseArray};
}

test('calc function basic test', () => {
  const testArray = [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [2, 2, 2, 2]
  ];

  const result = calc(testArray);
  expect(result).toEqual({
    commonValuesFound: "YES",
    commonValues: [0]
  });
});

test('calc function with input01.txt', () => {
  const {baseArray} = loadTestData("input01.txt");
  const result = calc(baseArray);
  expect(result).toEqual({
    commonValuesFound: "YES",
    commonValues: [-1, 17]
  }

  );
});