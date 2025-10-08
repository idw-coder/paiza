function calc(h, w, k, array) {
  mapArray = array.map(row => row.split(''));
  mapArray = mapArray.map(row => row.map(cell => cell === 'N' ? 0 : parseInt(cell) || cell));
  // console.log(mapArray);

  let directionArray = Array.from({ length: k + 1 }, () => []);
  for (let i = 0; i < k + 1; i++) {
    for (let j = 0; j < h; j++) {
      for (let l = 0; l < w; l++) {
        if (mapArray[j][l] === i) {
          directionArray[i].push(j, l);
        } 
      }
    }
  }
  
   let resultObj = {};
   for (let i = 0; i < k + 1; i++) {
     resultObj[i] = Math.abs(directionArray[0][0] - directionArray[i][0]) + Math.abs(directionArray[0][1] - directionArray[i][1]);
   }

   // インデックス0を除外してから値の小さい順にソート
   let filteredKeys = Object.keys(resultObj).filter(index => index !== '0');
   let minValue = Math.min(...filteredKeys.map(key => resultObj[key]));
   let sortedIndexes = filteredKeys
     .filter(index => resultObj[index] === minValue)
     .map(index => parseInt(index));
   
   return sortedIndexes;
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
    const H = parseInt(lines[0].split(' ')[0]);
    const W = parseInt(lines[0].split(' ')[1]);
    const K = parseInt(lines[0].split(' ')[2]);
    
    let inputArray = [];
    for (let i = 1; i < H + 1; i++) {
      inputArray.push(lines[i]);
    }

    const result = calc(H, W, K, inputArray);
    console.log(result.length);
    for (let i = 0; i < result.length; i++) {
      console.log(result[i]);
    }
  });
}
