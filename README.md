# Jobcan Manipulator

[ジョブカン](https://jobcan.ne.jp/)を操作して自動で工数登録を一括で行うことができます

## 必要環境

Mac OS  
Node v20.7.0

## install

brew tap を使って公開しました

```bash
brew tap taku3939/jobcan-manipulator
brew install jobcan-manipulator
```

chrome もしくは playwright が入っていない人はこちらも入れてください

```bash
# playwrightを導入する場合
npx -y playwright install
```

自分のログイン情報を環境変数に記入してください

| キー            | 内容                                                 |
| --------------- | ---------------------------------------------------- |
| JOBCAN_EMAIL    | ジョブカンにログインする際に使うメールアドレス       |
| JOBCAN_PASSWORD | ジョブカンにログインする際に使うパスワード           |
| JOBCAN_HEADLESS | ヘッドレスブラウザを立ち上げるかどうか(true / false) |

例) ~/.zshrc

```bash
export JOBCAN_EMAIL="sample@example.com"
export JOBCAN_PASSWORD="hogehoge"
export JOBCAN_HEADLESS="false"
```

## 実行

bin ディレクトリをパスを通すなどして次のコマンドを実行する

プロジェクトデータの取得

[工数入力のページ](https://ssl.jobcan.jp/employee/man-hour-manage)に移動して、
自分の普段入力しているプロジェクト id と taskid を取得してください。次で使います。

```bash
jobcan-manipulator projects
```

工数の自動登録

```bash
jobcan-manipulator complete <ProjectId> <TaskId>
```

## ビルド

ビルドには[Single executable applications](https://nodejs.org/api/single-executable-applications.html#single-executable-applications)という機能を使っているのでバージョンに気をつけること

```bash
npm i
./build-script.sh
```
