## SQLite

SQLiteのインストール

管理者として実行
```bash
winget install SQLite.SQLite
```

確認
```
sqlite3 --version
```

残念ながらWindowsのSQLiteではタブ補完は効きません
.dbファイルはバイナリファイルなので、エディタで開いても読めません

### SQLiteを開始、終了

```
sqlite3 mydata.db

sqlite> .quit
```

### テーブル作成

#### コマンドプロンプトで直接対話モードで

```bash
CREATE TABLE temperatures (
  id INTEGER PRIMARY KEY,
  temperature INTEGER NOT NULL,
  created_at TEXT NOT NULL
);
```

#### 1回限りで済む`.sql`ファイルで実行

SQLiteでは、テーブル作成などのSQL文を .sql ファイルに書いておいて、
まとめて実行することができます。

下記の内容をcreate_temperatures.sqlで作成
```sql
CREATE TABLE temperatures (
  id INTEGER PRIMARY KEY,
  temperature INTEGER NOT NULL,
  created_at TEXT NOT NULL
);

```

コマンドプロンプトで実行

```bash
sqlite3 mydata.db < create_temperatures.sql
```

### テーブルの削除

```bash
\paiza>sqlite3 --version
3.50.4 2025-07-30 19:33:53 4d8adfb30e03f9cf27f800a2c1ba3c48fb4ca1b08b0f5ed59a4d5ecbf45e20a3 (64-bit)

\paiza>sqlite3 .\student_lists.db
SQLite version 3.50.4 2025-07-30 19:33:53
Enter ".help" for usage hints.
sqlite> .tables
student_lists  stutent_lists
sqlite> drop table stutent_lists;
sqlite> 
.tables student_lists

```

### テーブルの内容を確認

```bash
sqlite> select * from Records;
```

### テーブルの並び替えを取得

```bash
SELECT * FROM テーブル名
ORDER BY カラム名 [ASC|DESC];
```

- ORDER BY … 並び替えの指定
- ASC … 昇順（小さい順）※省略可
- DESC … 降順（大きい順）