# Jobcan Manipulator

[ジョブカン](https://jobcan.ne.jp/)を操作して自動で工数登録を行うことができます

## 必要環境

Mac OS
Node v18.16.0

## 使い方

[工数入力のページ](https://ssl.jobcan.jp/employee/man-hour-manage)に移動して、F12 で開発者ツールを開き、
自分の普段入力しているプロジェクト id と taskid を取得します。(HEADLESS を false にすることでブラウザの実行状況を確認できます)

リリースからプロジェクトをダウンロードして.env に情報を記入する
bin ディレクトリをパスを通すなどして次のコマンドを実行する

## 実行

```bash
./jobcan complete
```

## ビルド

```bash
npm i
npm run build
```
