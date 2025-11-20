<?php
/**
 * メインの関数
 */
function calc($N, $gridArray) {
    /**
     * ログファイルのパス
     */
    $logFile = __DIR__ . '/../debug.log';
    $filename = basename(__FILE__);
    $logContent = "========== " . $filename . " ==========\n";

    $logContent .= "N " . $N . "\n";
    for ($i = 0; $i < count($gridArray); $i++) {
        $logContent .= "gridArray[" . $i . "] [" . implode(',', $gridArray[$i]) . "]\n";
    }

    // 壁が特定の方向に接続できるかチェック
    $canConnect = function($wall, $direction) {
        return ($wall == 1 && ($direction == 'left' || $direction == 'right')) ||
               ($wall == 2 && ($direction == 'up' || $direction == 'down')) ||
               ($wall == 3 && ($direction == 'up' || $direction == 'right')) ||
               ($wall == 4 && ($direction == 'right' || $direction == 'down')) ||
               ($wall == 5 && ($direction == 'left' || $direction == 'down')) ||
               ($wall == 6 && ($direction == 'left' || $direction == 'up'));
    };

    $resultArray = [];
    for ($i = 0; $i < $N; $i++) {
        $resultArray[$i] = [];
        for ($j = 0; $j < $N; $j++) {
            if (isset($gridArray[$i][$j]) && $gridArray[$i][$j] == 7) {
                if (
                    // 1─
                    isset($gridArray[$i][$j - 1]) && $gridArray[$i][$j - 1] != 0 && $canConnect($gridArray[$i][$j - 1], 'right')
                    && isset($gridArray[$i][$j + 1]) && $gridArray[$i][$j + 1] != 0 && $canConnect($gridArray[$i][$j + 1], 'left')) {
                    $resultArray[$i][$j] = 1;
                } else if (
                    // 2│
                    isset($gridArray[$i - 1][$j]) && $gridArray[$i - 1][$j] != 0 && $canConnect($gridArray[$i - 1][$j], 'down')
                    && isset($gridArray[$i + 1][$j]) && $gridArray[$i + 1][$j] != 0 && $canConnect($gridArray[$i + 1][$j], 'up')) {
                    $resultArray[$i][$j] = 2;
                } else if (
                    // 3└
                    isset($gridArray[$i - 1][$j]) && $gridArray[$i - 1][$j] != 0 && $canConnect($gridArray[$i - 1][$j], 'down')
                    && isset($gridArray[$i][$j + 1]) && $gridArray[$i][$j + 1] != 0 && $canConnect($gridArray[$i][$j + 1], 'left')) {
                    $resultArray[$i][$j] = 3;
                } else if (
                    // 4┌
                    isset($gridArray[$i][$j + 1]) && $gridArray[$i][$j + 1] != 0 && $canConnect($gridArray[$i][$j + 1], 'left')
                    && isset($gridArray[$i + 1][$j]) && $gridArray[$i + 1][$j] != 0 && $canConnect($gridArray[$i + 1][$j], 'up')) {
                    $resultArray[$i][$j] = 4;
                } else if (
                    // 5┐
                    isset($gridArray[$i][$j - 1]) && $gridArray[$i][$j - 1] != 0 && $canConnect($gridArray[$i][$j - 1], 'right')
                    && isset($gridArray[$i + 1][$j]) && $gridArray[$i + 1][$j] != 0 && $canConnect($gridArray[$i + 1][$j], 'up')) {
                    $resultArray[$i][$j] = 5;
                } else if (
                    // 6┘
                    isset($gridArray[$i][$j - 1]) && $gridArray[$i][$j - 1] != 0 && $canConnect($gridArray[$i][$j - 1], 'right')
                    && isset($gridArray[$i - 1][$j]) && $gridArray[$i - 1][$j] != 0 && $canConnect($gridArray[$i - 1][$j], 'down')) {
                    $resultArray[$i][$j] = 6;
                } 
            } else {
                if (isset($gridArray[$i][$j])) {
                    $resultArray[$i][$j] = $gridArray[$i][$j];
                }
            }
        }
    }
    for ($i = 0; $i < count($resultArray); $i++) {
        if (isset($resultArray[$i])) {
            $logContent .= "resultArray[" . $i . "] [" . implode(',', $resultArray[$i]) . "]\n";
            echo implode('', $resultArray[$i]) . "\n";
        }
    }
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
$N = trim(fgets(STDIN));

$gridArray = [];
for ($i = 0; $i < $N; $i++) {
    $gridArray[$i] = array_map('intval', str_split(trim(fgets(STDIN))));
}

calc($N, $gridArray);