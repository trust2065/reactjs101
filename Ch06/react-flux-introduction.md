# Flux 實戰入門

![React Flux](./images/react-flux.jpeg "React Flux")

## 前言
[Flux](https://facebook.github.io/flux/) 是 Facebook 推出的 client-side 應用程式架構（Architecture），主要想解決 `MVC` 架構的一些問題。事實上，Flux 並非一個完整的前端 Framework，其特色在於實現了 Unidirectional Data Flow（單向流）的資料流設計模式，在開發複雜的大型應用程式時可以更容易地管理 state（狀態）。由於 React 主要是負責 View 的部份，所以透過搭配 Flux-like 的資料處理架構，可以更好的去管理我們的 state（狀態），處理複雜的使用者互動（例如：Facebook 同時要維護使用者是否按讚、點擊相片，是否有新訊息等狀態）。

由於原始的 Flux 架構在實現上有些部分可以精簡和改善，在實務上我們通常會使用開發者社群開發的 Flux-like 相關的架構實現（例如：[Redux](http://redux.js.org/index.html)、[Alt](http://alt.js.org/)、[Reflux](https://github.com/reflux/refluxjs) 等）。不過這邊我們主要會使用 Facebook 本身提供 `Dispatcher API` 函式庫（可以想成是一個 pub/sub 處理器，透過 broadcast 將 `payloads` 傳給註冊的 callback function）並搭配 `NodeJS` 的 `EventEmitter` 模組去完成 Flux 架構的實現。

## 開發環境設置

先透過以下指令在根目錄產生 npm 設定檔 `package.json` ：

```
$ npm init
```

安裝相關套件（包含開發環境使用的套件）：

```
$ npm install --save react react-dom flux
```

```
$ npm install --save-dev babel-core babel-eslint babel-loader babel-preset-es2015 babel-preset-react eslint eslint-config-airbnb eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react html-webpack-plugin webpack webpack-dev-server
```

安裝好後我們可以設計一下我們的資料夾結構，首先我們在根目錄建立 `src`，放置 `script` 的 `source` 。在 `components` 資料夾中我們會放置所有 `components`（個別元件資料夾中會用 `index.js` 輸出元件，讓引入元件更簡潔），另外還有 `actions`、`constants`、`dispatcher`、`stores`，其餘設定檔則放置於根目錄下。

![React Flux 資料夾結構](./images/folder.png "React Flux 資料夾結構")

接下來我們參考上一章設定一下開發文檔（`.babelrc`、`.eslintrc`、`webpack.config.js`）。這樣我們就完成了開發環境的設定可以開始動手實作 `React Flux` 應用程式了！	

## Flux 概念介紹

![React Flux](./images/flux-simple-diagram.png "React Flux")

在 Flux Unidirectional Data Flow（單項流）世界裡有四大主角，分別負責不同對應的工作：
1. Actions / Action Creator 
Action 負責定義所有改變 state（狀態）的動作，可以快速了解 App 的各種功能，若你想改變 state 你只能發 Action。Action 可以是同步或是非同步。例如：新增代辦事項，呼叫非同步 API 獲取資料。實務上我們會分成 action 和 action creator

action 為描述行為的 object（物件），action creator 將 action 送給 dispatcher。一般來說符合 Flux Standard Action 的 action 會長這樣，具備 `type` 來區別所觸發的行為。而 `payload` 則是所夾帶的資料：

```
const addTodo = {
  type: 'ADD_TODO',
  payload: {
    text: 'Do something.'  
  }
}

AppDispatcher.dispatch(addTodo);
```

當發生 rejected Promise 情況：

```
{
  type: 'ADD_TODO',
  payload: new Error(),
  error: true
}
```

2. Dispatcher
`Dispatcher` 是 Flux 架構的核心，每個 App 只有一個 dispatcher，負責向 store 發送 action 事件。

3. Stores
一個 App 可以有多個 store，負責操作和儲存資料並告訴 `view` 資料更新。

4. Controller Views / Views
這部份是 `React` 負責的範疇，負責提供監聽事件的 callback function，當事件發生時重新取得資料。

## Flux 初體驗

HTML Markup：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TodoFlux</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>
```

以下為 `src/index.js` 完整程式碼：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TodoHeader from './components/TodoHeader';
import TodoList from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <TodoHeader />
        <TodoList />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
```

```javascript
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ADD_TODO } from '../constants/actionTypes';

export const TodoActions = {
  addTodo(text) {
    AppDispatcher.handleAction({
      type: ADD_TODO,
      payload: {
        text,
      },
    });
  },
};
```

```javascript
export const ADD_TODO = 'ADD_TODO';
```

```javascript
// Todo app dispatcher with actions responding to both
// view and server actions
import { Dispatcher } from 'flux';

class DispatcherClass extends Dispatcher {

  handleAction(action) {
    this.dispatch({
      type: action.type,
      payload: action.payload,
    });
  }

}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;

```


```javascript
import AppDispatcher from '../dispatcher/AppDispatcher';
import { ADD_TODO } from '../constants/actionTypes';
import { EventEmitter } from 'events';

// const CHANGE_EVENT = 'change';

const store = {
  todos: [],
  editing: false,
};

class TodoStoreClass extends EventEmitter {

  addChangeListener(callback) {
    this.on(ADD_TODO, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(ADD_TODO, callback);
  }

  getTodos() {
    return store.todos;
  }
}

const TodoStore = new TodoStoreClass();

AppDispatcher.register((action) => {
  switch (action.type) {
    case ADD_TODO:
      store.todos.push(action.payload.text);
      TodoStore.emit(ADD_TODO);
      break;
    default:
      return true;
  }
  return true;
});

export default TodoStore;

```

```javascript
import React, { Component } from 'react';
import { TodoActions } from '../../actions/todoActions';

class TodoHeader extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.state = {
      text: '',
      editing: false,
    };
  }

  onChange(event) {
    this.setState({
      text: event.target.value,
    });
  }

  onAdd() {
    TodoActions.addTodo(this.state.text);
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <div>
        <h1>TodoFlux</h1>
        <div>
          <input
            value={this.state.text}
            type="text"
            placeholder="請輸入代辦事項"
            onChange={this.onChange}
          />
          <button
            onClick={this.onAdd}
          >
            送出
          </button>
        </div>
      </div>
    );
  }
}

export default TodoHeader;
```

```javascript

import React, { Component } from 'react';
import TodoStore from '../../stores/TodoStore';

function getAppState() {
  return {
    todos: TodoStore.getTodos(),
  };
}
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      todos: [],
    };
  }
  componentDidMount() {
    TodoStore.addChangeListener(this.onChange);
  }
  onChange() {
    this.setState(getAppState());
  }
  render() {
    return (
      <div>
        <ul>
          {
            this.state.todos.map((todo, key) => (
              <li key={key}>{todo}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default TodoList;
```

## 延伸閱讀
1. [Getting To Know Flux, the React.js Architecture](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture)
2. [Flux 官方網站](https://facebook.github.io/flux/)
3. [從 Flux 與 MVC 的差異來簡介 Flux](http://blog.techbridge.cc/2016/04/29/introduce-flux-from-flux-and-mvc/)
4. [Flux Stores and ES6](https://medium.com/@softwarecf/flux-stores-and-es6-9b453dbf9db#.uuf1ddj8u)
5. [React and Flux: Migrating to ES6 with Babel and ESLint](https://medium.com/front-end-developers/react-and-flux-migrating-to-es6-with-babel-and-eslint-6390cf4fd878#.vafamphwy)
6. [Building an ES6/JSX/React Flux App – Part 2 – The Flux](https://shellmonger.com/2015/08/17/building-an-es6jsxreact-flux-app-part-2-the-flux/)
7. [Question: How to choose between Redux's store and React's state? #1287](https://github.com/reactjs/redux/issues/1287)
8. [acdlite/flux-standard-action](https://github.com/acdlite/flux-standard-action)

（image via [devjournal](http://devjournal.ru/wp-content/uploads/2016/03/React.js-Flux-Redux.png)、[facebook](https://facebook.github.io/flux/)）