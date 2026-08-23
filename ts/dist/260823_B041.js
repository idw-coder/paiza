"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const DEBUG = !!process.env.DEBUG;
function solve(k, n, grid) {
    if (DEBUG)
        console.log('\n');
    if (DEBUG)
        console.log(k + '\n' + n);
    if (DEBUG)
        console.log(grid.map((g) => g.join('')).join('\n'));
    let count = 0;
    const result = (function repeat(cur) {
        const nxt = Array.from({ length: cur.length * cur.length }, () => []);
        for (let curRow = 0; curRow < cur.length; curRow++) {
            for (let curCol = 0; curCol < cur.length; curCol++) {
                if (cur[curRow][curCol] === '#') {
                    for (let nxtRow = 0; nxtRow < cur.length; nxtRow++) {
                        nxt[curRow * cur.length + nxtRow].push(...cur[nxtRow]);
                    }
                }
                else {
                    for (let nxtRow = 0; nxtRow < cur.length; nxtRow++) {
                        nxt[curRow * cur.length + nxtRow].push(...'.'.repeat(cur.length));
                    }
                }
                // if (DEBUG) console.log(nxt.map((r) => r.join('')).join('\n'))
                // if (DEBUG) console.log('\n')
            }
        }
        count++;
        if (count >= k)
            return nxt;
        return repeat(nxt);
    })(grid);
    console.log(result.map((r) => r.join('')).join('\n'));
    return;
}
process.stdin.resume();
process.stdin.setEncoding('utf8');
const lines = []; // 文字列専用の配列
const reader = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
reader.on('line', (line) => {
    lines.push(line);
});
reader.on('close', () => {
    const [K, N] = [Number(lines[0]), Number(lines[1])];
    const grid = [];
    for (let i = 0; i < N; i++) {
        grid[i] = lines[i + 2].split('');
    }
    solve(K, N, grid);
});
//# sourceMappingURL=260823_B041.js.map