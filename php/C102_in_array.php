<?php
$numA = fgets(STDIN);

// Aの日程の読み込み
$ADays = [];
for ($i = 0; $i < $numA; $i++) {
    $ADays[] = fgets(STDIN);
}

$numB = fgets(STDIN);

// Bの日程の読み込み
$BDays = [];
for ($i = 0; $i < $numB; $i++) {
    $BDays[] = fgets(STDIN);
}

// 各日程
$Days = [];
$AorB = 'A';
for ($i = 1; $i <= 31; $i++) {
    if (in_array($i, $ADays) && in_array($i, $BDays)) {
        $Days[] = $AorB;
        // 交互にAとBを入れる
        $AorB = $AorB === 'A' ? 'B' : 'A';
    } else if (in_array($i, $ADays)) {
        $Days[] = 'A';
    } else if (in_array($i, $BDays)) {
        $Days[] = 'B';
    } else {
        $Days[] = 'x';
    }
}

// 出力
foreach ($Days as $Day) {
    echo $Day . "\n";
}
