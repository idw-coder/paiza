<?php
$inputArr = explode(' ', fgets(STDIN));
$numStores = $inputArr[0];
$kindOfBegetables = $inputArr[1];



// 各店舗の野菜の値段を連想配列に格納
$vegetablePrices = [];
for ($i = 0; $i < $numStores; $i++) {
    $vegetablePrices[$i] = explode(' ', fgets(STDIN));
}

// 各野菜の一番安い店舗の番号
$cheapestPrices = [];
$cheapestStores = [];
for ($i = 0; $i < $kindOfBegetables; $i++) {
    $cheapestPrices[$i] = PHP_INT_MAX; // とりあえず最大値からはじめる
    for ($j = 0; $j < $numStores; $j++) {
        if ($vegetablePrices[$j][$i] < $cheapestPrices[$i]) {
            $cheapestPrices[$i] = $vegetablePrices[$j][$i];
            $cheapestStores[$i] = $j + 1;
        }
    }
}

// 最安店舗数
// count()とは配列の要素数を数える関数
// array_unique()とは配列の重複を削除する関数
$numCheapStores = count(array_unique($cheapestStores));

echo $numCheapStores;
