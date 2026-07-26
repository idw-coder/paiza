# PHP 実行ガイド

## 標準入力とは

プログラムがキーボードからデータを受け取る仕組み。PHPでは `fgets(STDIN)` で実現。

---

## 実行方法

### 入力内容を手動で入力

```bash
php script.php
# 入力値を手動で入力
# Ctrl+D (Unix) または Ctrl+Z (Windows) で終了
```

**実行の流れ：**
1. `php solution.php` と入力してEnter
2. ターミナルが入力待機状態になる（カーソルが点滅）
3. 数値（例：3）を入力してEnter
4. 結果が表示される

**fgets(STDIN) の挙動：**
- `fgets(STDIN)` はユーザーの入力を待つ関数
- Enterキーが押されるまでプログラムは待機し続ける
- 入力待機中はカーソルが点滅し、他の処理は行われない

---

### 入力ファイルを使う場合

#### Unix 系（macOS / Linux）

```bash
php sample.php < input.txt
```

#### パイプ入力（推奨）

```bash
echo "3" | php solution.php
```

#### PowerShell

```powershell
Get-Content input01.txt | php ./sample.php
```

#### Git Bash

Git Bash で PHP に標準入力を渡すと `stdin is not a tty` エラーが発生する。

**解決方法：**

```bash
cmd //c "php ./sample.php < input01.txt"
```

`cmd //c "コマンド"` で Windows のコマンドプロンプトを一時的に使用してコマンドを実行する。

| 環境     | 説明                                        |
| -------- | ------------------------------------------- |
| cmd      | Windows の標準コマンドプロンプト            |
| Git Bash | Unix/Linux 風のコマンドライン環境（MinTTY） |

---

## テスト例

```bash
echo "3" | php solution.php   # 結果: 130
echo "19" | php solution.php  # 結果: 290
```
