<?php
/**
 * メインの関数
 */
function calc($input) {
    /**
     * ログファイルのパス
     */
    $logFile = __DIR__ . '/../debug.log';
    $filename = basename(__FILE__);
    $logContent = "========== " . $filename . " ==========\n";

    $logContent .= "input " . $input . "\n";

    $inputArray = str_split(trim($input));
    $logContent .= "inputArray " . implode(',', $inputArray) . "\n";

    
    $gridArray = [];
    for ($i = 0; $i < count($inputArray); $i++) {
        $logContent .= "inputArray[" . $i . "]: " . $inputArray[$i] . "\n";
        /**
         * 0
         * ...
         * ...
         * ...
         * 
         */
        if ($inputArray[$i] == 0) {
            for ($j = 0; $j < 3; $j++) 
            {
                for ($k = 0; $k < 3; $k++) {
                    $gridArray[$i][$j][$k] = '.';
                }
            }
        }
        /**
         * 1
         * #..
         * ...
         * ...
         * 
         */
        if ($inputArray[$i] == 1) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j == 0 && $k == 0) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 2
         * ##.
         * ...
         * ...
         * 
         */
        if ($inputArray[$i] == 2) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j == 0 && $k <= 1) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 3
         * ###
         * ...
         * ...
         * 
         */
        if ($inputArray[$i] == 3) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j == 0) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 4
         * ###
         * #..
         * ...
         * 
         */
        if ($inputArray[$i] == 4) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j == 0 || ($j == 1 && $k == 0)) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 5
         * ###
         * ##.
         * ...
         * 
         */
        if ($inputArray[$i] == 5) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j == 0 || ($j == 1 && $k <= 1)) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 6
         * ###
         * ###
         * ...
         * 
         */
        if ($inputArray[$i] == 6) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j <= 1) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 7
         * ###
         * ###
         * #..
         * 
         */
        if ($inputArray[$i] == 7) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j <= 1 || ($j == 2 && $k == 0)) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 8
         * ###
         * ###
         * ##.
         * 
         */
        if ($inputArray[$i] == 8) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    if ($j <= 1 || ($j == 2 && $k <= 1)) {
                        $gridArray[$i][$j][$k] = '#';
                    } else {
                        $gridArray[$i][$j][$k] = '.';
                    }
                }
            }
        }
        /**
         * 9
         * ###
         * ###
         * ###
         * 
         */
        if ($inputArray[$i] == 9) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    $gridArray[$i][$j][$k] = '#';
                }
            }
        }
    }
    $logContent .= "\n";

    for ($i = 0; $i < count($inputArray); $i++) {
        $logContent .= "gridArray[" . $i . "] ";
        $logContent .= "\n";
        for ($j = 0; $j < 3; $j++) {
            for ($k = 0; $k < 3; $k++) {
                $logContent .= $gridArray[$i][$j][$k];
            }
            $logContent .= "\n";
        }
        $logContent .= "\n\n";
    }

    $logContent .= "--------------------------------\n";

    $jointArray = [];
    for ($i = 0; $i < count($inputArray); $i++) {
        if ($i % 3 == 0) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    $jointArray[(int)(($i / 3) * 3 + $j)][($i % 3) * 3 + $k] = $gridArray[$i][$j][$k];
                }
            }
        }
        if ($i % 3 == 1) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    $jointArray[(int)(($i / 3) * 3 + $j - 1)][($i % 3) * 3 + $k] = $gridArray[$i][$j][$k];
                }
            }
        }
        if ($i % 3 == 2) {
            for ($j = 0; $j < 3; $j++) {
                for ($k = 0; $k < 3; $k++) {
                    $jointArray[(int)(($i / 3) * 3 + $j - 2)][($i % 3) * 3 + $k] = $gridArray[$i][$j][$k];
                }
            }
        }
        
        // ループ内で都度確認
        $logContent .= "jointArray (i=" . $i . "):\n";
        for ($row = 0; $row < count($jointArray); $row++) {
            if (isset($jointArray[$row])) {
                $rowStr = "";
                for ($col = 0; $col < count($jointArray[$row]); $col++) {
                    if (isset($jointArray[$row][$col])) {
                        $rowStr .= $jointArray[$row][$col];
                    }
                }
                $logContent .= "  [" . $row . "] " . $rowStr . "\n";
            }
        }
        $logContent .= "\n";
    }

    for ($i = 0; $i < count($jointArray); $i++) {
        echo implode('', $jointArray[$i]) . "\n";
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
$input = fgets(STDIN);


calc($input);