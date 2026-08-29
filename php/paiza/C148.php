<?php

/**
 * 標準入力から1行分のデータを読み取る
 * 
 * @return int[] 整数値の配列
 * 
 * 処理内容：
 * 1. 標準入力から1行分のデータを読み取る
 * 2. 前後の空白文字を削除
 * 3. スペースで分割して配列に変換
 * 4. 各要素を整数型に変換して返す
 * 
 * array_map()は、配列の各要素に対して、指定された関数を適用して、新しい配列を生成する関数
 * intval()は、文字列を整数に変換する関数
 * explode()は、文字列を指定した区切り文字で分割して、配列に変換する関数
 * trim()は、文字列の前後の空白文字を削除する関数
 * 
 */
function read1Line()
{
    return array_map('intval', explode(' ', trim(fgets(STDIN))));
}

/**
 * 標準入力から指定された行数分のデータを読み取る
 * 開始行を指定することができる
 * 
 * @param int $n 読み取る行数
 * @param int $start 読み取り開始行
 * @return string[] 文字列の配列
 */
function readLines($n, $start = 1)
{
    $lines = [];
    for ($i = 0; $i < $n; $i++) {
        $lines[] = trim(fgets(STDIN));
    }
    return $lines;
}

$input = read1Line();
$NumBattles = $input[0];
$MyLevel = $input[1];

$Battles = array_map('intval', readLines($NumBattles, 1));

for ($i = 0; $i < $NumBattles; $i++) {
    if ($MyLevel > $Battles[$i]) {
        // 勝利：相手のレベルの半分（切り捨て）だけ上昇
        $MyLevel += intval($Battles[$i] / 2);
    } elseif ($MyLevel < $Battles[$i]) {
        // 敗北：自分のレベルが半分（切り捨て）になる
        $MyLevel = intval($MyLevel / 2);
    }
    // 引き分けの場合は何もしない
}

echo $MyLevel;
