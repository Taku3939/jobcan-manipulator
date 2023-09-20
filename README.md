# Jobcan Manipulator

[ジョブカン](https://jobcan.ne.jp/)を操作して自動で工数登録を行うことができます

## 使い方

[工数入力のページ](https://ssl.jobcan.jp/employee/man-hour-manage)に移動して、F12 で開発者ツールを開き、
自分の普段入力しているプロジェクト id と taskid を取得します。

.env に情報を記入し次のコマンドを実行すると、今月の工数を一括で入力できます。

```bash
npm i
./bin/jobcan complete
```
