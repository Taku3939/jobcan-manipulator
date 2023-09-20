# Jobcan Manipulator

[ジョブカン](https://jobcan.ne.jp/)を操作して自動で工数登録を一括で行うことができます

## 必要環境

Mac OS  
Node v20.7.0

## セットアップ

[工数入力のページ](https://ssl.jobcan.jp/employee/man-hour-manage)に移動して、projects コマンドで
自分の普段入力しているプロジェクト id と taskid を取得します。(HEADLESS を false にすることでブラウザの実行状況を確認できます)

リリースからプロジェクトをダウンロードして.env に情報を記入する

| キー              | 内容                                                                         |
| ----------------- | ---------------------------------------------------------------------------- |
| JOBCAN_EMAIL      | ジョブカンにログインする際に使うメールアドレス                               |
| JOBCAN_PASSWORD   | ジョブカンにログインする際に使うパスワード                                   |
| JOBCAN_PROJECT_ID | ジョブカンで工数入力する際に選択する project_id(projects コマンドで確認する) |
| JOBCAN_TASK_ID    | ジョブカンで工数入力する際に選択する task_id (projects コマンドで確認する)   |
| HEADLESS          | ヘッドレスブラウザを立ち上げるかどうか(true / false)                         |

## 実行

bin ディレクトリをパスを通すなどして次のコマンドを実行する

プロジェクトデータの取得

```bash
jobcan projects
```

工数の自動登録

```bash
jobcan complete
```

## ビルド

ビルドには[Single executable applications](https://nodejs.org/api/single-executable-applications.html#single-executable-applications)という機能を使っているのでバージョンに気をつけること

```bash
npm i
./build-script.sh
```
