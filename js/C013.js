function filterRoom (rooms, n) {
  let newRooms = [];
  for (let i = 0; i < rooms.length; i++) {
    rooms[i] = rooms[i].split('').map(Number);
    let hasN = false;
    for (let j = 0; j < rooms[i].length; j++) {
      if (rooms[i][j] === n) {
        hasN = true;
        break;
      }
    }
    if (!hasN) {
      newRooms.push(rooms[i]);
    }
  }
  for (let i = 0; i < newRooms.length; i++) {
    newRooms[i] = newRooms[i].join('');
  }
  return newRooms.length > 0 ? newRooms : 'none';
}

module.exports = { filterRoom };

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
    const n = Number(lines[0]);
    const m = Number(lines[1]);

    let rooms = [];
    for (let i = 0; i < m; i++) {
      rooms.push(lines[i + 2]);
    }
    // console.log(rooms);
    const filtered = filterRoom(rooms, n);
    if (filtered === 'none') {
      console.log('none');
    } else {
      for (let i = 0; i < filtered.length; i++) {
        console.log(filtered[i]);
      }
    }
  });
}