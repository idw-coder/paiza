## paizaの問題を解きながら、データ構造とアルゴリズムを学習

- AIを使用せずにコーディングスキルをあげる
- データ構造とアルゴリズムはpaizaAランクくらいの複雑さで実務では十分

---

## PHPスクリプト実行方法

### 入力内容を手動で実行
```bash
php script.php
# 入力値を手動で入力
# Ctrl+D (Unix) または Ctrl+Z (Windows) で終了
```

### 入力ファイルがある場合

**ターミナルで実行**
- Unix系
```bash
php sample.php < input.txt
```

- PowerShell
```
Get-Content input01.txt | php ./sample.php
```

- Git Bash
**問題**
Git BashでPHPに標準入力を渡すと `stdin is not a tty` エラーが発生する

**解決方法**
```bash
cmd //c "php ./sample.php < input01.txt"
```


| 環境 | 説明 |
|------|------|
| cmd | Windowsの標準コマンドプロンプト |
| Git Bash | Unix/Linux風のコマンドライン環境（MinTTY） |

`cmd //c "コマンド"` でWindowsのコマンドプロンプトを一時的に使用してコマンドを実行する

---

## JavaScript実行

```
C:\paiza> Get-content .\input01.txt | node .\js\C162.js
```

## Jest

### Jestセットアップ

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


