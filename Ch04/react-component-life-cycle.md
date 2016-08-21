# React Component 規格與生命週期（Life Cycle）

![React Component 規格與生命週期](./images/react-lifecycle.png)

## 前言
經過前面的努力相信目前讀者對於用 React 開發一些簡單的元件（Component）已經有一定程度的掌握了，現在我們將更細部探討 React Component 的規格和其生命週期。

## React Component 規格
若讀者還有印象的話，我們前面介紹 React 特性時有描述 React 的主要撰寫方式有兩種：一種是使用 ES6 Class，另外一種是 Stateless Components，使用 Funtional Component 的寫法，單純渲染 UI。這邊再幫大家複習一下上一個章節的簡單範例：

1. 使用 ES6 的 Class（可以進行比較複雜的操作和元件生命週期的控制，相對於 stateless components 耗費資源）

	```javascript
	//  注意元件開頭第一個字母都要大寫
	class MyComponent extends React.Component {
		// render 是 Class based 元件唯一必須的方法（method）
		render() {
			return (
				<div>Hello, {this.props.name}</div>
			);
		}
	}

	// PropTypes 驗證，若傳入的 props type 不符合將會顯示錯誤
	MyComponent.propTypes = {
		name: React.PropTypes.string,
	}

	// Prop 預設值，若對應 props 沒傳入值將會使用 default 值，為每個實例化 Component 共用的值
	MyComponent.defaultProps = {
	 	name: '', 
	}

	// 將 <MyComponent /> 元件插入 id 為 app 的 DOM 元素中
	ReactDOM.render(<MyComponent name="Mark"/>, document.getElmentById('app'));
	```

2. 使用 Funtional Component 寫法（單純地 render UI 的 stateless components，沒有內部狀態、沒有實作物件和 ref，沒有生命週期函數。若非需要控制生命週期的話建議多使用 stateless components 獲得比較好的效能）

	```javascript
	// 使用 arror function 來設計 Funtional Component 讓 UI 設計更單純（f(D) => UI），減少副作用（side effect）
	const MyComponent = (props) => (
		<div>Hello, {props.name}</div>
	);

	// PropTypes 驗證，若傳入的 props type 不符合將會顯示錯誤
	MyComponent.propTypes = {
		name: React.PropTypes.string,
	}

	// Prop 預設值，若對應 props 沒傳入值將會使用 default 值
	MyComponent.defaultProps = {
		name: '', 
	}
	
	// 將 <MyComponent /> 元件插入 id 為 app 的 DOM 元素中
	ReactDOM.render(<MyComponent name="Mark"/>, document.getElmentById('app'));
	```

值得留意的是在 ES6 Class 中 `render()` 是唯一必要的方法（但要注意的是請保持 `redner()` 的純粹，不要在裡面進行 `state` 修改或是使用非同步方法和瀏覽器互動，若需非同步互動請於 `componentDidMount()` 操作），而 Funtional Component 目前允許 `return null` 值。 喔對了，在 ES6 中也不支援 `mixins` 複用其他元件的方法了。

## React Component 生命週期
React Component，就像人會有生老病死一樣有生命週期。一般而言 Component 有以下三種生命週期的狀態：

1. Mounting：已插入真實的 DOM
2. Updating：正在被重新渲染
3. Unmounting：已移出真實的 DOM

針對 Component 的生命週期狀態 React 也有提供對應的處理方法：

1. Mounting
	- componentWillMount()
	- componentDidMount()
2. Updating
	- componentWillReceiveProps(object nextProps)：已載入元件收到新的參數時呼叫
	- shouldComponentUpdate(object nextProps, object nextState)：元件判斷是否重新渲染時呼叫，起始不會呼叫除非呼叫 forceUpdate()
	- componentWillUpdate(object nextProps, object nextState)
	- componentDidUpdate(object prevProps, object prevState)
3. Unmounting
	- componentWillUnmount()

特殊處理的函數 `shouldComponentUpdate`，目前預設 `return true`。若你想要優化效能可以自己編寫判斷方式，若採用 `immutable` 可以使用 `nextProps === this.props` 比對是否有變動：

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.id !== this.props.id;
}
```

## Ajax 非同步處理
若有需要進行 Ajax 非同步處理，請在 `componentDidMount` 進行處理：


## 總結


## 延伸閱讀
