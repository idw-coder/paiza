<?php
// マス目の数
$diceNum = fgets(STDIN);

// マス目の情報、2次元配列に格納
for ($i = 0; $i < $diceNum; $i++) {
    // $diceArr[] = explode('', fgets(STDIN));
    // explode()の第1引数で空文字を指定するとPHP8.0以降ではエラー
    $diceArr[] = mb_str_split(trim(fgets(STDIN)));
}

// マス目の情報を出力
// for ($i = 0; $i < $diceNum; $i++) {
//     for ($j = 0; $j < $diceNum; $j++) {
//         echo $diceArr[$i][$j];
//     }
//     echo "\n";
// }

$placeNum = 0;

for ($i = 0; $i < $diceNum; $i++) {
    for ($j = 0; $j < $diceNum; $j++) {
        if ($diceArr[$i][$j] == '.') {
            $countUpFlag = true;

            // 左上 - Wが連続している間だけ進む
            if ($i > 1 && $j > 1 && isset($diceArr[$i - 1][$j - 1]) && $diceArr[$i - 1][$j - 1] == 'W') {
                $offset = 1;
                while (
                    $i - $offset > 0 && $j - $offset > 0 &&
                    isset($diceArr[$i - $offset][$j - $offset]) &&
                    $diceArr[$i - $offset][$j - $offset] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $i - $offset >= 0 && $j - $offset >= 0 &&
                    isset($diceArr[$i - $offset][$j - $offset]) &&
                    $diceArr[$i - $offset][$j - $offset] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }

            // 上 - Wが連続している間だけ進む
            if ($i > 1 && isset($diceArr[$i - 1][$j]) && $diceArr[$i - 1][$j] == 'W') {
                $offset = 1;
                while (
                    $i - $offset > 0 &&
                    isset($diceArr[$i - $offset][$j]) &&
                    $diceArr[$i - $offset][$j] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $i - $offset >= 0 &&
                    isset($diceArr[$i - $offset][$j]) &&
                    $diceArr[$i - $offset][$j] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }

            // 右上 - Wが連続している間だけ進む
            if ($i > 1 && $j < $diceNum - 1 && isset($diceArr[$i - 1][$j + 1]) && $diceArr[$i - 1][$j + 1] == 'W') {
                $offset = 1;
                while (
                    $i - $offset > 0 && $j + $offset < $diceNum &&
                    isset($diceArr[$i - $offset][$j + $offset]) &&
                    $diceArr[$i - $offset][$j + $offset] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $i - $offset >= 0 && $j + $offset < $diceNum &&
                    isset($diceArr[$i - $offset][$j + $offset]) &&
                    $diceArr[$i - $offset][$j + $offset] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }

            // 右 - Wが連続している間だけ進む
            if ($j < $diceNum - 1 && isset($diceArr[$i][$j + 1]) && $diceArr[$i][$j + 1] == 'W') {
                $offset = 1;
                while (
                    $j + $offset < $diceNum &&
                    isset($diceArr[$i][$j + $offset]) &&
                    $diceArr[$i][$j + $offset] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $j + $offset < $diceNum &&
                    isset($diceArr[$i][$j + $offset]) &&
                    $diceArr[$i][$j + $offset] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }

            // 右下 - Wが連続している間だけ進む
            if ($i < $diceNum - 1 && $j < $diceNum - 1 && isset($diceArr[$i + 1][$j + 1]) && $diceArr[$i + 1][$j + 1] == 'W') {
                $offset = 1;
                while (
                    $i + $offset < $diceNum && $j + $offset < $diceNum &&
                    isset($diceArr[$i + $offset][$j + $offset]) &&
                    $diceArr[$i + $offset][$j + $offset] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $i + $offset < $diceNum && $j + $offset < $diceNum &&
                    isset($diceArr[$i + $offset][$j + $offset]) &&
                    $diceArr[$i + $offset][$j + $offset] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }

            // 下 - Wが連続している間だけ進む
            if ($i < $diceNum - 1 && isset($diceArr[$i + 1][$j]) && $diceArr[$i + 1][$j] == 'W') {
                $offset = 1;
                while (
                    $i + $offset < $diceNum &&
                    isset($diceArr[$i + $offset][$j]) &&
                    $diceArr[$i + $offset][$j] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $i + $offset < $diceNum &&
                    isset($diceArr[$i + $offset][$j]) &&
                    $diceArr[$i + $offset][$j] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }

            // 左下 - Wが連続している間だけ進む
            if ($i < $diceNum - 1 && $j > 0 && isset($diceArr[$i + 1][$j - 1]) && $diceArr[$i + 1][$j - 1] == 'W') {
                $offset = 1;
                while (
                    $i + $offset < $diceNum && $j - $offset > 0 &&
                    isset($diceArr[$i + $offset][$j - $offset]) &&
                    $diceArr[$i + $offset][$j - $offset] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $i + $offset < $diceNum && $j - $offset >= 0 &&
                    isset($diceArr[$i + $offset][$j - $offset]) &&
                    $diceArr[$i + $offset][$j - $offset] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }

            // 左 - Wが連続している間だけ進む
            if ($j > 0 && isset($diceArr[$i][$j - 1]) && $diceArr[$i][$j - 1] == 'W') {
                $offset = 1;
                while (
                    $j - $offset > 0 &&
                    isset($diceArr[$i][$j - $offset]) &&
                    $diceArr[$i][$j - $offset] == 'W'
                ) {
                    $offset++;
                }
                if (
                    $j - $offset >= 0 &&
                    isset($diceArr[$i][$j - $offset]) &&
                    $diceArr[$i][$j - $offset] == 'B'
                ) {
                    $placeNum += ($countUpFlag ? 1 : 0);
                    $countUpFlag = false;
                }
            }
        }
    }
}

echo $placeNum . "\n";
