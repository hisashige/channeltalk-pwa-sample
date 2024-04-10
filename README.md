# channeltalk-pwa-sample

channel talk の管理画面からメッセージを発射した際に、PWA に PUSH 通知を送るサンプル。

## 構成

- web
  - PWA のサンプル
  - react / vite
  - channel talk のチャット画面をタグで読み込んでいる
  - チャット画面が boot された時に、ローカルストレージに user 情報を保存。
  - チャットが作られた際に、通知許可があるかつ、channel talk の user 情報を保持していれば、firestore に PUSH 通知用の情報を保存する。
- api
  - channel talk の webhook に登録するための API
  - NestJS
  - webhook でトリガーされ、body 情報の entity.personType が manager のイベントが飛んできたら、firestore から userId を元に token を取得する
  - token を元に PUSH 通知を送る
