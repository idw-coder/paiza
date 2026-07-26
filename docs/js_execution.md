# JavaScript 実行ガイド

## スクリプト実行

### Unix 系（macOS / Linux）

```bash
node js/sample.js < input01.txt
```

### PowerShell

```powershell
Get-Content .\input01.txt | node .\js\sample.js
```

---

## Jest（単体テスト）

### セットアップ

```bash
npm init -y
npm install --save-dev jest
```

`package.json` の `scripts` を編集：

```json
"test": "jest"
```

これで `npm test` を実行すると Jest が実行される。

---

### 単体テストの基本的な流れ

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

---

### paiza での使い方

paizaの問題を解くファイルを下記のように構成する：

- readline モジュール（CLI入力）のスキップ
- 単体テストする関数を記述
- 関数をエクスポート

```js
function fnToTest(x, array) {
  // 関数の内容
}

module.exports = {fnToTest};

/**
 * テスト時は標準入力処理をスキップ
 * readlineインターフェースがテスト時も作成され警告が出るのを防ぐ
 */
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
    // 関数のコールなど
  });
}
```

---

### テストファイルの記述例

条件をファイル内に書いたり、他ファイルから読み込んでテストすることも可能。

```js
const fs = require("fs");
const path = require("path");
const {fnToTest} = require("./toTest.js");

function loadTestData(filename) {
  const filePath = path.join(__dirname, "..", filename);
  const data = fs.readFileSync(filePath, "utf8").trim().split("\n");
  return {data};
}

test("fnToTest with input file", () => {
  const {data} = loadTestData("input.txt");
  const result = fnToTest(data);
  expect(result).toEqual(passResult);
});

test("fnToTest edge cases", () => {
  const testData = [
    // ...
  ];
  const result = fnToTest(testData);
  expect(result.maxNum).toBe(0);
});
```
