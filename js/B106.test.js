const { calc } = require('./B106.js');
const fs = require("fs");
const path = require("path");

// input01.txtを読み込んでテストデータに変換する関数
function loadTestData(filename) {
  const filePath = path.join(__dirname, "..", filename);
  const data = fs.readFileSync(filePath, "utf8").trim().split("\n");
  const [H, W, N] = data[0].split(" ");
  let baseArray = [];
  for (let i = 0; i < N; i++) {
    baseArray.push(parseInt(data[i + 1]));
  }
  return {H, W, N, baseArray};
}

test('calc function basic test', () => {
  const testArray = [3, 4, 8];

  const result = calc(3, 3, 3, testArray);
  expect(result).toEqual([
    [2, 3, 1],
    [0, 0, 0],
    [0, 0, 0]
  ]);
});

test('calc function with input01.txt', () => {
  const {H, W, N, baseArray} = loadTestData("input01.txt");
  const result = calc(H, W, N, baseArray);
  expect(result).toEqual([
    [5, 3, 0, 1],
    [0, 0, 0, 2],
    [0, 0, 0, 4],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});