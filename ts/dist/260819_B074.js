"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
function solve(n, list) {
    let logContent = n + '\n';
    logContent += 'id  repId  nice  total' + '\n';
    list.forEach((c) => (c.isChecked = false));
    logContent +=
        list
            .map((c) => {
            return c.id + '    ' + c.replyId + '    ' + c.nice + '    ' + c.isChecked;
        })
            .join('\n') + '\n\n';
    // すべて返信いいねを加算をするまでループ
    while (!list.every((l) => l.isChecked === true)) {
        for (const c of list) {
            if (c.isChecked)
                continue;
            // ループ対象中のコメントに対していいねを加算していない返信コメントがない場合は、返信先にいいね加算
            if (list.every((l) => l.isChecked || l.replyId !== c.id)) {
                if (c.replyId !== 'None')
                    list.find((l) => l.id === c.replyId).nice += c.nice;
                c.isChecked = true;
            }
        }
    }
    logContent +=
        list
            .map((c) => {
            return c.id + '    ' + c.replyId + '    ' + c.nice + '    ' + c.isChecked;
        })
            .join('\n') + '\n';
    fs_1.default.writeFileSync('debug.log', logContent);
    console.log(list.sort((a, b) => b.nice - a.nice || a.id - b.id)[0]?.id);
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
    const [N] = lines[0].split(' ').map((n) => Number(n));
    const commentList = [];
    for (let i = 1; i <= N; i++) {
        commentList.push({
            id: Number(lines[i].split(' ')[0]),
            replyId: lines[i].split(' ')[1] === 'None' ? 'None' : Number(lines[i].split(' ')[1]),
            nice: Number(lines[i].split(' ')[2]),
        });
    }
    solve(N, commentList);
});
//# sourceMappingURL=260819_B074.js.map