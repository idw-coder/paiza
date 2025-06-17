<?php
// ==============================================
// paiza競技プログラミング PHP汎用テンプレート
// ==============================================

/**
 * このファイルは、paizaの競技プログラミングで使用するための
 * 標準入力からデータを読み取る関数群を提供します。
 * 
 * 提供される関数：
 * - readInt(): 整数値の読み取り
 * - readString(): 文字列の読み取り
 * - readIntArray(): スペース区切りの整数値の読み取り
 * - readStringArray(): スペース区切りの文字列の読み取り
 * - readLines(): 複数行の文字列の読み取り
 */

/**
 * 標準入力から1行の整数値を読み取る
 * 
 * @return int 読み取った整数値
 * 
 * 処理内容：
 * 1. 標準入力から1行分のデータを読み取る
 * 2. 前後の空白文字を削除
 * 3. 文字列を整数型に変換して返す
 */
function readInt()
{
    return (int)trim(fgets(STDIN));
}

/**
 * 標準入力から1行の文字列を読み取る
 * 
 * @return string 読み取った文字列（前後の空白は削除済み）
 * 
 * 処理内容：
 * 1. 標準入力から1行分のデータを読み取る
 * 2. 前後の空白文字を削除して返す
 */
function readString()
{
    return trim(fgets(STDIN));
}

/**
 * 標準入力からスペース区切りの整数値を読み取る
 * 
 * @return int[] 整数値の配列
 * 
 * 処理内容：
 * 1. 標準入力から1行分のデータを読み取る
 * 2. 前後の空白文字を削除
 * 3. スペースで分割して配列に変換
 * 4. 各要素を整数型に変換して返す
 */
function readIntArray()
{
    return array_map('intval', explode(' ', trim(fgets(STDIN))));
}

/**
 * 標準入力からスペース区切りの文字列を読み取る
 * 
 * @return string[] 文字列の配列
 * 
 * 処理内容：
 * 1. 標準入力から1行分のデータを読み取る
 * 2. 前後の空白文字を削除
 * 3. スペースで分割して配列として返す
 */
function readStringArray()
{
    return explode(' ', trim(fgets(STDIN)));
}

/**
 * 指定された行数分の文字列を読み取る
 * 
 * @param int $n 読み取る行数
 * @return string[] 読み取った文字列の配列
 * 
 * 処理内容：
 * 1. 指定された行数分、繰り返し処理を行う
 * 2. 各行のデータを読み取り、前後の空白を削除
 * 3. 読み取った文字列を配列に格納
 * 4. 完成した配列を返す
 */
function readLines($n)
{
    $lines = [];
    for ($i = 0; $i < $n; $i++) {
        $lines[] = trim(fgets(STDIN));
    }
    return $lines;
}

// ==============================================
// メイン処理部分（ここに問題の解法を記述）
// ==============================================

// 例：運賃計算問題
$N = readInt();
$fare = 100 + $N * 10;
echo $fare . "\n";

?>

<?php
/*
==============================================
使用例とパターン集
==============================================

// 【パターン1】1つの整数入力
$n = readInt();

// 【パターン2】1つの文字列入力
$str = readString();

// 【パターン3】複数の整数（スペース区切り）
$arr = readIntArray();
// 例：$arr[0], $arr[1], $arr[2] でアクセス

// 【パターン4】複数の文字列（スペース区切り）
$strArr = readStringArray();

// 【パターン5】複数行の入力
$n = readInt();
$lines = readLines($n);

// 【パターン6】複数行の数値データ
$n = readInt();
$numbers = [];
for ($i = 0; $i < $n; $i++) {
    $numbers[] = readInt();
}

// 【パターン7】2次元配列の入力
$h = readInt(); // 行数
$w = readInt(); // 列数
$grid = [];
for ($i = 0; $i < $h; $i++) {
    $grid[] = readIntArray();
}

// 【パターン8】文字列を1文字ずつ配列に
$str = readString();
$chars = str_split($str);

// 【パターン9】EOFまで読み取り
$allLines = [];
while (($line = fgets(STDIN)) !== false) {
    $allLines[] = trim($line);
}

==============================================
よく使う処理
==============================================

// 配列の操作
$arr = [1, 2, 3, 4, 5];
$sum = array_sum($arr);                    // 合計
$max = max($arr);                          // 最大値
$min = min($arr);                          // 最小値
sort($arr);                                // 昇順ソート
rsort($arr);                               // 降順ソート
$count = count($arr);                      // 要素数

// 文字列操作
$str = "Hello World";
$length = strlen($str);                    // 文字数
$upper = strtoupper($str);                 // 大文字変換
$lower = strtolower($str);                 // 小文字変換
$pos = strpos($str, "World");              // 文字列検索
$substr = substr($str, 0, 5);              // 部分文字列

// 数値計算
$result = pow(2, 3);                       // べき乗（2^3）
$sqrt = sqrt(16);                          // 平方根
$abs = abs(-5);                            // 絶対値
$floor = floor(3.7);                       // 切り捨て
$ceil = ceil(3.2);                         // 切り上げ
$round = round(3.7);                       // 四捨五入

// 出力
echo $result . "\n";                       // 改行付き出力
printf("%d\n", $number);                   // フォーマット出力
print_r($array);                           // 配列の内容表示（デバッグ用）

==============================================
実行方法（ローカル環境）
==============================================

1. ファイル保存：solution.php
2. 入力データ作成：input.txt
3. 実行：php solution.php < input.txt

または

1. 直接実行：php solution.php
2. キーボードから入力

==============================================
デバッグのコツ
==============================================

// デバッグ出力（提出時はコメントアウト）
// error_log("デバッグ: $variable");
// var_dump($array);

*/
?>