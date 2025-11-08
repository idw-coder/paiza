<?php
/**
 * メインの関数
 */
function calc($N, $K, $gridArray, $inputArray) {
    /**
     * ログファイルのパス
     */
    $logFile = __DIR__ . '/../debug.log';
    $filename = basename(__FILE__);
    $logContent = "========== " . $filename . " ==========\n";

    $logContent .= "N: " . $N . "\n";
    $logContent .= "K: " . $K . "\n";
    for ($i = 0; $i < $N; $i++) {
        $logContent .= "gridArray[" . $i . "] [" . implode(',', $gridArray[$i]) . "]\n";
    }
    $logContent .= "inputArray: [" . implode(',', $inputArray) . "]\n";

    // ビンゴの数
    $bingoCount = 0;

    // 横のビンゴをチェック（行をチェック）
    for ($i = 0; $i < $N; $i++) {
        $isBingo = true;
        for ($j = 0; $j < $N; $j++) {
            // $inputArrayに含まれるかチェック、含まれていない場合は終了、
            // ただし、0は無視する（文字列"0"も数値0として扱う）
            if ($gridArray[$i][$j] != 0 && !in_array($gridArray[$i][$j], $inputArray)) {
                $isBingo = false;
                break;
            }
        }
        if ($isBingo) {
            $bingoCount++;
            $logContent .= "横のビンゴ (行" . $i . ")でビンゴ\n";
            $logContent .= "　現在のビンゴ数: " . $bingoCount . "\n";
            $logContent .= "　行" . $i . ": [" . implode(',', $gridArray[$i]) . "] isBingo=" . ($isBingo ? 'true' : 'false') . "\n";
        }
    }

    // 縦のビンゴをチェック（列をチェック）
    for ($j = 0; $j < $N; $j++) {
        $isBingo = true;
        $columnValues = [];
        for ($i = 0; $i < $N; $i++) {
            $columnValues[] = $gridArray[$i][$j];
            // $inputArrayに含まれるかチェック、含まれていない場合は終了
            // 0は無視する（文字列"0"も数値0として扱う）
            if ($gridArray[$i][$j] != 0 && !in_array($gridArray[$i][$j], $inputArray)) {
                $isBingo = false;
                break;
            }
        }
        if ($isBingo) {
            $bingoCount++;
            $logContent .= "縦のビンゴ (列" . $j . ")でビンゴ\n";
            $logContent .= "　現在のビンゴ数: " . $bingoCount . "\n";
            $logContent .= "　列" . $j . ": [" . implode(',', $columnValues) . "] isBingo=" . ($isBingo ? 'true' : 'false') . "\n";
        }
    }

    // 斜めのビンゴをチェック（左上から右下）
    $isBingo = true;
    for ($i = 0; $i < $N; $i++) {
        // 0は無視する（文字列"0"も数値0として扱う）
        if ($gridArray[$i][$i] != 0 && !in_array($gridArray[$i][$i], $inputArray)) {
            $isBingo = false;
            break;
        }
    }
    if ($isBingo) {
        $bingoCount++;
        $logContent .= "斜めのビンゴでビンゴ\n";
        $logContent .= "　現在のビンゴ数: " . $bingoCount . "\n";
    }

    // 反斜めのビンゴをチェック（右上から左下）
    $isBingo = true;
    for ($i = 0; $i < $N; $i++) {
        // 0は無視する（文字列"0"も数値0として扱う）
        if ($gridArray[$i][$N - 1 - $i] != 0 && !in_array($gridArray[$i][$N - 1 - $i], $inputArray)) {
            $isBingo = false;
            break;
        }
    }
    if ($isBingo) {
        $bingoCount++;
        $logContent .= "反斜めのビンゴでビンゴ\n";
        $logContent .= "　現在のビンゴ数: " . $bingoCount . "\n";
    }

    $logContent .= "bingoCount: " . $bingoCount . "\n";

    /**
     * ログをファイルに書き込む
     */
    // file_put_contents($logFile, $output, FILE_APPEND); // 追記
    file_put_contents($logFile, $logContent); // 毎回上書き

    echo $bingoCount;
    return;
}

/**
 * 標準入力から1行分のデータを読み取る
 * @return int[] 整数値の配列
 */
$input = explode(' ', trim(fgets(STDIN)));
$N = $input[0];
$K = $input[1];

/**
 * 2次元配列を初期化
 */
$gridArray = [];
for ($i = 0; $i < $N; $i++) {
    $input = explode(' ', trim(fgets(STDIN)));
    $gridArray[$i] = $input;
}

/**
 * 1次元配列を初期化
 */
$inputArray = explode(' ', trim(fgets(STDIN)));

calc($N, $K, $gridArray, $inputArray);