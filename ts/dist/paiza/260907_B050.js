"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const DEBUG = !!process.env.DEBUG;
function solve(N, keyword, t) {
    if (DEBUG)
        console.log('\n\n' + N + ' ' + keyword + '\n' + t.join(' '));
    const list = [
        keyword,
        ...Array.from({ length: keyword.length - 1 }, (_, i) => keyword.slice(0, i + 1) + '[a-z]' + keyword.slice(i + 1)),
    ];
    if (DEBUG)
        console.log(list);
    /**
     * 指定された文字列(例えば "paiza")か、途中に余計な 1 文字の入った文字列(例えば "paxiza" など)が含まれます。
     */
    const checkValid = (str) => {
        let result = 'invalid';
        for (const l of list) {
            if (str.match(l)) {
                result = 'valid';
            }
        }
        return result;
    };
    for (const ticket of t) {
        console.log(checkValid(ticket));
    }
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
    const [N, S] = [Number(lines[0]), lines[1]];
    const T = Array.from({ length: N }, (_, idx) => lines[idx + 2]);
    solve(N, S, T);
});
//# sourceMappingURL=260907_B050.js.map