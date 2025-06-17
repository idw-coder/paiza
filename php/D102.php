<?php

function readInt()
{
    return (int)trim(fgets(STDIN));
}

$N = readInt();

$answer = $N * 10 + 100;

echo $answer;
