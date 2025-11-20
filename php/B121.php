<?php
/**
 * メインの関数
 */
function calc($N, $gridArray, $processArray) {
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
    $logContent .= "processArray " . implode(',', $processArray) . "\n";

    $changeArray = [];
    for ($i = 0; $i < $processArray[2]; $i++) {
        for ($j = 0; $j < $processArray[2]; $j++) {
            $changeArray[$i][$j] = $gridArray[$processArray[0] + $i - 1][$processArray[1] + $j - 1];
            // $logContent .= "changeArray[" . $i . "][" . $j . "] " . $changeArray[$i][$j] . "\n";
        }
        $logContent .= "changeArray[" . $i . "] [" . implode(',', $changeArray[$i]) . "]\n";

    }

    // 時計回りに回転
    $lotationArray = [];
    if ($processArray[3] == 0
    || $processArray[3] == 360
    ) {
        $lotationArray = $changeArray;
    } else if ($processArray[3] == 90) {
        $lotationArray = [];
        for ($i = 0; $i < $processArray[2]; $i++) {
            for ($j = 0; $j < $processArray[2]; $j++) {
                $lotationArray[$i][$j] = $changeArray[$processArray[2] - $j - 1][$i];
            }
        }
    } else if ($processArray[3] == 180) {
        $lotationArray = [];
        for ($i = 0; $i < $processArray[2]; $i++) {
            for ($j = 0; $j < $processArray[2]; $j++) {
                $lotationArray[$i][$j] = $changeArray[$processArray[2] - $i - 1][$processArray[2] - $j - 1];
            }
        }
    } else if ($processArray[3] == 270) {
        $lotationArray = [];
        for ($i = 0; $i < $processArray[2]; $i++) {
            for ($j = 0; $j < $processArray[2]; $j++) {
                $lotationArray[$i][$j] = $changeArray[$j][$processArray[2] - $i - 1];
            }
        }
    }

    $logContent .= $processArray[3] . "\n";

    for ($i = 0; $i < count($lotationArray); $i++) {
        $logContent .= "lotationArray[" . $i . "] [" . implode(',', $lotationArray[$i]) . "]\n";
    }

    $resultArray = [];
    for ($i = 0; $i < $N; $i++) {
        for ($j = 0; $j < $N; $j++) {
            if ($i >= $processArray[0] - 1 && $i < $processArray[0] + $processArray[2] - 1
            && $j >= $processArray[1] - 1 && $j < $processArray[1] + $processArray[2] - 1) {
                $resultArray[$i][$j] = $lotationArray[$i - $processArray[0] + 1][$j - $processArray[1] + 1];
                // $logContent .= "change\n";
            } else {
                $resultArray[$i][$j] = $gridArray[$i][$j];
                // $logContent .= "no change\n";
            }
        }
    }

    for ($i = 0; $i < count($resultArray); $i++) {
        $logContent .= "resultArray[" . $i . "] [" . implode(',', $resultArray[$i]) . "]\n";
    }

    for ($i = 0; $i < count($resultArray); $i++) {
        echo implode(' ', $resultArray[$i]) . "\n";
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
    $gridArray[$i] = explode(' ', trim(fgets(STDIN)));
}

$processArray = explode(' ', trim(fgets(STDIN)));

calc($N, $gridArray, $processArray);