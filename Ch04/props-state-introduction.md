# Props、State、Refs 與表單處理

在前面的章節中我們已經對於 React 和 JSX 有初步的認識，我們也了解到 React Component 事實上可以視為一個狀態機（state machine），而這個狀態機根據不同的 state（透過 `setState()` 修改）和 props（由父元素傳入），Component 會出現對應的顯示結果。本章將使用 React 官網上的範例（使用 ES6+ 進行改寫）來更進一步說明 Props 和 State 特性及在 React 如何處理表單和事件。

## Props
首先我們使用 React 官網上的 A Simple Component 來說明 props 的使用方式。由於傳入元件的 name props 為 Mark，故以下程式碼將會在瀏覽器顯示 Hello, Mark。

使用 ES6 Class 寫法：

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
// Functional Component 可以視為 f(d) => UI，根據傳進去的 props 繪出對應的 UI
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


```javascript
const Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});

ReactDOM.render(<Timer />, mountNode);
```

Refs and findDOMNode()

## 事件處理（Event Handle）

```javascript
const TodoList = React.createClass({
  render: function() {
    var createItem = function(item) {
      return <li key={item.id}>{item.text}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});
var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
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
});

ReactDOM.render(<TodoApp />, mountNode);

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

## 延伸閱讀
1. [React 官方網站](https://facebook.github.io/react/index.html)
