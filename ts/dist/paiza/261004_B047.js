"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const DEBUG = !!process.env.DEBUG;
function solve(S) {
    if (DEBUG)
        console.log('\n\n' + S);
    const keyList = [
        [
            { key: 'q', hand: 'left' },
            { key: 'w', hand: 'left' },
            { key: 'e', hand: 'left' },
            { key: 'r', hand: 'left' },
            { key: 't', hand: 'left' },
            { key: 'y', hand: 'right' },
            { key: 'u', hand: 'right' },
            { key: 'i', hand: 'right' },
            { key: 'o', hand: 'right' },
            { key: 'p', hand: 'right' },
        ],
        [
            { key: 'a', hand: 'left' },
            { key: 's', hand: 'left' },
            { key: 'd', hand: 'left' },
            { key: 'f', hand: 'left' },
            { key: 'g', hand: 'left' },
            { key: 'h', hand: 'right' },
            { key: 'j', hand: 'right' },
            { key: 'k', hand: 'right' },
            { key: 'l', hand: 'right' },
        ],
        [
            { key: 'z', hand: 'left' },
            { key: 'x', hand: 'left' },
            { key: 'c', hand: 'left' },
            { key: 'v', hand: 'left' },
            { key: 'b', hand: 'left' },
            { key: 'n', hand: 'right' },
            { key: 'm', hand: 'right' },
        ],
    ];
    // if (DEBUG) console.log(keyList)
    const correctHandList = S.split('').map((v) => keyList.flat().find((k) => k.key === v).hand);
    if (DEBUG)
        console.log(correctHandList);
    const currentDir = keyList[0].findIndex((k) => k.key === S[0]) !== -1
        ? { row: 0, col: keyList[0].findIndex((k) => k.key === S[0]) }
        : keyList[1].findIndex((k) => k.key === S[0]) !== -1
            ? { row: 1, col: keyList[1].findIndex((k) => k.key === S[0]) }
            : keyList[2].findIndex((k) => k.key === S[0]) !== -1
                ? { row: 2, col: keyList[2].findIndex((k) => k.key === S[0]) }
                : undefined;
    if (DEBUG)
        console.log(currentDir);
    if (!currentDir)
        return;
    let currentHand = keyList[currentDir.row][currentDir.col].hand;
    if (DEBUG)
        console.log(currentHand + '\n');
    let result = 0;
    /**
     * S の各文字は半角英小文字である
     * 1 ≦ ( S の長さ) ≦ 10,000
     */
    for (let i = 1; i < S.length; i++) {
        // hand が正しくない
        if (DEBUG)
            console.log('i: ' + i + ', currentHand: ' + currentHand + ', correctHandList[i]: ' + correctHandList[i]);
        // currentDir が S[i] の nextDir から遠ければ currentHand 更新
        const is0 = keyList[0].findIndex((k) => k.key === S[i]);
        const is1 = keyList[1].findIndex((k) => k.key === S[i]);
        const is2 = keyList[2].findIndex((k) => k.key === S[i]);
        const nextdir = is0 !== -1
            ? { row: 0, col: is0 }
            : is1 !== -1
                ? { row: 1, col: is1 }
                : is2 !== -1
                    ? { row: 2, col: is2 }
                    : undefined;
        if (!nextdir)
            continue;
        if (1 < Math.abs(nextdir.row - currentDir.row) + Math.abs(nextdir.col - currentDir.col)) {
            if (DEBUG)
                console.log('prevHand: ' + keyList[currentDir.row][currentDir.col].hand);
            if (DEBUG)
                console.log('currentHand update ' + currentHand);
            currentHand = keyList[nextdir.row][nextdir.col].hand;
        }
        if (0 < i && currentHand !== correctHandList[i])
            result++;
        // currentDir の更新
        currentDir.row = nextdir.row;
        currentDir.col = nextdir.col;
    }
    console.log(result);
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
const lines = [];
const reader = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
reader.on('line', (line) => {
    lines.push(line);
});
reader.on('close', () => {
    const S = lines[0];
    solve(S);
});
//# sourceMappingURL=261004_B047.js.map