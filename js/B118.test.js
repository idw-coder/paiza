const { calc } = require('./B118.js');
const fs = require("fs");
const path = require("path");

// input01.txtを読み込んでテストデータに変換する関数
function loadTestData(filename) {
  const filePath = path.join(__dirname, "..", filename);
  const data = fs.readFileSync(filePath, "utf8").trim().split("\n");
  const N = parseInt(data[0]);
  let inputArray = [];
  for (let i = 1; i <= N; i++) {
    inputArray.push(data[i].split(" "));
  }
  return {inputArray};
}

test('calc function basic test', () => {
  const testArray = [
    ["takeshi", "180", "3"],
    ["hanako", "165", "7"],
    ["akira", "180", "3"],
    ["yumi", "165", "12"],
    ["ken", "175", "5"],
  ];

  const result = calc(testArray);
  expect(result).toEqual([
    ["yumi", 165, 12],
    ["hanako", 165, 7],
    ["ken", 175, 5],
    ["akira", 180, 3],
    ["takeshi", 180, 3],
  ]);
});

test('calc function with input01.txt', () => {
  const {inputArray} = loadTestData("input01.txt");
  const result = calc(inputArray);
  expect(result).toEqual([
  [ 'bim', 132, 8 ],
  [ 'aria', 145, 12 ],
  [ 'deen', 145, 3 ],
  [ 'emma', 145, 3 ],
  [ 'cindy', 178, 4 ]
  ]);
});