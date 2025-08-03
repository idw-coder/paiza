# デバッグ方法

## 変数の値を確認
```php
echo "変数: " . $variable . "\n";
var_dump($variable);
print_r($array);
```

## 段階的に処理を確認
```php
echo "=== ステップ1 ===\n";
// 処理1
echo "=== ステップ2 ===\n";
// 処理2
```

## 条件分岐の確認
```php
if ($condition) {
    echo "条件が真\n";
} else {
    echo "条件が偽\n";
}
```

## 型の確認
```php
echo "型: " . gettype($variable) . "\n";
var_dump($variable);
```

## よくある問題
- 文字列 vs 整数
- 配列のインデックス存在確認
- 比較演算子の使い方

## デバッグのコツ
- 一気に解決しようとしない
- 小さな単位で確認
- 期待値を事前に計算

## PHPスクリプト実行方法

### 標準入力ファイルから実行
```bash
php script.php < input.txt
```

### 手動入力で実行
```bash
php script.php
# 入力値を手動で入力
# Ctrl+D (Unix) または Ctrl+Z (Windows) で終了
```

### 入力ファイル作成例
```bash
# input.txt を作成
echo "9 4 5 2 3" > input.txt
echo "1 0" >> input.txt
echo "1 2" >> input.txt
# ... 他の入力行
```

### サンプル実行例
**1. エディタでinput.txt作成**
```
それぞれの問題の入力内容
```

**2. ターミナルで実行**
Unix系
```bash
php B109.php < input.txt
```
PowerShell
```
Get-Content input01.txt | php ./php/B095.php
```

**3. 結果**
```
答えが表示
``` 