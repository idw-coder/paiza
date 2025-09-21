## paizaの問題を解きながら、データ構造とアルゴリズムを学習

- AIを使用せずにコーディングをあげる
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






