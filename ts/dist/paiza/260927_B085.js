"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
const DEBUG = !!process.env.DEBUG;
function solve(P) {
    if (DEBUG)
        console.log('\n\n' + P);
    /**
     *
     */
    if (P === 0) {
        console.log('0 0');
        return;
    }
    let position = 0;
    let total = 0;
    const result = [];
    /** 1 */
    for (let i = 1;; i++) {
        const next = Math.pow(-1, i + 1) * Math.ceil(i / 2);
        // if (DEBUG) console.log('i = ' + i + ' postion = ' + position)
        // if (DEBUG) console.log('next = ' + next + ' total = ' + total)
        if (Math.abs(P) <= Math.abs(next) && Math.sign(P) === Math.sign(next)) {
            result.push(total + Math.abs(P - position));
            break;
        }
        total += Math.abs(next - position);
        position = next;
        // if (DEBUG) console.log('         total = ' + total + '\n')
    }
    position = 0;
    total = 0;
    /** 2 */
    for (let i = 1;; i++) {
        const next = Math.pow(-1, i + 1) * Math.pow(2, Math.ceil(i / 2) - 1);
        // if (DEBUG) console.log('i = ' + i + ' postion = ' + position)
        // if (DEBUG) console.log('next = ' + next + ' total = ' + total)
        if (Math.abs(P) <= Math.abs(next) && Math.sign(P) === Math.sign(next)) {
            result.push(total + Math.abs(P - position));
            break;
        }
        total += Math.abs(next - position);
        position = next;
        // if (DEBUG) console.log('         total = ' + total + '\n')
    }
    console.log(result.join(' '));
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
    const P = Number(lines[0]);
    solve(P);
});
//# sourceMappingURL=260927_B085.js.map