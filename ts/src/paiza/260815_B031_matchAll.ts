import fs from 'fs'
import readline from 'readline'

function solve(n: number, s: string) {
  let logContent = n + '\n'
  logContent += s + '\n'

  const findToBIdx = (s: string) => {
    for (const el of [...s.matchAll(/(?=bw+b)/g)]) {
      logContent += el.index + ' ' + s.slice(el.index).match(/bw+b/)![0] + ', '
    }
    logContent += '\n'
    return [...s.matchAll(/(?=bw+b)/g)].map((el) => el.index!)
  }

  const findToWIdx = (s: string) => {
    for (const el of [...s.matchAll(/(?=wb+w)/g)]) {
      logContent += el.index + ' ' + s.slice(el.index).match(/wb+w/)![0] + ', '
    }
    logContent += '\n'
    return [...s.matchAll(/(?=wb+w)/g)].map((el) => el.index!)
  }

  const makeTurned = (s: string, toB: number[], toW: number[]) => {
    logContent += 'call makeTurned\n'
    const res = []
    // bb
    if (s[0] === 'b' && s[s.length - 1] === 'b') {
      logContent += 'bb\n'
      res.push('b'.repeat(toB[0]! + 1))
      for (let i = 0; i < toW.length; i++) {
        res.push('b'.repeat(toW[i]! - toB[i]!))
        if (i + 1 < toB.length) res.push('w'.repeat(toB[i + 1]! - toW[i]!))
      }
      res.push('b'.repeat(s.length - toB[toB.length - 1]! - 1))
    }
    // bw
    if (s[0] === 'b' && s[s.length - 1] === 'w') {
      logContent += 'bw\n'
      res.push('b'.repeat(toB[0]! + 1))
      for (let i = 0; i < toW.length; i++) {
        res.push('b'.repeat(toW[i]! - toB[i]!))
        if (i + 1 < toW.length) res.push('w'.repeat(toB[i + 1]! - toW[i]!))
      }
      res.push('w'.repeat(s.length - toW[toW.length - 1]! - 1))
    }
    // ww
    if (s[0] === 'w' && s[s.length - 1] === 'w') {
      logContent += 'ww\n'
      res.push('w'.repeat(toW[0]! + 1))
      for (let i = 0; i < toB.length; i++) {
        res.push('w'.repeat(toB[i]! - toW[i]!))
        if (i + 1 < toW.length) res.push('b'.repeat(toW[i + 1]! - toB[i]!))
      }
      res.push('w'.repeat(s.length - toW[toW.length - 1]! - 1))
    }
    // wb
    if (s[0] === 'w' && s[s.length - 1] === 'b') {
      logContent += 'wb\n'
      res.push('w'.repeat(toW[0]! + 1))
      for (let i = 0; i < toB.length; i++) {
        res.push('w'.repeat(toB[i]! - toW[i]!))
        if (i + 1 < toW.length) res.push('b'.repeat(toW[i + 1]! - toB[i]!))
      }
      res.push('b'.repeat(s.length - toB[toB.length - 1]! - 1))
    }
    return res.join('')
  }

  let result = ''
  ;(function set(p: string) {
    const toBIdx = findToBIdx(p)
    const toWIdx = findToWIdx(p)
    result = makeTurned(p, toBIdx, toWIdx)
    if (toBIdx.length === 0 && toWIdx.length === 0) {
      result = p
      return
    }
    set(makeTurned(p, toBIdx, toWIdx))
  })(s)

  fs.writeFileSync('debug.log', logContent)

  console.log(Array.from(result).filter((n) => n === 'b').length)
  return
}

process.stdin.resume()
process.stdin.setEncoding('utf8')

const lines: string[] = [] // 文字列専用の配列
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
reader.on('line', (line: string) => {
  lines.push(line)
})

reader.on('close', () => {
  const N = Number(lines[0]!.split(' ')[0])
  const s = lines[1]!

  solve(N, s)
})
