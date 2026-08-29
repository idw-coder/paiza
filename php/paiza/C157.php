<?php
// 自分の得意な言語で
// Let's チャレンジ！！

// 1行目：花の本数を読み込み（今回は使用しない）
$num = fgets(STDIN);

// 2行目：花の種類を空白区切りで読み込み
// trim()で改行文字を除去してからexplode()で分割
$input_line = explode(' ', trim(fgets(STDIN)));

// array_filter()で空の要素を除去（念のため）
$input_line = array_filter($input_line);

// array_unique()で重複する花の種類を除去
// 同じ種類の花は1本しか使えないため、種類数を数える
$flower_types = array_unique($input_line);

// 異なる花の種類数 = 使用できる最大の花の本数
echo count($flower_types);
