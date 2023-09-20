# Jobcan Manipulator

[ジョブカン](https://jobcan.ne.jp/)を操作して自動で工数登録を一括で行うことができます

## 必要環境

Mac OS  
Node v20.7.0

## install

brew tap を使って公開しました

```
brew tap taku3939/jobcan-manipulator
brew install jobcan-manipulator
```

## セットアップ

[工数入力のページ](https://ssl.jobcan.jp/employee/man-hour-manage)に移動して、projects コマンドで
自分の普段入力しているプロジェクト id と taskid を取得します。(JOBCAN_HEADLESS を false にすることでブラウザを確認できます)

取得した情報を環境変数に記入してください

| キー              | 内容                                                                         |
| ----------------- | ---------------------------------------------------------------------------- |
| JOBCAN_EMAIL      | ジョブカンにログインする際に使うメールアドレス                               |
| JOBCAN_PASSWORD   | ジョブカンにログインする際に使うパスワード                                   |
| JOBCAN_PROJECT_ID | ジョブカンで工数入力する際に選択する project_id(projects コマンドで確認する) |
| JOBCAN_TASK_ID    | ジョブカンで工数入力する際に選択する task_id (projects コマンドで確認する)   |
| JOBCAN_HEADLESS   | ヘッドレスブラウザを立ち上げるかどうか(true / false)                         |

例) ~/.zshrc

```bash
#ログイン情報
export JOBCAN_EMAIL="sample@example.com"
export JOBCAN_PASSWORD="hogehoge"

#工数入力の情報
export JOBCAN_PROJECT_ID="11"
export JOBCAN_TASK_ID="111"

export JOBCAN_HEADLESS="true"
```

## 実行

bin ディレクトリをパスを通すなどして次のコマンドを実行する

プロジェクトデータの取得

```bash
jobcan-manipulator projects
```

工数の自動登録

```bash
jobcan-manipulator complete
```

## ビルド

ビルドには[Single executable applications](https://nodejs.org/api/single-executable-applications.html#single-executable-applications)という機能を使っているのでバージョンに気をつけること

```bash
npm i
./build-script.sh
```
