<?php
$inputArr = explode(' ', trim(fgets(STDIN)));
$H = $inputArr[0];
$W = $inputArr[1];
$processNum = $inputArr[2];

/**
 * @type array[] $pictureArr 画像の2次元配列
 * $pictureArr[i][j] = ['#' | '.']
 */
$pictureArr = [];
for ($i = 0; $i < $H; $i++) {
    $pictureArr[] = str_split(trim(fgets(STDIN)));
}

// for ($i = 0; $i < $H; $i++) {
//     echo implode('', $pictureArr[$i]) . "\n";
// }

$processArr = str_split(trim(fgets(STDIN)));
// echo implode('', $processArr) . "\n";

$newPictureArr = [];
for ($k = 0; $k < $processNum; $k++) {
    if ($processArr[$k] == 'D') {
        for ($i = 0; $i < $H; $i++) {
            for ($j = 0; $j < $W; $j++) {
                if (
                    $pictureArr[$i][$j] == '.' && (
                        isset($pictureArr[$i + 1][$j]) &&   $pictureArr[$i + 1][$j] == '#' ||
                        isset($pictureArr[$i][$j + 1]) && $pictureArr[$i][$j + 1] == '#' ||
                        isset($pictureArr[$i - 1][$j]) && $pictureArr[$i - 1][$j] == '#' ||
                        isset($pictureArr[$i][$j - 1]) && $pictureArr[$i][$j - 1] == '#')
                ) {
                    $newPictureArr[$i][$j] = '#';
                } else {
                    $newPictureArr[$i][$j] = $pictureArr[$i][$j];
                }
            }
        }
    } elseif ($processArr[$k] == 'E') {
        for ($i = 0; $i < $H; $i++) {
            for ($j = 0; $j < $W; $j++) {
                if (
                    $pictureArr[$i][$j] == '#' && (
                        isset($pictureArr[$i + 1][$j]) && $pictureArr[$i + 1][$j] == '.' ||
                        isset($pictureArr[$i][$j + 1]) && $pictureArr[$i][$j + 1] == '.' ||
                        isset($pictureArr[$i - 1][$j]) && $pictureArr[$i - 1][$j] == '.' ||
                        isset($pictureArr[$i][$j - 1]) && $pictureArr[$i][$j - 1] == '.')
                ) {
                    $newPictureArr[$i][$j] = '.';
                } else {
                    $newPictureArr[$i][$j] = $pictureArr[$i][$j];
                }
            }
        }
    }
    // echo $k . "\n";
    // for ($i = 0; $i < $H; $i++) {
    //     echo implode('', $newPictureArr[$i]) . "\n";
    // }
    $pictureArr = $newPictureArr;
}

for ($i = 0; $i < $H; $i++) {
    echo implode('', $newPictureArr[$i]) . "\n";
}
