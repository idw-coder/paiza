<?php
$inputArr = explode(' ', fgets(STDIN));
$stampHeight = $inputArr[0];
$stampWidth = $inputArr[1];
$stampNum = $inputArr[2];

// スタンプの配列
$stampArr = [];
for ($i = 0; $i < $stampNum; $i++) {
    for ($j = 0; $j < $stampHeight; $j++) {
        // スタンプの数（i）×スタンプの高さ（j）→それぞれにその行の入力を格納
        // 例：$stampArr[0][0] = '123'
        // 例：$stampArr[0][1] = '456'
        // 例：$stampArr[1][0] = '789'
        // 例：$stampArr[1][1] = '101'
        $stampArr[$i][$j] = trim(fgets(STDIN));
    }
}

$inputArr = explode(' ', fgets(STDIN));
$artHeight = $inputArr[0];
$artWidth = $inputArr[1];

// 絵画の2次元配列
$artArr = [];
for ($i = 0; $i < $artHeight; $i++) {
    $artArr[$i] = explode(' ', fgets(STDIN));
}

// 絵画を出力
for ($i = 0; $i < $artHeight; $i++) { // 絵画の高さ
    for ($j = 0; $j < $stampHeight; $j++) { // スタンプの高さ
        for ($k = 0; $k < $artWidth; $k++) { // 絵画の幅
            echo $stampArr[$artArr[$i][$k] - 1][$j];
        }
        echo "\n";
    }
}
