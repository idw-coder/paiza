<?php

$inputArr = explode(' ', trim(fgets(STDIN)));
$H = $inputArr[0];
$W = $inputArr[1];
$fireX = $inputArr[2] - 1;
$fireY = $inputArr[3] - 1;
$rateTime = $inputArr[4];

/**
 * @type array[] $mapArr マップの2次元配列
 * $mapArr[i][j] = ['#' | '.']
 */
$mapArr = [];
for ($i = 0; $i < $H; $i++) {
    $mapArr[] = str_split(trim(fgets(STDIN)));
}

$mapArr[$fireX][$fireY] = 'B';

for ($i = 0; $i < $H; $i++) {
    // echo implode('', $mapArr[$i]) . "\n";
}

for ($i = 0; $i < $rateTime; $i++) {
    $newMapArr = $mapArr;
    for ($j = 0; $j < $H; $j++) {
        for ($k = 0; $k < $W; $k++) {
            // 木が燃える
            if ($mapArr[$j][$k] == '#') {
                if (isset($mapArr[$j][$k + 1]) && $mapArr[$j][$k + 1] == 'B') {
                    $newMapArr[$j][$k] = 'B';
                }
                if (isset($mapArr[$j + 1][$k]) && $mapArr[$j + 1][$k] == 'B') {
                    $newMapArr[$j][$k] = 'B';
                }
                if (isset($mapArr[$j][$k - 1]) && $mapArr[$j][$k - 1] == 'B') {
                    $newMapArr[$j][$k] = 'B';
                }
                if (isset($mapArr[$j - 1][$k]) && $mapArr[$j - 1][$k] == 'B') {
                    $newMapArr[$j][$k] = 'B';
                }
            }
            // 火が燃え尽きる
            if ($mapArr[$j][$k] == 'B') {
                $newMapArr[$j][$k] = 'A';
            }
        }
    }
    $mapArr = $newMapArr;
    // echo $i . "\n";
    for ($j = 0; $j < $H; $j++) {
        // echo implode('', $mapArr[$j]) . "\n";
    }
}
for ($i = 0; $i < $H; $i++) {
    echo implode('', $mapArr[$i]) . "\n";
}
