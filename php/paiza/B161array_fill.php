<?php
$input = explode(' ', trim(fgets(STDIN)));
$h = $input[0];
$w = $input[1];

$targetNum = trim(fgets(STDIN));
/**
 * マップを初期化
 * @var array<array<int>>
 * @param int $h マップの高さ
 * @param int $w マップの幅
 * @return array<array<int>>
 */
$map = array_fill(0, $h, array_fill(0, $w, 0));
for ($i = 0; $i < $targetNum; $i++) {
    $inputTargetInfo = explode(' ', trim(fgets(STDIN)));
    $targetX = $inputTargetInfo[0] - 1;
    $targetY = $inputTargetInfo[1] - 1;
    $centerScore = $inputTargetInfo[2];
    $nearScore = $inputTargetInfo[3];
    $map[$targetX][$targetY] = $centerScore;
    isset($map[$targetX - 1][$targetY - 1]) ? $map[$targetX - 1][$targetY - 1] = $nearScore : 0;
    isset($map[$targetX - 1][$targetY]) ? $map[$targetX - 1][$targetY] = $nearScore : 0;
    isset($map[$targetX - 1][$targetY + 1]) ? $map[$targetX - 1][$targetY + 1] = $nearScore : 0;
    isset($map[$targetX][$targetY - 1]) ? $map[$targetX][$targetY - 1] = $nearScore : 0;
    isset($map[$targetX][$targetY + 1]) ? $map[$targetX][$targetY + 1] = $nearScore : 0;
    isset($map[$targetX + 1][$targetY - 1]) ? $map[$targetX + 1][$targetY - 1] = $nearScore : 0;
    isset($map[$targetX + 1][$targetY]) ? $map[$targetX + 1][$targetY] = $nearScore : 0;
    isset($map[$targetX + 1][$targetY + 1]) ? $map[$targetX + 1][$targetY + 1] = $nearScore : 0;
}

$shootingNum = trim(fgets(STDIN));
$totalScore = 0;
for ($i = 0; $i < $shootingNum; $i++) {
    $inputShootingInfo = explode(' ', trim(fgets(STDIN)));
    $totalScore += $map[$inputShootingInfo[0] - 1][$inputShootingInfo[1] - 1];
}

echo $totalScore;
