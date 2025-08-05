<?php
$inputArr = explode(' ', fgets(STDIN));

$cardNum = $inputArr[0];
$cardSetNum = $inputArr[1];
$shuffleNum = $inputArr[2];

/**
 * カードの配列を作成
 * range()は、連続した数字の配列を作成する関数
 * 第一引数は開始数、第二引数は終了数
 */
$cardArr = range(1, $cardNum);
for ($i = 0; $i < $cardNum; $i++) {
    // echo $cardArr[$i] . "\n";
}
// echo "--------------------------------\n";

// 小数点以下を切り捨て
$setNum = floor($cardNum / $cardSetNum); // セット数
// echo "setNum: " . $setNum . "\n";
$remainder = $cardNum % $cardSetNum; // 余り
// echo "remainder: " . $remainder . "\n";


for ($k = 0; $k < $shuffleNum; $k++) {
    $setCardArr = []; // 配列を初期化

    if ($k !== 0) {
        $cardArr = $newCardArr;
    }
    $newCardArr = [];

    for ($i = 0; $i < $setNum; $i++) {
        /**
         * array_slice()は、配列の一部を取得する関数
         * 第一引数は配列、第二引数は開始位置、第三引数は取得する要素数
         */
        $setCardArr[] = array_slice($cardArr, $i * $cardSetNum, $cardSetNum);
        // echo "$i: " . $i . "\n";
        // echo "setCardArr: " . implode(', ', $setCardArr[$i]) . "\n";
        $newCardArr = array_merge($setCardArr[$i], $newCardArr);
        // echo "newCardArr: " . implode(', ', $newCardArr) . "\n";
    }

    /**
     * 余りのカードの配列を作成
     * range()は、連続した数字の配列を作成する関数
     * @param int $start 開始数
     * @param int $end 終了数
     * @return array 連続した数字の配列
     */
    // echo "setNum * cardSetNum + 1: " . ($setNum * $cardSetNum + 1) . "\n";
    // echo "setNum * cardSetNum + remainder: " . ($setNum * $cardSetNum + $remainder) . "\n";
    if ($remainder > 0) {
        $remainderCardArr = array_slice($cardArr, $setNum * $cardSetNum, $remainder);
        // echo "あまりのカードの配列: " . implode(', ', $remainderCardArr) . "\n";
        $newCardArr = array_merge($remainderCardArr, $newCardArr);
    }

    // シャッフル後の配列を次のシャッフルの入力として使用
    $cardArr = $newCardArr;
    // echo "$i: " . $i . "\n";
    // print_r($cardArr);
}

for ($i = 0; $i < $cardNum; $i++) {
    echo $newCardArr[$i] . "\n";
}
