<?php
$base_word = fgets(STDIN);

// 改行文字を除去して正確な文字数を取得
$base_word = rtrim($base_word, "\n");
$base_word_length = strlen($base_word);

echo str_repeat('+', $base_word_length + 2) . "\n";
echo '+' . $base_word . '+' . "\n";
echo str_repeat('+', $base_word_length + 2) . "\n";
