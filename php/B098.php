<?php
/**
 * メインの関数
 */
function calc($N, $M, $T, $K, $dataArray) {
    /**
     * ログファイルのパス
     */
    $logFile = __DIR__ . '/../debug.log';
    $filename = basename(__FILE__);
    $logContent = "========== " . $filename . " ==========\n";

    $logContent .= "N発言の種類 " . $N . "\n";
    $logContent .= "M監視時間 " . $M . "\n";
    $logContent .= "T判定時間 " . $T . "\n";
    $logContent .= "K判定回数 " . $K . "\n";
    for ($i = 0; $i < count($dataArray); $i++) {
        $logContent .= "dataArray[" . $i . "] [" . implode(',', $dataArray[$i]) . "]\n";
    }

    $logContent .= "--------------------------------\n";

    $resultArray = [];
    for ($i = 0; $i < $N; $i++) {
        $resultArray[$i] = "no 0";
    }

    for ($i = 0; $i < $M; $i++) {
        for ($j = 0; $j < $N; $j++) {
            // 列$jの和を計算する
            $columnSum = 0;
            $startIndex = max(0, $i - $T + 1);
            for ($k = $startIndex; $k <= $i && $k < count($dataArray); $k++) {
                $columnSum += (int)$dataArray[$k][$j];
            }
            
            if ($resultArray[$j] === "no 0"
            && $columnSum >= $K) {
                $resultArray[$j] = "yes " . ($i + 1);
            }
        }
    }

    for ($i = 0; $i < $N; $i++) {
        $logContent .= $resultArray[$i] . "\n";
        echo $resultArray[$i] . "\n";
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
$firstLine = explode(' ', trim(fgets(STDIN)));
$N = $firstLine[0];
$M = $firstLine[1];
$T = $firstLine[2];
$K = $firstLine[3];

$dataArray = [];
for ($i = 0; $i < $M; $i++) {
    $dataArray[$i] = explode(' ', trim(fgets(STDIN)));
}

calc($N, $M, $T, $K, $dataArray);