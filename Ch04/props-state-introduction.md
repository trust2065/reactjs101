# Props、State、Refs 與表單處理

在前面的章節中我們已經對於 React 和 JSX 有初步的認識，我們也了解到 React Component 事實上可以視為一個狀態機（state machine），而這個狀態機根據不同的 state（透過 `setState()` 修改）和 props（由父元素傳入），Component 會出現對應的顯示結果。本章將使用 React 官網上的範例（使用 ES6+ 進行改寫）來更進一步說明 Props 和 State 特性及在 React 如何進行事件和表單處理。

## Props
首先我們使用 React 官網上的 A Simple Component 來說明 props 的使用方式。由於傳入元件的 name 屬性為 Mark，故以下程式碼將會在瀏覽器顯示 Hello, Mark。針對傳入的 props 我們也有驗證和預設值的設計，讓我們撰寫的元件可以更加健壯。

使用 ES6 Class Component 寫法：

```javascript
class HelloMessage extends React.Component {
	constructor() {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div>Hello {this.props.name}</div>
		)
	}
}

// PropTypes 驗證，若傳入的 props type 不是 string 將會顯示錯誤
HelloMessage.propTypes = {
  name: React.PropTypes.string,
}

// Prop 預設值，若對應 props 沒傳入值將會使用 default 值 Zuck
HelloMessage.defaultProps = {
 name: 'Zuck', 
}

ReactDOM.render(<HelloMessage name="Mark" />, document.getElementById('app'));
```

使用 Functional Component 寫法：

```javascript
// Functional Component 可以視為 f(d) => UI，根據傳進去的 props 繪出對應的 UI。注意這邊 props 是傳入函式的參數。因此取用 props 不用加 this
const HelloMessage = (props) => (
	<div>Hello {props.name}</div>
);

// PropTypes 驗證，若傳入的 props type 不是 string 將會顯示錯誤
HelloMessage.propTypes = {
  name: React.PropTypes.string,
}

// Prop 預設值，若對應 props 沒傳入值將會使用 default 值 Zuck
HelloMessage.defaultProps = {
 name: 'Zuck', 
}

ReactDOM.render(<HelloMessage name="Mark" />, document.getElementById('app'));
```

## State
接下來我們將使用 A Stateful Component 這個範例來講解 State 的用法。在 React Component 可以自己管理自己的內部 state，並用 `this.state` 來存取 state。當 `setState()` 方法更新了 state 後將重新呼叫 `render()` 方法，重新繪製 component 內容。以下範例是一個每 1000 毫秒（等於1秒）就會加一的累加器。由於這個範例是 Stateful Component 因此僅使用 ES6 Class Component，而不使用 Functional Component。

```javascript
class Timer extends React.Component {
	constructor(props) {
		super(props);
		// 與 ES5 React.createClass({}) 不同的是 component 內的方法需要自行綁定 this context，或是使用 arrow function 
        this.tick = this.tick.bind(this);
		// 初始 state，等於 ES5 中的 getInitialState
		this.state = {
			secondsElapsed: 0,
		}
	}
	// 累加器方法，每一秒被呼叫後就會使用 setState() 更新內部 state，讓 Component 重新 render
	tick() {
	    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
	}
	// componentDidMount 為 component 生命週期中階段 component 已插入節點的階段，通常一些非同步操作都會放置在這個階段。這便是每1秒鐘會去呼叫 tick 方法
	componentDidMount() {
	    this.interval = setInterval(this.tick, 1000);
	}
	// componentWillUnmount 為 component 生命週期中 component 即將移出插入的節點的階段。這邊移除了 setInterval 效力 
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	// render 為 class Component 中唯一需要定義的方法，其回傳 component 欲顯示的內容
	render() {
	    return (
	      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
	    );		
	}
}

ReactDOM.render(<Timer />, document.getElementById('app'));
```

## 事件處理（Event Handle）
在前面的內容我們已經學會如何使用 props 和 state，接下來我們要更進一步學習在 React 內如何進行事件處理。

```javascript
const TodoList = (props) => (
	<ul>
		{
			props.items.map((item) => (
				<li key={item.id}>{item.text}</li>
			))
		}
	</ul>
)

class TodoApp extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			items: [],
			text: '',
		}
	}
	onChange(e) {
    this.setState({text: e.target.value});		
	}
	handleSubmit(e) {
    e.preventDefault();
    const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    const nextText = '';
    this.setState({items: nextItems, text: nextText});
	}
	render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
      </div>
    );
	}
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));
```

## Refs 與表單處理
onChagne、event.target.value
	- props 定義後就不能修改
	- state 隨著使用者互動而改變
	- refs

```javascript
const MarkdownEditor = React.createClass({
  getInitialState: function() {
    return {value: 'Type some *markdown* here!'};
  },
  handleChange: function() {
    this.setState({value: this.refs.textarea.value});
  },
  rawMarkup: function() {
    var md = new Remarkable();
    return { __html: md.render(this.state.value) };
  },
  render: function() {
    return (
      <div className="MarkdownEditor">
        <h3>Input</h3>
        <textarea
          onChange={this.handleChange}
          ref="textarea"
          defaultValue={this.state.value} />
        <h3>Output</h3>
        <div
          className="content"
          dangerouslySetInnerHTML={this.rawMarkup()}
        />
      </div>
    );
  }
});

ReactDOM.render(<MarkdownEditor />, mountNode);
```

Refs and findDOMNode()

## 延伸閱讀
1. [React 官方網站](https://facebook.github.io/react/index.html)
