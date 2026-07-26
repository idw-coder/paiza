# PHP 関数リファレンス

## 文字列分割

### explode() vs str_split()

| 関数 | 用途 | 例 |
| --- | --- | --- |
| `explode($delimiter, $str)` | 区切り文字で分割 | `explode(",", "a,b,c")` → `["a","b","c"]` |
| `str_split($str, $length)` | 固定長で分割（デフォルト1文字） | `str_split("abc")` → `["a","b","c"]` |

**注意点：**
- `explode('', $input)` は PHP 8.1 以降でエラーになる（空文字列では分割不可）
- `fgets()` で読み取った文字列には改行が含まれるため、`trim()` で除去する
- 複数桁の数値を一桁ずつの配列にするには `str_split()` を使う

---

## 配列操作

### count()

- 配列の要素数を返す
- 空配列の場合は `0` を返す
- 文字列を渡すと `1` を返す

---

## 配列の種類

詳しいビジュアル解説 → [PHP 配列の違い（HTML）](./php_arrays_visual.html)
