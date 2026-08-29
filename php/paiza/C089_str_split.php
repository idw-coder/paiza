<?php
$input = fgets(STDIN);
$inputArr = explode(' ', $input);

$H = $inputArr[0];
$W = $inputArr[1];

// oかxの連想配列
$ox = [];
for ($i = 0; $i < $H; $i++) {
    $input = fgets(STDIN);
    // 文字列を配列に変換
    $ox[$i] = str_split($input);
}

// スコアの連想配列
$score = [];
for ($i = 0; $i < $H; $i++) {
    $input = fgets(STDIN);
    $score[$i] = explode(' ', $input);
}

// スコアの合計
$sum = 0;
for ($i = 0; $i < $H; $i++) {
    for ($j = 0; $j < $W; $j++) {
        if ($ox[$i][$j] == 'o') {
            $sum += $score[$i][$j];
        }
    }
}

echo $sum;
