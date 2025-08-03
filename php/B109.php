<?php
$inputArr = explode(' ', fgets(STDIN));

$reservedNum = $inputArr[0];
$seatsVertical = $inputArr[1];
$seatsHorizontal = $inputArr[2];
$bestSeatX = $inputArr[3];
$bestSeatY = $inputArr[4];

// 予約された座席
$reservedSeats = [];
for ($i = 0; $i < $reservedNum; $i++) {
    $reservedSeats[$i] = explode(' ', fgets(STDIN));
}

// 残りの席のそれぞれの見やすい席からのマンハッタン距離を2次元配列に格納
$manhattanDistances = [];
for ($i = 0; $i < $seatsVertical; $i++) {
    for ($j = 0; $j < $seatsHorizontal; $j++) {
        /**
         * abs()は絶対値を返す関数
         * @param int $i 縦軸の座標（p座標）
         * @param int $j 横軸の座標（q座標）
         * @return int マンハッタン距離
         */
        $manhattanDistances[$i][$j] = abs($i - $bestSeatX) + abs($j - $bestSeatY);
    }
}

// 予約された席を除外する
foreach ($reservedSeats as $seat) {
    $reservedX = (int)$seat[0];
    $reservedY = (int)$seat[1];
    unset($manhattanDistances[$reservedX][$reservedY]);
}

// マンハッタン距離が最小の席を探す
$minDistance = PHP_INT_MAX;

foreach ($manhattanDistances as $i => $row) {
    foreach ($row as $j => $distance) {
        if (isset($manhattanDistances[$i][$j]) && $distance < $minDistance) {
            $minDistance = $distance;
        }
    }
}

for ($i = 0; $i < $seatsVertical; $i++) {
    for ($j = 0; $j < $seatsHorizontal; $j++) {
        if (isset($manhattanDistances[$i][$j]) && $manhattanDistances[$i][$j] == $minDistance) {
            echo $i . ' ' . $j . "\n";
        }
    }
}
