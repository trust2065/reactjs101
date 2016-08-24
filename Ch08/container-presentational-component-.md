# Container 與 Presentational Components 入門

在聊完了 React 和 Redux 整合後我們來談談分離 Presentational 和 Container Component 的概念，若你是第一次聽過這個名詞，我建議你可以先看看 Redux 作者 Dan AbramovFollow 所寫的這篇文章 [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.vtcuxsurv)。

## Container 與 Presentational Components 超級比一比

1. Presentational Components	
	- 用途：怎麼看事情（Markup、外觀）
	- 是否讓 Redux 意識到：否
	- 取得資料方式：從 props 取得
	- 改變資料方式：從 props 去呼叫 callback function
  - 寫入方式：手動處理

2. Container Components
 - 用途：怎麼做事情（擷取資料，更新 State）
 - 是否讓 Redux 意識到：是
 - 取得資料方式：訂閱 Redux State（store）
 - 改變資料方式：Dispatch Redux Action
 - 寫入方式：從 React Redux 產生

[react-redux](https://github.com/reactjs/react-redux) 所提供的 API `connect`，其用法如下：

`connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])` 

在我們的範例 App 中我們只會先用到前兩個參數，地三個參數會在之後的例子裡用到。第一個參數 mapStateToProps 是一個讓開發者可以從 store 取出想要 state 並當做 props 往下傳的功能，第二個參數則是將 dispatch 行為封裝成函數順著 props 可以方便往下傳和呼叫。

## Container Components

```javascript
import { connect } from 'react-redux';
import TodoHeader from '../../components/TodoHeader';

// 將欲使用的 actions 引入
import {
  changeText,
  createTodo,
} from '../../actions';

const mapStateToProps = (state) => ({
  // 從 store 取得 todo state
  todo: state.getIn(['todo', 'todo'])
});

const mapDispatchToProps = (dispatch) => ({
  // 當使用者在 input 輸入資料值即會觸發這個函數，發出 changeText action 並附上使用者輸入內容 event.target.value
  onChangeText: (event) => (
    dispatch(changeText({ text: event.target.value }))
  ),
  // 當使用者按下送出時，發出 createTodo action 並清空 input 
  onCreateTodo: () => {
    dispatch(createTodo());
    dispatch(changeText({ text: '' }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoHeader);
```

```javascript
import { connect } from 'react-redux';
import TodoList from '../../components/TodoList';

import {
  deleteTodo,
} from '../../actions';

const mapStateToProps = (state) => ({
  todos: state.getIn(['todo', 'todos'])
});

const mapDispatchToProps = (dispatch) => ({
  onDeleteTodo: (index) => () => (
    dispatch(deleteTodo({ index }))
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodoList);
```

## Presentational Components

以下是 `src/components/TodoHeader/TodoHeader.js` 的部份：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const TodoHeader = ({
  onChangeText,
  onCreateTodo,
  todo,
}) => (
  <div>
    <h1>TodoHeader</h1>
    <input type="text" value={todo.get('text')} onChange={onChangeText} />
    <button onClick={onCreateTodo}>送出</button>
  </div>
);

export default TodoHeader;
```

以下是 `src/components/TodoList/TodoList.js` 的部份：

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

const TodoList = ({
  todos,
  onDeleteTodo,
}) => (
  <div>
    <ul>
    {
      todos.map((todo, index) => (
        <li key={index}>
          {todo.get('text')}
          <button onClick={onDeleteTodo(index)}>X</button>
        </li>
      )).toJS()
    }
    </ul>
  </div>
);

export default TodoList;
```

## 總結

## 延伸閱讀
1. [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.vtcuxsurv)
2. [Redux Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html)
3. [React Higher Order Components in depth](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.r8srulpaj)
4. [React higher order components](http://www.darul.io/post/2016-01-05_react-higher-order-components)
