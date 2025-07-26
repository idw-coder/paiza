<?php
$inputArr1 = explode(' ', fgets(STDIN));
$countMove = $inputArr1[0];
$classH = $inputArr1[1];
$classW = $inputArr1[2];

$inputArr2 = explode(' ', fgets(STDIN));
$myY = $inputArr2[0] - 1;
$myX = $inputArr2[1] - 1;

$moveDirection = str_split(trim(fgets(STDIN)));

// 移動の経路を多重配列に格納
$myMoveArr = [];
$myMoveArr[0] = [$myY, $myX];


for ($i = 0; $i < $countMove; $i++) {
    if ($moveDirection[$i] == 'F') {
        $myMoveArr[$i + 1] = [$myMoveArr[$i][0] - 1, $myMoveArr[$i][1]];
    } else if ($moveDirection[$i] == 'B') {
        $myMoveArr[$i + 1] = [$myMoveArr[$i][0] + 1, $myMoveArr[$i][1]];
    } else if ($moveDirection[$i] == 'L') {
        $myMoveArr[$i + 1] = [$myMoveArr[$i][0], $myMoveArr[$i][1] - 1];
    } else if ($moveDirection[$i] == 'R') {
        $myMoveArr[$i + 1] = [$myMoveArr[$i][0], $myMoveArr[$i][1] + 1];
    }
}

// 教室の配置を多重配列に格納
$classArr = [];
for ($i = 0; $i < $classH; $i++) {
    $classArr[$i] = explode(' ', trim(fgets(STDIN)));
}

$giftArr = [];
for ($i = 1; $i <= $countMove; $i++) {
    $giftArr[] = $classArr[$myMoveArr[$i][0]][$myMoveArr[$i][1]];
}
echo implode("\n", $giftArr) . "\n";
