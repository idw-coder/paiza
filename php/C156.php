<?php
$num = fgets(STDIN);

// 2行目以降の複数行の読み込み
$timeDays = [];
for ($i = 0; $i < $num; $i++) {
    $timeDays[] = fgets(STDIN);
}

// 各日の時間を計算
$time = 0;
foreach ($timeDays as $timeDay) {
    $timeDay = explode(' ', $timeDay);
    $timeIn = $timeDay[0];
    $timeOut = $timeDay[1];
    $timeInArr = explode(':', $timeIn);
    $timeOutArr = explode(':', $timeOut);

    $timeInMin = intval($timeInArr[0]) * 60 + intval($timeInArr[1]);
    $timeOutMin = intval($timeOutArr[0]) * 60 + intval($timeOutArr[1]);

    $time += $timeOutMin - $timeInMin;
}

$hh = intdiv($time, 60); // 時間部分
$mm = $time % 60;        // 分部分

echo $hh . " " . $mm;
