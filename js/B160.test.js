const { calcExit } = require('./B160.js');
const fs = require("fs");
const path = require("path");

// input01.txtを読み込んでテストデータに変換する関数
function loadTestData(filename) {
  const filePath = path.join(__dirname, "..", filename);
  const data = fs.readFileSync(filePath, "utf8").trim().split("\n");
  const [H, W] = data[0].split(" ");
  const [Y, X] = data[1].split(" ");
  let baseArray = [];
  for (let i = 0; i < H; i++) {
    baseArray.push(data[i + 2].split(''));
  }
  return {H, W, Y, X, baseArray};
}

test('calcExit function basic test', () => {
  const testArray = [
    ['#', '.', '.'],
    ['#', '#', '.'],
    ['#', '.', '.'],
    ['#', '.', '#']
  ];

  const result = calcExit(4, 3, 1, 2, testArray);
  expect(result).toEqual({ posY: 4, posX: 2 });
});

test('calcExit function with input01.txt', () => {
  const {H, W, Y, X, baseArray} = loadTestData("input01.txt");
  const result = calcExit(H, W, Y, X, baseArray);
  expect(result).toEqual({ posY: 7, posX: 4 });
});