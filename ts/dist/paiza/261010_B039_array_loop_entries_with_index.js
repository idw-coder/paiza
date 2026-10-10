"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
function solve(n, s, list) {
    console.error('\n\n' + s + ' ' + n);
    // console.table(list)
    /**
     * 1 ≦ n ≦ 50
     * 1 ≦ s ≦ n
     * 0 ≦ x_i < a_i ≦ 200 (1 ≦ i ≦ n)
     * 0 ≦ y_i < b_i ≦ 200 (1 ≦ i ≦ n)
     * ある水たまりが他のある水たまりに完全に含まれることはない。
     * すなわち、「x_i ≦ x_j かつ a_j ≦ a_i かつ y_i ≦ y_j かつ b_j ≦ b_i」となる
     * i, j のペア (i ≠ j) は存在しない
     *
     * 2 つの水たまりが共通部分をもつとき、これらは重なっているとみなします。
     * 特に、2 つの水たまりが辺と辺で接する場合や、頂点と頂点で接する場合にも重なっているとみなす
     */
    // start ある限り
    while (list.find((item) => item.state === 'start')) {
        for (const [aId, a] of list.entries()) {
            // a が start でない場合は見ない
            if (a.state !== 'start')
                continue;
            for (const [bId, b] of list.entries()) {
                // b が inaccessible でない場合は見ない
                if (aId === bId || b.state !== 'inaccessible')
                    continue;
                // console.error(a, b)
                if (isConnectedReact(a, b)) {
                    list[bId].state = 'start';
                }
            }
            list[aId].state = 'looked';
        }
    }
    list.forEach((v, i) => {
        if (v.state === 'looked')
            console.log(i + 1);
    });
    /**
     * 2つの長方形が重なっているか
     */
    function isConnectedReact(a, b) {
        const aLineList = [
            { a1: { x: a.lt.x, y: a.lt.y }, a2: { x: a.rb.x, y: a.lt.y } },
            { a1: { x: a.lt.x, y: a.rb.y }, a2: { x: a.rb.x, y: a.rb.y } },
            { a1: { x: a.lt.x, y: a.lt.y }, a2: { x: a.lt.x, y: a.rb.y } },
            { a1: { x: a.rb.x, y: a.lt.y }, a2: { x: a.rb.x, y: a.rb.y } },
        ];
        const bLineList = [
            { b1: { x: b.lt.x, y: b.lt.y }, b2: { x: b.rb.x, y: b.lt.y } },
            { b1: { x: b.lt.x, y: b.rb.y }, b2: { x: b.rb.x, y: b.rb.y } },
            { b1: { x: b.lt.x, y: b.lt.y }, b2: { x: b.lt.x, y: b.rb.y } },
            { b1: { x: b.rb.x, y: b.lt.y }, b2: { x: b.rb.x, y: b.rb.y } },
        ];
        for (const aLineItem of aLineList) {
            for (const bLineItem of bLineList) {
                if (isConnectedLine(aLineItem.a1, aLineItem.a2, bLineItem.b1, bLineItem.b2))
                    return true;
            }
        }
        return false;
    }
    // console.error(
    //   'isConnectedReact ' +
    //     isConnectedReact(
    //       { lt: { x: 0, y: 0 }, rb: { x: 3, y: 3 } },
    //       { lt: { x: 3, y: 1 }, rb: { x: 4, y: 2 } }
    //     )
    // )
    /**
     * 2つの線分が当たっているか
     * 1.x < 2.x 1.y < 2.y
     */
    function isConnectedLine(a1, a2, b1, b2) {
        // ┃┃
        if (a1.x === a2.x && b1.x === b2.x && a1.x === b1.x) {
            if ((a1.y <= b1.y && b1.y <= a2.y) || (a1.y <= b2.y && b2.y <= a2.y))
                return true;
        }
        else if (a1.y === a2.y && b1.y === b2.y && a1.y === b1.y) {
            if ((a1.x <= b1.x && b1.x <= a2.x) || (a1.x <= b2.x && b2.x <= a2.x))
                return true;
        }
        // ╋
        else if (a1.x === a2.x && b1.y === b2.y) {
            if (b1.x <= a1.x && a1.x <= b2.x && a1.y <= b1.y && b1.y <= a2.y)
                return true;
        }
        else if (a1.y === a2.y && b1.x === b2.x) {
            if (a1.x <= b1.x && b1.x <= a2.x && b1.y <= a1.y && a1.y <= b2.y)
                return true;
        }
        return false;
    }
    // console.error(
    //   '┃┃ ' +
    //     isConnectedLine({ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 2, y: 4 }) +
    //     '\n' +
    //     '╋  ' +
    //     isConnectedLine({ x: 2, y: 0 }, { x: 2, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 1 })
    // )
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
    const [n, s] = [Number(lines[0]), Number(lines[1])];
    const list = Array.from({ length: n }, (_, idx) => {
        return {
            lt: { x: Number(lines[idx + 2].split(' ')[0]), y: Number(lines[idx + 2].split(' ')[1]) },
            rb: { x: Number(lines[idx + 2].split(' ')[2]), y: Number(lines[idx + 2].split(' ')[3]) },
            state: idx + 1 === s ? 'start' : 'inaccessible',
        };
    });
    solve(n, s, list);
});
//# sourceMappingURL=261010_B039_array_loop_entries_with_index.js.map