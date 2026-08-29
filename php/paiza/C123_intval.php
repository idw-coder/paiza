<?php
$numGuests = fgets(STDIN);

$guestAges = [];
for ($i = 0; $i < $numGuests; $i++) {
    $guestAges[] = fgets(STDIN);
}

$numOrders = fgets(STDIN);

// 各参加者の豆の数（初期値0）
$beans = array_fill(0, $numGuests, 0);

for ($i = 0; $i < $numOrders; $i++) {
    $orderOutput = explode(' ', fgets(STDIN));
    for ($j = $orderOutput[0] - 1; $j <= $orderOutput[1] - 1; $j++) {
        $beans[$j] = intval(min($guestAges[$j], $beans[$j] + $orderOutput[2]));
    }
}

// 出力
foreach ($beans as $bean) {
    echo $bean . "\n";
}
