## セットアップ

.gitignore
```
node_modules/
*.log
.DS_Store
```


Jestインストール

```bash
npm init -y
npm install --save-dev jest
```

package.jsonを編集
```bash
"test": "echo \"Error: no test specified\" && exit 1"
↓
"test": "jest"
```
これでnpm testを実行するとjestコマンドが実行されます


## 単体テスト

**単体テストの基本的な流れ**
```
テスト対象の関数をエクスポート
↓
テストファイルでその関数をインポート
↓
様々な条件（入力）を与える
↓
期待する結果と実際の結果を比較
↓
一致すればPASS、違えばFAIL
```

単体npテストしたい関数を含むjsファイルの編集
[reader.on('close')の外側で定義](/js/B087.js)

```js
function vhNum(x, y, array, K, H, W) {
  const dirX = Math.min(K - 1, W - x - 1);
  const dirY = Math.min(K - 1, H - y - 1);
  let maxNumX = array[y][x];
  let maxNumY = array[y][x];
  for (let i = 1; i <= dirX; i++) {
    maxNumX = maxNumX * 10 + array[y][x + i];
  }
  for (let j = 1; j <= dirY; j++) {
    maxNumY = maxNumY * 10 + array[y + j][x];
  }
  return Math.max(maxNumX, maxNumY);
}
// テスト用のエクスポート
module.exports = { vhNum };
```

[テストファイルの作成](/js/B087.test.js)
```js
const { vhNum } = require('./B087.js');

test('vhNum function basic test', () => {
  const testArray = [
    [1, 2],
    [3, 4]
  ];
  
  const result = vhNum(0, 0, testArray, 2);
  expect(result).toBe(13);
});
```