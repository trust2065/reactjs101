# Redux 基礎概念

![React Redux](./images/redux-logo.png "React Redux")

## 前言
前面一個章節我們講解了 Flux 的功能和用法，但在實務上許多開發者較偏好的是同為 Flux-like 但較為簡潔且文件豐富清楚的 [Redux](http://redux.js.org/index.html) 當作狀態資料管理的架構。Redux 是由 Dan Abramov 所發起的一個開源的 library，其主要功能如官方首頁寫著：`Redux is a predictable state container for JavaScript apps.`，亦即 Redux 希望能提供一個可以預測的 state 管理容器，讓開發者可以可以更容易開發複雜的 JavaScript 應用程式（注意 Redux 和 React 並無相依性，只是和 React 可以有很好的整合）。

## Flux/Redux 超級比一比

從簡單 Flux/Redux 比較圖可以看出兩者之間有些差異：

![React Redux](./images/using-redux-compare.jpg "React Redux")

在開始實作 Redux App 之前我們先來了解一下 Redux 和 Flux 的一些差異：

1. 只使用一個 store 將整個應用程式的狀態 (state) 用物件樹 (object tree) 的方式儲存起來：

	原生的 Flux 會有許多分散的 store 儲存各個不同的狀態，但在 redux 中，只會有唯一一個 store 將所有的資料用物件的方式包起來。

	```javascript
	//原生 Flux 的 store
	const userStore = {
	    name: ''
	}
	const todoStore = {
	    text: ''
	}

	// Redux 的單一 store
	const state = {
	    userState: {
	        name: ''
	    },
	    todoState: {
	        text: ''
	    }
	}
	```

2. 唯一可以改變 state 的方法就是發送 action，這部份和 Flux 類似，但 Redux 並沒有像 Flux 設計有 Dispatcher。Redux 的 action 和 Flux 的 action 都是一個包含 `type` 和 `payload` 的物件。

3. Redux 擁有 Flux 所沒有的 Reducer。Reducer 根據 action 的 type 去執行對應的 state 做變化的函式叫做 Reducer。你可以使用 switch 或是使用函式 mapping 的方式去對應處理的方式。 

4. Redux 擁有許多方便好用的輔助測試工具（例如：[redux-devtools](https://github.com/gaearon/redux-devtools)、[react-transform-boilerplate](https://github.com/gaearon/react-transform-boilerplate)），方便測試和使用 `Hot Module Reload`。

## Redux 核心概念介紹
1. Single source of truth (單一的真相來源)
2. State is read-only (狀態是唯讀的)
3. Changes are made with pure functions (使用純函式進行更改)
4. Write Reducers instead of store
4. Keep Components Stateless

```javascript
import { createStore } from 'redux'

/** 
  下面是一個簡單的 reducers ，主要功能是針對傳進來的 action type 判斷並回傳新的 state
  reducer 規格：(state, action) => newState 
  一般而言 state 可以是 primitive、array 或 object 甚至是 ImmutableJS Data。但要留意的是不能修改到原來的 state ，
  回傳的是新的 state。由於使用在 Redux 中使用 ImmutableJS 有許多好處，所以我們的範例 App 也會使用 ImmutableJS 
*/
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// 創建 Redux store 去存放 App 的所有 state
// store 的可用 API { subscribe, dispatch, getState } 
let store = createStore(counter)

// 可以使用 subscribe() 來訂閱 state 是否更新。但實務通常會使用 react-redux 來串連 React 和 Redux
store.subscribe(() =>
  console.log(store.getState())
)

// 若想改變 state ，一律發 action
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1
```

## Redux API 入門

1. createStore

	createStore(reducer, [preloadedState], [enhancer])

2. Store

3. combineReducers

	combineReducers(reducers)

4. applyMiddleware

	applyMiddleware(...middlewares)

5. bindActionCreators

	bindActionCreators(actionCreators, dispatch)

6. compose

	compose(...functions)


## Redux 流程回顧

![React Redux](./images/redux-flowchart.png "React Redux")

（View -> Action -> Middleware -> Reducer）

![React Redux](./images/react-redux-diagram.png "React Redux")

官方針對 Middleware 進行說明
> It provides a third-party extension point between dispatching an
action, and the moment it reaches the reducer.

若有 NodeJS 的經驗的讀者，對於 middleware 概念應該不陌生，讓開發者可以在 req 和 res 之間進行一些操作。在 Redux 中 Middleware 則是扮演 action 到達 reducer 前的第三方擴充。

## 總結
以上介紹了 Redux 的基礎概念，若是讀者覺得還是有點抽象的話也沒關係，在下一個章節我們將實際帶大家開發一個整合 `React`、`Redux` 和 `ImmutableJS` 的 TodoApp。

## 延伸閱讀
1. [Redux 官方網站](http://redux.js.org/index.html)
2. [Redux架构实践——Single Source of Truth](http://react-china.org/t/redux-single-source-of-truth/5564)
3. [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
4. [使用Redux管理你的React应用](https://github.com/matthew-sun/blog/issues/18)
5. [Using redux](http://www.slideshare.net/JonasOhlsson/using-redux)

（image via [githubusercontent](https://raw.githubusercontent.com/reactjs/redux/master/logo/logo-title-dark.png)、[makeitopen](http://makeitopen.com/static/images/redux_flowchart.png)、[css-tricks](https://css-tricks.com/wp-content/uploads/2016/03/redux-article-3-03.svg)、[tighten](https://blog.tighten.co/assets/img/react-redux-diagram.png)、[tryolabs](http://blog.tryolabs.com/wp-content/uploads/2016/04/redux-simple-f8-diagram.png)、[facebook](https://facebook.github.io/flux/img/flux-simple-f8-diagram-with-client-action-1300w.png)、[JonasOhlsson](http://www.slideshare.net/JonasOhlsson/using-redux)）