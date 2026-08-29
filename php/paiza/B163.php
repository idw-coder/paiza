<?php
$inputArr = explode(' ', fgets(STDIN));

$height = $inputArr[0];
$width = $inputArr[1];

$map = [];
for ($i = 0; $i < $height; $i++) {
    $map[$i] = str_split(trim(fgets(STDIN)));
}

// foreach ($map as $row) {
//     echo implode('', $row) . "\n";
// }
// echo "--------------------------------\n";

// 時計回りに90度回転させる
$map = array_map(null, ...$map);
foreach ($map as &$row) {
    $row = array_reverse($row);
}
// foreach ($map as $row) {
//     echo implode('', $row) . "\n";
// }

// 山の大きさの最大値
$mountainMaxSize = 0;
/**
 * $j →
 * $i ↓
 * $map = [
 *      [1, 1, 1, 0, 0, 0, 0],
 *      [1, 1, 1, 1, 1, 1, 0],
 *      [1, 1, 1, 1, 1, 1, 1],
 *      [1, 1, 1, 1, 1, 1, 0],
 *      [1, 1, 1, 1, 1, 0, 0],
 *      [1, 1, 0, 0, 0, 0, 0],
 * ]
 */

for ($i = 0; $i < $width; $i++) {

    for ($j = 0; $j < $height; $j++) {

        // 端の場合
        if ($j == 0) {
            if ($i == 0) {
                $mountainSize = 0; // 最初ループの場合それまでの山はないので、山の大きさは0
            } else {
                if ($map[$i - 1][$j] == '0') {
                    $mountainSize = 0; // 前の山がないので、つながっていないので、山の大きさは0
                }
            }
            if ($map[$i][$j] == '1') {
                $mountainSize++;
                if ($mountainSize > $mountainMaxSize) {
                    $mountainMaxSize = $mountainSize;
                }
            }
        } else {
            if ($map[$i][$j] == '1') {
                $mountainSize++;
                if ($mountainSize > $mountainMaxSize) {
                    $mountainMaxSize = $mountainSize;
                }
            }
        }
        // echo "i: " . $i . " j: " . $j . " mountainSize: " . $mountainSize . "\n";
    }
}
echo $mountainMaxSize;
