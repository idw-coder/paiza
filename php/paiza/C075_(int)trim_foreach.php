<?php
$input = explode(' ', trim(fgets(STDIN)));
$startingAmount = (int)$input[0];
$numRides = (int)$input[1];

$fareArr = [];
for ($i = 0; $i < $numRides; $i++) {
    $fareArr[$i] = (int)trim(fgets(STDIN));
}

$point = 0;

foreach ($fareArr as $fare) {
    if ($point >= $fare) {
        // ポイントで支払う場合、新たなポイントは発生しない
        $point -= $fare;
    } else {
        // 現金で支払う場合、運賃の10%がポイントとして加算される
        $startingAmount -= $fare;
        $point += $fare * 0.1;
    }
    echo $startingAmount . " " . $point . "\n";
}
