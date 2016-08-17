
# CDN-based 環境設定

![一看就懂的 React 開發環境建置與 Webpack 入門教學](/img/kdchang/react.png "一看就懂的 React 開發環境建置與 Webpack 入門教學")
使用 CDN-based 的開發方式缺點是較難維護我們的程式碼（當引入函式庫一多就會有很多 `<script/>`）且會容易遇到版本相容性問題，不太適合開發大型應用程式，但因為簡單易懂，適合教學上使用。

以下是 React [官方首頁的範例](https://facebook.github.io/react/index.html)，以下使用 `React v15.2.1`：
0. 理解 `React` 是 `Component` 導向的應用程式設計
1. 引入 `react.js`、`react-dom.js`（react 0.14 後將 react-dom 從 react 核心分離，更符合 react 跨平台抽象化的定位）以及 `babel-core-browser` 版 script（可以想成 `babel` 是翻譯機，翻譯瀏覽器看不懂的 `JSX` 或 `ES6+` 語法成為瀏覽器看的懂得的 `JavaScript`）。事實上，JSX 並非一種全新的語言，而是一種語法糖（Syntatic Sugar），一種語法類似 XML 的 ECMAScript 語法擴充。若讀者不熟悉的話可以參考筆者另一篇文章：[一看就懂的 JSX 簡明入門教學指南](http://blog.techbridge.cc/2016/04/21/react-jsx-introduction/)
2. 在 `<body>` 撰寫 React Component 要插入（mount）的地方：`<div id="example"></div>`
3. 透過 `babel` 進行語言翻譯 `React JSX` 語法，`babel` 會將其轉為瀏覽器看的懂得 `JavaScript`。其代表意義是：`ReactDOM.render(欲 render 的 Component 或 HTML 元素, 欲插入的位置)`。所以我們可以在瀏覽器上打開我們的 `hello.html`，就可以看到 `Hello, world!` 。That's it，我們第一個 `React` 應用程式就算完成了！

```html hello.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <!-- 以下引入 react.js, react-dom.js（react 0.14 後將 react-dom 從 react 核心分離，更符合 react 跨平台抽象化的定位）以及 babel-core browser 版 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.2.1/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
  </head>
  <body>
    <!-- 這邊的 id="example" 的 <div> 為 React Component 要插入的地方 -->
    <div id="example"></div>
    <!-- 以下就是包在 babel（透過進行語言翻譯）中的 React JSX 語法，babel 會將其轉為瀏覽器看的懂得 JavaScript -->
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

在瀏覽器瀏覽最後成果：

![一看就懂的 React 開發環境建置與 Webpack 入門教學](/img/kdchang/hello-world.png "一看就懂的 React 開發環境建置與 Webpack 入門教學")
