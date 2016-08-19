# ReactJS 與 Component 設計入門介紹

## 前言
在上一個章節中我們快速學習了 React 開發環境建置和 Webpack 入門。接下來我們將更進一步了解 React 和 Component 設計時需注意的幾個重要特性。

## ReactJS 特性簡介
React 原本是 Facebook 自己內部使用的開發工具，但卻是一個目標遠大的一個專案：`Learn once, write anywhere`。自從 2013 年開源後周邊的生態系更是蓬勃發展。ReactJS 的出現讓前端開發有許多革新性的思維出現，其中有幾個重要特性值得我們去探討：

1. 基於元件（Component）化思考
2. 宣告式（Declarative）UI 設計
3. 使用 Virtual DOM
4. Component 就像個狀態機（State Machine）
5. 單向資料流（Unidirectional Data Flow）
6. 元件也有有生命週期（Life Cycle）
7. 在 JavaScript 裡寫 CSS：Inline Style 

## 基於元件（Component）化思考
在 React 的世界中最基本的單元為元件（Component），每個元件可以包含一個以上的子元件（也可以為單獨封裝 HTML 的元件），也可以依照需求組裝成一個組合式的（Composable）元件，因此具有封裝（encapsulation）、關注點分離 (Separation of Concerns)、複用 (Reuse) 、組合 (Compose) 等特性。

元件化是網頁前端開發的聖杯，許多開發者最希望的就是可以最大化重複使用（Reuse）過去所寫的程式碼，不要重複造輪子。在 React 中元件是一切的基礎，讓開發應用程式就好像在堆積木一樣。然而對於過去習慣模版式開發的前端工程師來說，短時間要轉換成元件化思考模式並不容易。一個比較好的方式就是訓練自己看到不同的網頁或應用程式時，強迫自己將看到的頁面切成一個個元件。相信過了一段時間後，就比較容易習慣元件化的思考方式。

以下是一般 Component 撰寫的主要兩種方式：

1. 使用 ES6 的 Class

	```javascript
	class MyComponent extends React.Component {
		render() {
			return (
				<div>Hello, World!</div>
			);
		}
	}

	ReactDOM.render(<MyComponent/>, document.getElmentById('app'));
	```

2. 使用 Funtional Component 寫法

	```javascript
	const MyComponent = () => (
		<div>Hello, World!</div>
	);

	ReactDOM.render(<MyComponent/>, document.getElmentById('app'));
	```

## 宣告式（Declarative）UI 設計

## 使用 Virtual DOM
不會立即更新到

獲取真實的 DOM 資料

Refs and findDOMNode()

## Component 生命週期

Component 生命週期分為三種狀態：

1. Mounting：已被插入真實 DOM
2. Updating：正在被重新渲染
3. Unmounting：已移出真實 DOM

## Component 就像個狀態機（State Machine）
always rerender

## 單向資料流（Unidirectional Data Flow）
單向資料流，透過 props 由父元素上往下傳遞
this.props.name

this.props.children 表示所有子節點


## 元件就像人有生命週期（Life Cycle）

## 在 JavaScript 裡寫 CSS：Inline Style

## 延伸閱讀
1. [React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)
