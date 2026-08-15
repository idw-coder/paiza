"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
function solve(N, H, W, K) {
    let logContent = N + ' ' + H + ' ' + W + ' ' + K + '\n';
    const result = Array.from({ length: N }, () => Array.from({ length: N }, () => 0));
    for (const row of result) {
        logContent += row.join(' ') + '\n';
    }
    const reach = (y, x) => {
        const res = [];
        if (0 < y)
            res.push([x, y - 1]);
        if (y < N - 1)
            res.push([x, y + 1]);
        if (0 < x)
            res.push([x - 1, y]);
        if (x < N - 1)
            res.push([x + 1, y]);
        // ↘︎
        if (x <= y) {
            for (let i = 0; i < x + N - y; i++) {
                res.push([i, y - x + i]);
            }
        }
        if (y < x) {
            for (let i = 0; i < y + N - x; i++) {
                res.push([x - y + i, i]);
            }
        }
        // ↗︎
        if (x + y <= N - 1) {
            for (let i = 0; i < x + y + 1; i++) {
                res.push([i, x + y - i]);
            }
        }
        if (N - 1 < x + y) {
            for (let i = 0; i < N * 2 - (x + y) - 1; i++) {
                res.push([x + y - (N - 1) + i, N - 1 - i]);
            }
        }
        return res;
    };
    const dist = Array.from({ length: N }, () => Array.from({ length: N }, () => Infinity));
    (function move(x, y, count) {
        // 移動したカウント
        const currentCount = count + 1;
        //
        if (dist[y][x] <= currentCount)
            return;
        dist[y][x] = currentCount;
        // 現在地を1に
        result[y][x] = 1;
        if (currentCount > K)
            return;
        // 次の移動候補リスト
        const nextLists = reach(y, x);
        for (let i = 0; i < nextLists.length; i++) {
            // 再帰
            move(nextLists[i][0], nextLists[i][1], currentCount);
        }
    })(W - 1, H - 1, 0);
    fs_1.default.writeFileSync('debug.log', logContent);
    console.log(
    // '\n',
    result.flat().reduce((acc, cur) => acc + cur, 0));
    return;
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
    const N = Number(lines[0]?.split(' ')[0]);
    const H = Number(lines[0]?.split(' ')[1]);
    const W = Number(lines[0]?.split(' ')[2]);
    const K = Number(lines[0]?.split(' ')[3]);
    solve(N, H, W, K);
});
//# sourceMappingURL=260814_B070.js.map