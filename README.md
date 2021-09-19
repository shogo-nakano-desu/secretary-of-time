## TL;DR

秘書が自分の代わりに打刻をしてくれます。

## How to use

＊ node.js と yarn はインストールされている前提で記述します。本プロジェクト作成時のバージョンはそれぞれ以下です。<br>
node.js : `14.17.6`
yarn : `1.22.11`

1. 本プロジェクトをクローンします。
2. `yarn`コマンドで、package.json のモジュールをインストールします。
3. root ディレクトリに env.ts ファイルを作成し、以下内容でファイルを作成します。

```
export const kingoftimeConfig = {
  id: "ifhoge",
  pass: "passhoge",
  url: "king of time login url",
};
```

4. 必要であれば、src/endtime.ts に設定されている勤務終了時刻を変更してください。
5. `yarn start`コマンドでスクリプトを実行します。

## disclaimer

本プロジェクトはあくまでも Selenium の素振りで作成したものであり、スクリプトの利用を推奨するものではございません。
