<?php
/**
 * メインの関数
 */
function calc($w, $headerArray, $h, $dataArray) {
    /**
     * ログファイルのパス
     */
    $logFile = __DIR__ . '/../debug.log';
    $filename = basename(__FILE__);
    $logContent = "========== " . $filename . " ==========\n";

    $logContent .= "w " . $w . "\n";
    $logContent .= "headerArray " . implode(',', $headerArray) . "\n";
    $logContent .= "h " . $h . "\n";
    for ($i = 0; $i < count($dataArray); $i++) {
        $logContent .= "dataArray[" . $i . "] [" . implode(',', $dataArray[$i]) . "]\n";
    }

    array_unshift($dataArray, $headerArray);

    $logContent .= "\n";
    for ($i = 0; $i < count($dataArray); $i++) {
        $logContent .= "dataArray[" . $i . "] [" . implode(",", $dataArray[$i]) . "]\n";
    }

    $lengthArray = array_fill(0, $w, 0);

    $logContent .= "lengthArray " . implode(",", $lengthArray) . "\n";
    for ($i = 0; $i < $w; $i++) {
        for ($j = 0; $j < count($dataArray); $j++) {
            if (strlen($dataArray[$j][$i]) > $lengthArray[$i]) {
                $lengthArray[$i] = strlen($dataArray[$j][$i]);
            }
        }
    }

    $logContent .= "lengthArray " . implode(",", $lengthArray) . "\n";

    for ($i = 0; $i < count($dataArray); $i++) {
        for ($j = 0; $j < $w; $j++) {
            if ($j == 0) {
                $dataArray[$i][$j] = "| ". $dataArray[$i][$j] . str_repeat(" ", $lengthArray[$j] - strlen($dataArray[$i][$j])) . " |";
            } else {
                $dataArray[$i][$j] = " ". $dataArray[$i][$j] . str_repeat(" ", $lengthArray[$j] - strlen($dataArray[$i][$j])) . " |";
            }
        }
    }

    for ($i = 0; $i < count($dataArray); $i++) {
        $logContent .= "dataArray[" . $i . "] " . implode("", $dataArray[$i]) . "\n";
    }

    $separatorArray = [];
    for ($i = 0; $i < $w; $i++) {
        if ($i == 0) {
            $separatorArray[$i] = "|" . str_repeat("-", $lengthArray[$i] + 2) . "|";
        } else {
            $separatorArray[$i] = str_repeat("-", $lengthArray[$i] + 2) . "|";
        }
    }

    array_splice($dataArray, 1, 0, [$separatorArray]);

    for ($i = 0; $i < count($dataArray); $i++) {
        $logContent .= "dataArray[" . $i . "] " . implode("", $dataArray[$i]) . "\n";
        echo implode("", $dataArray[$i]) . "\n";
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
$w = trim(fgets(STDIN));
$headerArray = explode(' ', trim(fgets(STDIN)));
$h = trim(fgets(STDIN));
$dataArray = [];
for ($i = 0; $i < $h; $i++) {
    $dataArray[$i] = explode(' ', trim(fgets(STDIN)));
}

calc($w, $headerArray, $h, $dataArray);