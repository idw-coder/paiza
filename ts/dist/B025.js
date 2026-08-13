"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readline_1 = __importDefault(require("readline"));
function calc(C_1, C_3, arr) {
    let logContent = '';
    // ファイル名を取得
    const filename = path_1.default.basename(__filename);
    logContent += '———————— ' + filename + ' ———————\n';
    logContent += C_1 + '\n';
    logContent += C_3 + '\n';
    logContent += arr + '\n';
    logContent += '———————\n';
    const positionArr = [];
    logContent += positionArr + '\n';
    logContent += '———————\n';
    for (let i = 0; i < arr.length; i++) {
        positionArr[arr[i] - 1] = i + 1;
    }
    for (let i = 0; i < C_1; i++) {
        if (positionArr[i] === undefined)
            positionArr[i] = null;
    }
    logContent += positionArr + '\n';
    logContent += '———————\n';
    const jump = (arr) => {
        for (let i = 1; i <= arr.filter((item) => item !== null).length; i++) {
            // iのうさぎの場所
            const targetIndex = arr.indexOf(i);
            logContent += 'i' + i + ' tagetIndex ' + targetIndex + '\n';
            logContent += positionArr + '\n';
            if (targetIndex === -1) {
                logContent += 'continue\n';
                continue;
            }
            for (let k = targetIndex + 1; k < targetIndex + positionArr.length; k++) {
                if (k < positionArr.length && positionArr[k] === null) {
                    positionArr[k] = i;
                    logContent += 'i' + i + ' k' + k + ' moved ' + targetIndex + ' to ' + k + '\n';
                    positionArr[targetIndex] = null;
                    logContent += positionArr + '\n';
                    break;
                }
                else if (k >= positionArr.length && positionArr[k - positionArr.length] === null) {
                    positionArr[k - positionArr.length] = i;
                    logContent += 'i' + i + ' k' + k + ' moved ' + targetIndex + ' to ' + (k - positionArr.length) + '\n';
                    positionArr[targetIndex] = null;
                    logContent += positionArr + '\n';
                    break;
                }
            }
            logContent += '———————\n';
        }
    };
    logContent += '———————\n';
    for (let i = 0; i < C_3; i++) {
        logContent += 'start' + i + '\n';
        jump(positionArr);
        logContent += 'end' + i + '\n' + positionArr + '\n——————————————\n';
    }
    logContent += '———————\n';
    for (let i = 1; i <= arr.length; i++) {
        console.log(positionArr.indexOf(i) + 1);
    }
    fs_1.default.writeFileSync('debug.log', logContent);
    return;
}
module.exports = { calc };
// テスト時は標準入力処理をスキップ
if (require.main === module) {
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
        const [C_1, C_2, C_3] = lines[0].split(' ').map(Number);
        const arr = lines.slice(1, C_2 + 1).map(Number);
        calc(C_1, C_3, arr);
    });
}
//# sourceMappingURL=B025.js.map