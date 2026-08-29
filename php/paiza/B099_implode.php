<?php
$inputArr = explode(' ', fgets(STDIN));
$square = $inputArr[0];
$impassiablePrecipitation = $inputArr[1];

// 各ルートの降水量を連想配列に格納
$precipitationArr = [];
for ($i = 0; $i < $square; $i++) {
    $precipitationArr[$i] = explode(' ', fgets(STDIN));
}

// 各列（ルート）の降水量の判定
$passableRoutes = [];
for ($j = 0; $j < $square; $j++) {
    $passable = true;
    for ($i = 0; $i < $square; $i++) {
        if ($precipitationArr[$i][$j] >= $impassiablePrecipitation) {
            $passable = false;
            break;
        }
    }
    if ($passable) {
        $passableRoutes[] = $j + 1;
    }
}

if (empty($passableRoutes)) {
    echo 'wait';
} else {
    echo implode(' ', $passableRoutes);
}
