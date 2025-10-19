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