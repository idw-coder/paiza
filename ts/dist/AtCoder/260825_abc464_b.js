"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const DEBUG = !!process.env.DEBUG;
function solve(h, w, grid) {
    if (DEBUG)
        console.log('\n');
    if (DEBUG)
        console.log(h + '' + w);
    if (DEBUG)
        console.log(grid.map((m) => m.join('')).join('\n'));
    /**
     *
     */
    while (!grid[0].includes('#'))
        grid.shift();
    while (!grid[grid.length - 1].includes('#'))
        grid.pop();
    while (grid.every((row) => row[0] === '.'))
        grid.forEach((row) => row.shift());
    while (grid.every((row) => row[grid[0].length - 1] === '.'))
        grid.forEach((row) => row.pop());
    console.log(grid.map((m) => m.join('')).join('\n'));
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
    const [H, W] = [Number(lines[0].split(' ')[0]), Number(lines[0].split(' ')[1])];
    const grid = Array.from({ length: H }, (_, i) => lines[i + 1].split(''));
    solve(H, W, grid);
});
//# sourceMappingURL=260825_abc464_b.js.map