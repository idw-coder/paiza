const fs = require('fs');
const path = require('path');
const { countAdventurers } = require('./B149.js');

// input01.txtを読み込んでテストデータに変換する関数
function loadTestData(filename) {
  const filePath = path.join(__dirname, '..', filename);
  const data = fs.readFileSync(filePath, 'utf8').trim().split('\n');
  const [w, h] = data[0].split(' ').map(Number);
  const [startX, startY] = data[1].split(' ').map(Number);
  const grid = data.slice(2).map(row => row.split(''));
  return { w, h, startX, startY, grid };
}

test('countAdventurers function input01 test', () => {
  const { w, h, startX, startY, grid } = loadTestData('input01.txt');
  
  const result = countAdventurers(startX, startY, grid, w, h);

  expect(result).toEqual({ resultDirection: 'S', maxNum: 10 });
});

test('countAdventurers function edge cases', () => {
  const testGrid = [
    ['#', '#', '#'],
    ['#', '1', '#'],
    ['#', '#', '#']
  ];
  
  const result = countAdventurers(2, 2, testGrid, 3, 3);
  
  expect(result.maxNum).toBe(0);
});

test('countAdventurers function empty grid', () => {
  const testGrid = [
    ['#', '#', '#'],
    ['#', '#', '#'],
    ['#', '#', '#']
  ];

  const result = countAdventurers(2, 2, testGrid, 3, 3);

  expect(result.maxNum).toBe(0);
});