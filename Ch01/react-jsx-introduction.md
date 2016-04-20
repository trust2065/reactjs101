# JSX 入門教學指南 
## 前言
根據 React 官方定義，React 是一個構建使用者介面的 JavaScritp Library。
過去一段時間，我們被灌輸了許多前端分離的觀念，HTML 掌管內容結構、CSS 負責外觀樣式，JavaScript 主管邏輯互動，千萬不要混在一塊。然而，在 React 世界裡，所有事物都是 以 Component 為基礎，而在撰寫 React Component 時我們通常會使用 [JSX](https://facebook.github.io/jsx/) 的方式來提升程式撰寫效率。事實上，JSX 並非一種全新的語言，而是一種語法糖（Syntatic Sugar），一種語法類似 XML 的 ECMAScript 語法擴充。在 JSX 中 HTML 和組建這些元素標籤的程式碼有緊密的關係。因此你可能要熟悉一下以 Component 為單位的思考方式。此外，React 和 JSX 的思維在於善用 JavaScript 的強大能力，放棄蹩腳的模版語言，這和 Angular 強化 HTML 的理念也有所不同。當然 JSX 並非強制使用，你也可以選擇不使用，因為最終 JSX 的內容會轉化成 JavaScript。不過等你閱讀完接下來的內容，你或許會開始認真考慮使用 JSX 的語法。

## 一、使用 JSX 的好處

### 1. 提供更加語意化且易懂的標籤
由於 JSX 類似 XML 的語法，讓一些非開發人員也更容易看懂，且沒有更改 JavaScript 語意。

一般來說我們想做一個回饋表單，使用 HTML 寫法通常會長這樣：

```
<form class="messageBox">
	<textarea></teextarea>
	<button type="submit"></button>
</from>
```

使用 JSX（之後會再轉成原生 JavaScript）：

```
<MessageBox />
```

是不是感覺更易讀易懂？當 Component 組成越來越複雜時，若使用 JSX 將可以讓整個結構更加直觀，可讀性較高。

### 2. 更加直觀

使用 JSX：

```
class HelloMessage extends React.Compoent {
  render() {
    return <div>Hello {this.props.name}</div>;
  }
};

ReactDOM.render(<HelloMessage name="John" />, document.getElementById('mountNode')
);

```

不使用 JSX：

```
"use strict";

class HelloMessage extends React.Compoent {
  constructor(props) {
  	super(props);
  }
  render() {
    return React.createElement(
      "div",
      null,
      "Hello ",
      this.props.name
    );
  }
};

// React.createElement(元件/HTML標籤, 元件屬性，以物件表示, 子元件)
ReactDOM.render(React.createElement(HelloMessage, { name: "John" }), document.getElementById('mountNode');
);
```

### 3. 結合原生 JavaScript 語法
結合 JavaScript ，可以釋放 JavaScript 本身能力：

```
const lists = ['JavaScript', 'Java', 'Node', 'Python'];

class HelloMessage extends React.Compoent {
  render() {
  	return (
    <ul>
      {lists.map((result) => {
        return <li>{result}</li>;
      })}
    </ul>);
  }
}
```

## 二、JSX 用法摘要
### 1. 環境設定與使用方式
JSX 通常有兩種使用方式：

1. 使用 `browserify` 或 `webpack` 等 CommonJS 方式整合 `babel` 預處理
2. 於瀏覽器端做解析

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <script src="build/react.js"></script>
    <script src="build/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

載入方式：

- 內嵌

```
    <script type="text/babel">
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
```

- 從外部引入 `<script type="text/jsx" src="main.jsx"></script>` 


### 2. 標籤用法
JSX 標籤非常類似 XML ，可以直接書寫。Component 命名首字大寫：
```
class HelloMessage extends React.Compoent {
  render() {
  	return (
    <ul>
      {lists.map((result) => {
        return <li>{result}</li>;
      })}
    </ul>);
  }
}
```

### 3. 轉換成 JavaScript 
規則：

```
React.createElement(
	string/ReactClass, // 表示 HTML 元素或是 React Component
	[object props], // 屬性值，用物件表示
	[children] // 接下來參數皆為元素子元素
)
```

解析前（特別注意在 JSX 中使用 JavaScript 表達式時使用 {} 括起，如下方範例的 `text`）：

```
var text = 'Hello React';
<h1>{text}</h1>
```

解析完後：

```
var text = 'Hello React';
React.createElement("h1", null, "Hello React!");
```

### 4. 註解
與 JavaScript 一樣使用 `//` 和 `/**/`：

```
// 單行註解

/*
	多行註解
*/

var content = (
  <List>
      {/* 若是在子元件註解要加 {}  */}
      <Item
        /* 多行
           註解
           喔 */
        name={window.isLoggedIn ? window.name : ''} // 單行註解
      />
  </List>
);
```

### 5. 屬性


### 6. 擴展屬性
在 ES6　中使用 `...` 

### 7. 自定義屬性
`data-`


### 8. 顯示 HTML
HTML 裡的 class 在 JSX 裡要寫成 className，因為 class 在 JS 裡是保留關鍵字。同理某些屬性例如： for 要寫成 htmlFor。

```
<div dangerouslySetInnerHTML={{__html: 'cc &copy; 2016'}} />
```

### 9. 樣式使用
```
style={[styles.]}
```

### 10. 事件處理

```
onClick={this.onBtn}
```

