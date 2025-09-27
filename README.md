## paiza の問題を解きながら、データ構造とアルゴリズムを学習

- AI を使用せずにコーディングスキルをあげる
- データ構造とアルゴリズムは paizaA ランクくらいの複雑さで実務では十分

---

## PHP スクリプト実行方法

### 入力内容を手動で実行

```bash
php script.php
# 入力値を手動で入力
# Ctrl+D (Unix) または Ctrl+Z (Windows) で終了
```

### 入力ファイルがある場合

**ターミナルで実行**

- Unix 系

```bash
php sample.php < input.txt
```

- PowerShell

```
Get-Content input01.txt | php ./sample.php
```

- Git Bash
  **問題**
  Git Bash で PHP に標準入力を渡すと `stdin is not a tty` エラーが発生する

**解決方法**

```bash
cmd //c "php ./sample.php < input01.txt"
```

| 環境     | 説明                                        |
| -------- | ------------------------------------------- |
| cmd      | Windows の標準コマンドプロンプト            |
| Git Bash | Unix/Linux 風のコマンドライン環境（MinTTY） |

`cmd //c "コマンド"` で Windows のコマンドプロンプトを一時的に使用してコマンドを実行する

---

## JavaScript 実行

```
C:\paiza> Get-content .\input01.txt | node .\js\C162.js
```

## Jest

### Jest セットアップ

.gitignore

```
node_modules/
*.log
.DS_Store
```

Jest インストール

```bash
npm init -y
npm install --save-dev jest
```

package.json を編集

```bash
"test": "echo \"Error: no test specified\" && exit 1"
↓
"test": "jest"
```

これで npm test を実行すると jest コマンドが実行されます

### 単体テスト

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

### paiza での使用の場合

paizaの問題を解くための処理を記述するファイルを下記のように記述します

- readlineモジュール（CLI入力を扱うためのもの）のスキップ
- 単体テストする関数を記述
テストしやすいように記述するといいかもしれません
- 単体テストする関数をエクスポート


```js
function fnToTest(x, array) {
  // 関数の内容
}

// テスト用のエクスポート
module.exports = {fnToTest};

/**
 * readlineインターフェースがテスト時も作成され、テスト時にJestの警告が出るため
 * テスト時は標準入力処理をスキップ
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

上記関数のテストファイルの記述をします

条件をファイル内に書いたり、他ファイルから読み込んでテストすることも可能です

```js
const fs = require("fs");
const path = require("path");
const {fntoTest} = require("./toTest.js");

// txtを読み込んでテストデータに変換する関数
function loadTestData(filename) {
  const filePath = path.join(__dirname, "..", filename);
  const data = fs.readFileSync(filePath, "utf8").trim().split("\n");
  
  return {data};
}

test("countAdventurers function inputtesxt test", () => {
  const {data} = loadTestData("input.txt");

  const result = fnToTest(data);

  expect(result).toEqual(passResult);
});

test("countAdventurers function edge cases", () => {
  const testData = [
    //..
  ];

  const result = fnToTest(testData);

  expect(result.maxNum).toBe(0);
});

```

