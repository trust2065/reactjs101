# ReactJS 與 Component 入門介紹

## 前言
在上一個章節中我們快速的學習了 React 開發環境建置和 Webpack 入門。接下來我們將更進一步了解 React 的其他特性。React 原本是 Facebook 自己內部使用的開發工具，但卻是一個目標遠大的一個專案，自從 2013 年開源後周邊的生態系更是蓬勃發展。

## ReactJS 簡介
1. 基於元件化思考
2. 宣告式 UI 設計
3. 單項資料流流
4. 使用 Virtual DOM
5. 狀態機

props 定義後就不能修改
state 隨著使用者互動而改變

## 元件（Component）簡介
元件化是網頁前端開發的聖杯，許多開發者最希望的就是可以最大化重複使用（Reuse）過去所寫的程式碼，不要重複造輪子。在 React 中元件是一切的基礎，讓開發應用程式就好像在堆積木一樣。然而對於過去習慣模版式開發的前端工程師來說，短時間要轉換成元件化思考模式並不容易。一個比較好的方式就是訓練自己看到不同的網頁或應用程式時，強迫自己將看到的頁面切成一個個元件。相信過了一段時間後，就比較容易習慣元件化的思考方式。

以下是一般 Component 撰寫的主要兩種方式：

```
class MyComponent extends React.Component {
	render() {
		return (
			<dib>MyComponent</div>
		);
	}
}
```

```
const MyComponent = () => (
	<dib>MyComponent</div>
);
```

## Component 生命週期
Component 生命週期分為三種狀態：
1. Mounting：已被插入真實 DOM
2. Updating：正在被重新渲染
3. Unmounting：已移出真實 DOM

## Virtual DOM
不會立即更新到

## 資料單向流
單向資料流，透過 props 由父元素上往下傳遞
this.props.name

this.props.children 表示所有子節點

## PropTypes 防呆裝置

## 獲取真實的 DOM 資料
ref

## 你的第二個 Component 

```js
class MyComponent extends React.Component {
	render() {
		return (
			<div>Hello, World!</div>
		);
	}
}

ReactDOM.render(<MyComponent/>, document.getElmentById('app'));
```

```js
const MyComponent = () => (
	<div>Hello, World!</div>
);

ReactDOM.render(<MyComponent/>, document.getElmentById('app'));
```

## 延伸閱讀
1. [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
