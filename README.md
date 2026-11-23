# chrome-extensions

自作の Chrome 拡張機能をまとめたリポジトリです。

## ディレクトリ構成

```
chrome-extensions/
  ├─ extensions/
  │  └─ page-info-copy/
  │     ├─ manifest.json
  │     ├─ popup.html
  │     ├─ popup.js
  │     ├─ popup.css
  │     └─ icons/
  └─ README.md
```

各拡張機能は `extensions/` 内の専用フォルダーに置きます。Chromeに読み込むときは、対象拡張機能のフォルダーを指定してください。
