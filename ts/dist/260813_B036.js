"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
function solve(M, player, N, details) {
    let logContent = M + '\n';
    const playerResult = player.map((item, index) => ({
        id: index + 1,
        party: item,
        count: 0,
    }));
    for (let i = 0; i < M; i++) {
        logContent += JSON.stringify(playerResult[i]) + '\n';
    }
    logContent += '\n' + N + '\n';
    for (let i = 0; i < N; i++) {
        logContent += '[' + i + '] ' + details[i]?.join(', ') + '\n';
        const choice = { repu: 0, demo: 0 };
        for (let j = 0; j < N && (!choice.repu || !choice.demo); j++) {
            if (!choice.repu && playerResult[details[i][j] - 1].party === 'Republican') {
                choice.repu = playerResult[details[i][j] - 1].id;
            }
            else if (!choice.demo && playerResult[details[i][j] - 1].party === 'Democratic') {
                choice.demo = playerResult[details[i][j] - 1].id;
            }
        }
        playerResult[choice.repu - 1].count++;
        playerResult[choice.demo - 1].count++;
        logContent += playerResult.map((item) => item.count) + '\n';
    }
    const sorted = [...playerResult].sort((a, b) => b.count - a.count);
    const resRepu = sorted.find((p) => p.party === 'Republican');
    const resDemo = sorted.find((p) => p.party === 'Democratic');
    logContent += resRepu?.id + ' ' + resDemo?.id;
    for (const player of playerResult) {
        player.count = 0;
    }
    let repuCount = 0;
    let demoCount = 0;
    for (let i = 0; i < N; i++) {
        const first = details[i]?.find((value) => value === resRepu?.id || value === resDemo?.id);
        if (first === resRepu?.id)
            repuCount++;
        if (first === resDemo?.id)
            demoCount++;
    }
    console.log(repuCount > demoCount ? resRepu?.id : resDemo?.id);
    fs_1.default.writeFileSync('debug.log', logContent);
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
    const M = Number(lines[0]);
    const targets = [];
    for (let i = 0; i < M; i++) {
        targets.push(lines[i + 1]);
    }
    const details = [];
    const N = Number(lines[M + 1]);
    for (let i = 0; i < N; i++) {
        details.push(lines[i + M + 2].split(' ').map(Number));
    }
    solve(M, targets, N, details);
});
//# sourceMappingURL=260813_B036.js.map