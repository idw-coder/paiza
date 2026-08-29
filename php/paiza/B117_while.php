<?php
$carNum = (int)fgets(STDIN);

/** 
 * @var array[] $carArr 初期位置での車の配置（インデックスは0始まり）
 * $carArr[i] = ['car_number' => 車番, 'distance' => 移動距離]
 */
$carArr = [];
for ($i = 0; $i < $carNum; $i++) {
    $carNumber = (int)fgets(STDIN);
    $carArr[$i] = [
        'car_number' => $carNumber,
        'distance' => 0
    ];
}

// iずつ進行方向に進み、出口に一番近い車が最も小さい車番であれば、その車番を削除
while (count($carArr) > 0) {

    // 残っている車の中で最も小さい車番
    $minCarNumber = min(array_column($carArr, 'car_number'));
    // echo "残っているもっとも小さい車番: " . $minCarNumber . "\n";
    // echo "車番 周回数\n";
    foreach ($carArr as $car) {
        // echo $car['car_number'] . " " . $car['distance'] . "\n";
    }

    // 出口に一番近い車が一番小さい車番であれば削除、その次も同様に探す
    $count = count($carArr);
    for ($j = 0; $j < $count; $j++) {
        // echo "削除タイミング: " . $j . "\n";
        // echo "削除対象の車番: " . $carArr[$j]['car_number'] . "\n";
        if ($carArr[$j]['car_number'] == $minCarNumber) {

            if ($minCarNumber == $carNum) {
                echo $carArr[$j]['distance'];
                break 2;
            }
            // echo "削除した車番: " . $carArr[$j]['car_number'] . "\n";
            unset($carArr[$j]);
            // $carArr = array_values($carArr);
            $minCarNumber++;
        } else {
            break;
        }
    }
    $carArr = array_values($carArr);

    // 進行方向に進む際の配列の値の更新
    $carArr[0]['distance'] += 1;
    // echo "進行方向に進む際の配列の値の更新: \n";
    // echo "車番 周回数\n";
    // foreach ($carArr as $car) {
    // echo " " . $car['car_number'] . " " . $car['distance'] . "\n";
    // }

    // 配列のオフセットをずらす（先頭の車を末尾に移動）
    $firstCar = array_shift($carArr);
    array_push($carArr, $firstCar);

    // echo "進行方向に進む際の配列の値の更新: \n";
    // echo "車番 周回数\n";
    // foreach ($carArr as $car) {
    // echo "  " . $car['car_number'] . " " . $car['distance'] . "\n";
    // }
}
