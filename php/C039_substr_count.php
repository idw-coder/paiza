<?php
$input = fgets(STDIN);
$inputArr = explode('+', $input);

$sum = 0;
foreach ($inputArr as $value) {
    $valTenth = substr_count($value, '<');
    $valOne = substr_count($value, '/');
    $sum += $valTenth * 10 + $valOne;
}

echo $sum;
