"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const DEBUG = !!process.env.DEBUG;
function solve(N, M, K, myList, t) {
    if (DEBUG)
        console.log('\n\n' +
            N +
            ' ' +
            M +
            ' ' +
            K +
            '\n' +
            myList.join(' ') +
            '\n' +
            t.map((c) => c.join(' ')).join('\n'));
    const result = [];
    /**
     * お店の評価を星 4 段階で登録することができます。行ったことのないお店は星 0 で、
     * 行ったことのあるお店は自分の評価によって星 1 から 3 の間で評価することができます。
     * あるユーザーに対し、自分とそのユーザーの両方とも評価が星 3 であるようなお店の数がある定数 K 以上であるとき、
     * 「好みが似ているユーザー」と定義します。
     * N 店の中から、自分が行ったことがなく、かつ「好みが似ているユーザー」が星 3 の評価をしているようなお店を全て出力
     * なければ no
     */
    const similarList = t.filter((shops) => {
        return (K <= shops.reduce((count, value, i) => count + (value === 3 && myList[i] === 3 ? 1 : 0), 0));
    });
    if (DEBUG)
        console.log(similarList.join('\n'));
    for (let i = 0; i < N; i++) {
        if (myList[i] === 0) {
            for (const similar of similarList) {
                if (similar[i] === 3) {
                    result.push(i + 1);
                    break;
                }
            }
        }
    }
    console.log(result.length ? result.join(' ') : 'no');
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
    const [N, M, K] = lines[0].split(' ').map(Number);
    const s = lines[1].split(' ').map(Number);
    const t = Array.from({ length: M }, (_, idx) => lines[idx + 2].split(' ').map(Number));
    solve(N, M, K, s, t);
});
//# sourceMappingURL=260915_B84.js.map