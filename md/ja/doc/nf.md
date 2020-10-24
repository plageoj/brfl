## のんぷろふぉんと
ひらがなの入出力ができるようになるスイートです。必要なファイルのみダウンロードしてお使いください。

#### はじめにお読みください
のんぷろふぉんとでは字形を RAM DATA FILE 領域に保存しています。
この領域は使用前にサイズを指定しなければいけません。
`TEXT` モード→ `Rfile` → `Init` より、ファイル名を `N.F` として確保してください。
ファイルサイズは 662B が必要です。

---

### のんぷろふぉんと でざいなー
のんぷろふぉんとの字形定義ファイルを作成するためのプログラムです。
転送ができない方は、このプログラムを使ってちまちまと下の字形データを打ち込んでいくことになります。
字形を変えたい時にもお使いください。

### のんぷろふぉんと でーたー
字形定義ファイルです。`GPRINT` 関数で使える形式の16進数がキャラクターコード順に配列されています。

### のんぷろふぉんと えんじん
のんぷろふぉんと向けの C 言語のヘッダファイル、BASIC 向けのサブルーチンです。単体では動作しません。
C ではインクルードしてお使いください。BASIC では、このソースをプログラムの先頭に追加してください。

どちらの言語で使う場合にも、プログラム中での設定と実行時の初期化が必要です。
README をお読みいただき、正しくご利用ください。