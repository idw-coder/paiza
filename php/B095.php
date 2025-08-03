<?php
$inputArr = explode(' ', fgets(STDIN));

$peopleNum = $inputArr[0];
$songsLength = $inputArr[1];

$pitches = [];
for ($i = 0; $i < $songsLength; $i++) {
    $pitches[$i] = fgets(STDIN);
}

// 最高得点
$maxScore = 0;

for ($i = 0; $i < $peopleNum; $i++) {
    $score = 100;
    for ($j = 0; $j < $songsLength; $j++) {
        $pitch = fgets(STDIN);
        $pitchDiff = abs($pitch - $pitches[$j]);

        if ($pitchDiff <= 5) {
            $score += 0;
        } else if ($pitchDiff <= 10) {
            $score -= 1;
        } else if ($pitchDiff <= 20) {
            $score -= 2;
        } else if ($pitchDiff <= 30) {
            $score -= 3;
        } else {
            $score -= 5;
        }
    }
    if ($score > $maxScore) {
        $maxScore = $score;
    }
}

echo $maxScore;
