<?php
/**
 * メインの関数
 */
function calc($n, $m, $h, $w, $gridArray) {
    /**
     * ログファイルのパス
     */
    $logFile = __DIR__ . '/../debug.log';
    $filename = basename(__FILE__);
    $logContent = "========== " . $filename . " ==========\n";

    $logContent .= "n 回 " . $n . "\n";
    $logContent .= "m 種類 " . $m . "\n";
    $logContent .= "h " . $h . "\n";
    $logContent .= "w " . $w . "\n";
    $logContent .= "              行   列  \n";
    for ($i = 0; $i < count($gridArray); $i++) {
        $logContent .= "gridArray[" . $i . "] [" . implode(',', $gridArray[$i]) . "]\n";
    }

    $mapArray = [];
    for ($i = 0; $i < $h; $i++) {
        for ($j = 0; $j < $w; $j++) {
            $mapArray[$i][$j] = ".";
        }
    }

    $logContent .= "--------------------------------\n";
    $logContent .= "mapArray 初期状態\n";
    for ($i = 0; $i < $h; $i++) {
        $logContent .= "mapArray[" . $i . "] [" . implode(',', $mapArray[$i]) . "]\n";
    }
    $logContent .= "\n";

    $resultArray = [];
    for ($i = 0; $i < $m; $i++) {
        $resultArray[$i] = 0;
    }

    $logContent .= "--------------------------------\n";
    $logContent .= "resultArray 初期状態\n";
    for ($i = 0; $i < $m; $i++) {
        $logContent .= "resultArray[" . $i . "] " . $resultArray[$i] . "\n";
    }
    $logContent .= "\n";
    
    $logContent .= "--------------------------------\n";
    $logContent .= "mapArray 更新後\n";
    for ($i = 0; $i < $n; $i++) {
        for ($j = 0; $j < $h; $j++) {
            for ($k = 0; $k < $w; $k++) {
                if ($gridArray[$i][0] <= $j + 1 && $j + 1 <= $gridArray[$i][1] 
                && $gridArray[$i][2] <= $k + 1 && $k + 1 <= $gridArray[$i][3]) {
                    if ($mapArray[$j][$k] !== ".") {
                        $resultArray[$mapArray[$j][$k] - 1]++;
                    }
                    $mapArray[$j][$k] = $gridArray[$i][4];
                }
            }
        }
        for ($j = 0; $j < $h; $j++) {
            $logContent .= "mapArray[" . $j . "] [" . implode(',', $mapArray[$j]) . "]\n";
        }
    }

    $logContent .= "--------------------------------\n";
    $logContent .= "resultArray 更新後\n";
    for ($i = 0; $i < $m; $i++) {
        $logContent .= "resultArray[" . $i . "] " . $resultArray[$i] . "\n";
        echo $resultArray[$i] . "\n";
    }
    $logContent .= "\n";
    for ($i = 0; $i < $h; $i++) {
        $logContent .= "mapArray[" . $i . "] [" . implode(',', $mapArray[$i]) . "]\n";
        echo implode('', $mapArray[$i]) . "\n";
    }
    $logContent .= "\n";
    
    /**
     * ログをファイルに書き込む
     */
    // file_put_contents($logFile, $output, FILE_APPEND); // 追記
    file_put_contents($logFile, $logContent); // 毎回上書き

    return;
}

/**
 * 標準入力から1行分のデータを読み取る
 */
$inputArr1 = explode(' ', trim(fgets(STDIN)));
$n = $inputArr1[0];
$m = $inputArr1[1];

$inputArr2 = explode(' ', trim(fgets(STDIN)));
$h = $inputArr2[0];
$w = $inputArr2[1];

$gridArray = [];
for ($i = 0; $i < $n; $i++) {
    $gridArray[$i] = explode(' ', trim(fgets(STDIN)));
}

calc($n, $m, $h, $w, $gridArray);