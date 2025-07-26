<?php
// 自分の得意な言語で
// Let's チャレンジ！！
$input_line1 = intval(fgets(STDIN));

$input_line2 = explode(' ', fgets(STDIN));

$boxSum = array_sum($input_line2);

echo ceil($boxSum / $input_line1);
