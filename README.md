# paiza 学習リポジトリ

paiza の問題を解きながら、データ構造とアルゴリズムを学習するリポジトリ。

- AI を使用せずにコーディングスキルをあげる
- データ構造とアルゴリズムは paiza A ランクくらいの複雑さで実務では十分

---

## チートシート

解いている最中に引くもの。

| ドキュメント | 内容 |
| --- | --- |
| [変数名チートシート](./docs/code_review.md) | 役割ごとに固定する変数名の一覧（入力、ループ、状態、集計、グラフ、DP など） |

## 実行ガイド

環境まわりで詰まったときに読むもの。

| ドキュメント | 内容 |
| --- | --- |
| [JavaScript 実行ガイド](./docs/js_execution.md) | スクリプト実行、Jest セットアップ・テスト |
| [PHP 実行ガイド](./docs/php_execution.md) | 標準入力、ファイル入力、各環境での実行方法 |
| [SQL サマリー](./docs/sql_summary.md) | SQLite のセットアップ・基本操作 |

---

## ディレクトリ構成

| パス | 内容 |
| --- | --- |
| `ts/src/` | TypeScript の解答（`YYMMDD_問題番号.ts`） |
| `ts/dist/` | `tsc` の出力先 |
| `js/` | JavaScript の解答 |
| `docs/` | チートシート・実行ガイド |
| `input01.txt`, `input02.txt` | 動作確認用の入力例 |

## よく使うコマンド

```bash
# TypeScript をビルドせず直接実行（動作確認はこれが速い）
npx tsx ts/src/260813_B036.ts < input01.txt

# 提出前に型チェックを通してビルド
npm run build
node ts/dist/260813_B036.js < input01.txt

# 書きながら自動ビルド
npm run watch

# JavaScript をそのまま実行
node js/260813_B060.js < input01.txt

# テスト・整形
npm test
npm run lint:fix
npm run format
```
