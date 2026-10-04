"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const DEBUG = !!process.env.DEBUG;
function solve(N, playList) {
    if (DEBUG)
        console.log('\n\n' + N);
    if (DEBUG)
        console.log(playList);
    /**
     *
     */
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
    const N = Number(lines[0]);
    const list = Array.from({ length: N }, (_, i) => lines[i + 1].split(' ')).map(Number);
    solve(N, list);
});
//# sourceMappingURL=261004_B078.js.map