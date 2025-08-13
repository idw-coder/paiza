<?php

$length = trim(fgets(STDIN));

// 2次元配列
for ($i = 0; $i < $length; $i++) {
    $inputArr = explode(' ', trim(fgets(STDIN)));
    $mapArr[$i] = $inputArr;
}

// for ($i = 0; $i < $length; $i++) {
//     for ($j = 0; $j < $length; $j++) {
//         echo $mapArr[$i][$j] . ' ';
//     }
//     echo "\n";
// }
// echo "\n";

// 2次元配列を1次元配列に並び替え
$newMapArr = [];
// $i 外側から何番目か
// 例8x8の場合
// → → → → → → → ↓
// → → → → → → ↓ ↓
// ↑ → → → → ↓ ↓ ↓
// ↑ ↑ ↑ → ↓ ↓ ↓ ↓
// ↑ ↑ ↑ ↑ ← ← ↓ ↓
// ↑ ↑ ↑ ← ← ← ↓ ↓
// ↑ ↑ ← ← ← ← ← ↓
// ↑ ← ← ← ← ← ← ←

for ($i = 0; $i < $length / 2; $i++) {
    /** 
     * array_merge() は、2つの配列を結合して新しい配列を返します。
     * @param array $newMapArr 既存の結果配列（これまでの処理結果）
     * @param array $slice_result array_slice()の結果配列
     * @return array 結合された新しい配列
     * 
     * array_slice() は、配列の一部を取得して新しい配列を返します。
     * @param array $mapArr[0] 元の2次元配列の0行目
     * @param int 0 開始位置（インデックス0から開始）
     * @param int $length 取得する要素数（配列の長さ分）
     * @return array 切り取られた配列の一部
     * 
     * array_reverse() は、配列の要素を逆順にして新しい配列を返します。
     * @param array $mapArr[$length - 1] 元の2次元配列の最後の行
     * @param int 0 開始位置（インデックス0から開始）
     * @param int $length 取得する要素数（配列の長さ分）
     * @return array 逆順にした配列の一部
     */

    // →
    $newMapArr = array_merge($newMapArr, array_slice($mapArr[$i], $i, $length - $i * 2));
    // echo implode(' ', $newMapArr) . "\n";

    // ↓
    for ($k = $i + 1; $k < $length - $i; $k++) {
        $newMapArr[] = $mapArr[$k][$length - $i - 1];
    }
    // echo implode(' ', $newMapArr) . "\n";

    // ←
    if ($length - $i * 2 > 1) {
        $newMapArr = array_merge($newMapArr, array_reverse(array_slice($mapArr[$length - 1 - $i], $i, $length - $i * 2 - 1)));
        // echo implode(' ', $newMapArr) . "\n";
    }

    // ↑
    if ($length - $i * 2 > 2) {
        for ($k = $length - $i - 2; $k > $i; $k--) {
            $newMapArr[] = $mapArr[$k][$i];
        }
        // echo implode(' ', $newMapArr) . "\n";
    }
}

$sum = 0;
for ($i = 0; $i < 4; $i++) {
    for ($j = $i * $length * $length / 4; $j < $length * ($i + 1) * $length / 4; $j++) {
        $sum += $newMapArr[$j];
    }
    echo $sum;
    if ($i != 3) {
        echo "\n";
    }
}
