<?php
/**
 * メインの関数
 */
function calc($N, $Q, $dataArray, $queryArray) {
    /**
     * ログファイルのパス
     */
    $logFile = __DIR__ . '/../debug.log';
    $filename = basename(__FILE__);
    $logContent = "========== " . $filename . " ==========\n";

    $logContent .= "Nパン " . $N . "\n";
    $logContent .= "Qクエリ " . $Q . "\n";
    for ($i = 0; $i < count($dataArray); $i++) {
        $logContent .= "dataArray[" . $i . "] [" . implode(',', $dataArray[$i]) . "]\n";
    }
    for ($i = 0; $i < count($queryArray); $i++) {
        $logContent .= "queryArray[" . $i . "] [" . implode(',', $queryArray[$i]) . "]\n";
    }

    for ($i = 0; $i < $Q; $i++) {
        
        $logContent .= "--------------------------------\n";
        $logContent .= "i " . $i . "\n\n";
        // buy
        if ($queryArray[$i][0] == "buy") {
            $fee = 0;
            for ($j = 0; $j < $N; $j++) {
                $logContent .= "j " . $j . "\n\n";
                if ($dataArray[$j][1] >= $queryArray[$i][$j + 1]) {
                } else {
                    $fee = -1;
                    $logContent .= "fee " . $fee . "\n";
                    break;
                }
            }
            if ($fee !== -1) {
                for ($j = 0; $j < $N; $j++) {
                    $fee += $dataArray[$j][0] * $queryArray[$i][$j + 1];
                    $dataArray[$j][1] -= $queryArray[$i][$j + 1];
                }
                for ($j = 0; $j < $N; $j++) {
                    $logContent .= "dataArray[" . $j . "] [" . implode(',', $dataArray[$j]) . "]\n";
                }
            }
            $logContent .= "fee " . $fee . "\n";
            echo $fee . "\n";

        // bake
        } else {
            for ($j = 0; $j < $N; $j++) {
                $dataArray[$j][1] += $queryArray[$i][$j + 1];
            }
            for ($j = 0; $j < $N; $j++) {
                $logContent .= "dataArray[" . $j . "] [" . implode(',', $dataArray[$j]) . "]\n";
            }
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
$firstLine = explode(' ', trim(fgets(STDIN)));
$N = $firstLine[0];
$Q = $firstLine[1];

$dataArray = [];
for ($i = 0; $i < $N; $i++) {
    $dataArray[$i] = explode(' ', trim(fgets(STDIN)));
}

$queryArray = [];
for ($i = 0; $i < $Q; $i++) {
    $queryArray[$i] = explode(' ', trim(fgets(STDIN)));
}

calc($N, $Q, $dataArray, $queryArray);