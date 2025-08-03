# PHP標準入力 実行ガイド

## 標準入力とは
プログラムがキーボードからデータを受け取る仕組み。PHPでは`fgets(STDIN)`で実現。

## VSCodeターミナルでの実行

### 直接入力
```bash
php solution.php
```

**実行の流れ：**
1. `php solution.php` と入力してEnter
2. ターミナルが入力待機状態になる（カーソルが点滅）
3. 数値（例：3）を入力してEnter
4. 結果（130）が表示される

**fgets(STDIN)の挙動：**
- `fgets(STDIN)` はユーザーの入力を待つ関数
- Enterキーが押されるまでプログラムは待機し続ける
- 入力待機中はカーソルが点滅し、他の処理は行われない

### パイプ入力（推奨）
```bash
echo "3" | php solution.php
```
すぐに結果が表示される。

## 作成したコードの動作
```php
$N = readInt();        // 標準入力から数値取得
$answer = $N * 10 + 100;  // 運賃計算
echo $answer;          // 結果出力
```

## テスト方法
```bash
echo "3" | php solution.php   # 結果: 130
echo "19" | php solution.php  # 結果: 290
```