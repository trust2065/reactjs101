# React Redux Sever Rendering（Isomorphic）入門

## 前言
在進到後面開發 React Redux Sever Rendering 應用程式的主題之前我們先來聊聊 Isomorphic JavaScript 這個議題。

根據 [Isomorphic JavaScript](http://isomorphic.net/) 這個網站的說明：

>Isomorphic JavaScript
Isomorphic JavaScript apps are JavaScript applications that can run both client-side and server-side.
The backend and frontend share the same code. 

Isomorphic JavaScript 係指瀏覽器端和伺服器端共用 JavaScript 的程式碼。

另外，除了 Isomorphic JavaScript 外，讀者或許也有聽過 Universal JavaScript 這個用詞。那什麼是 Universal JavaScript 呢？它和 Isomorphic JavaScript 是指一樣的意思嗎？針對這個議題網路上有些開發者提出了自己的觀點： [Universal JavaScript](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.67xsay73m)、[Isomorphism vs Universal JavaScript](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.qvggcp3v8)。其中 Isomorphism vs Universal JavaScript 這篇文章的作者 Gert Hengeveld 指出 `Isomorphic JavaScript` 主要是指前後端共用 JavaScript 的開發方式，而 `Universal JavaScript` 是指 JavaScript 程式碼可以在不同環境下運行，這當然包含瀏覽器端和伺服器端，甚至其他環境。也就是說 `Universal JavaScript` 在意義上可以涵蓋的比 `Isomorphic JavaScript` 更廣泛一些，然而在 Github 或是許多技術討論上通常會把兩者視為同一件事情，這部份也請讀者留意。

## Isomorphic JavaScript 的好處
在開始真正撰寫 Isomorphic JavaScript 前我們在進一步探討使用 Isomorphic JavaScript 有哪些好處？在談好處之前，我們先看看最早 Web 開發是如何處理頁面渲染和 state 管理，還有遇到哪些挑戰。

最早的時候我們談論 Web 很單純，都是由 Server 端進行模版的處理，你可以想成 template 是一個函數，我們傳送資料進去，template 最後產生一張 HTML 給瀏覽器顯示。例如：Node 使用的（[EJS](http://ejs.co/)、[Jade](http://jade-lang.com/)）、Django 的 [Template](https://docs.djangoproject.com/el/1.10/ref/templates/) 或替代方案 [Jinja](https://github.com/pallets/jinja)、PHP 的 [Smarty](http://www.smarty.net/)、[Laravel](https://laravel.com/) 使用的 [Blade](https://laravel.com/docs/5.0/templates) 甚至是 Ruby on Rails 用的 [ERB](http://guides.rubyonrails.org/layouts_and_rendering.html)。都是由後端去 render 所有資料和頁面，前端處理相對單純。

然而隨著前端工程的軟體工程化和使用者體驗的要求，開始出現各式前端框架的百花齊放，例如：[Backbone.js](http://backbonejs.org/)、[Ember.js](http://emberjs.com/) 和 [Angular.js](https://angularjs.org/) 等前端 MVC (Model-View-Controller) 或 MVVM (Model-View-ViewModel) 框架，將頁面於前端渲染的不刷頁單頁式應用程式（Single Page App）也因此開始流行。

後端除了提供初始的 HTML 外，還提供 API Server 讓前端框架可以取得資料用於前端 template。複雜的邏輯由 ViewModel/Presenter 來處理，template 只處理簡單的是否顯示或是元素迭代的狀況，如下圖所示：

![React Redux Sever Rendering（Isomorphic）入門](./images/client-mvc.png "React Redux Sever Rendering（Isomorphic）入門")

然而前端渲染 template 雖然有它的好處但也遇到一些問題包括效能、SEO 等議題。此時我們就開始思考 Isomorphic JavaScript 的可能性：為什麼我們不能前後端都使用 JavaScript 甚至是 React？

![React Redux Sever Rendering（Isomorphic）入門](./images/client-server-mvc.png "React Redux Sever Rendering（Isomorphic）入門")

事實上，React 的優勢就在於它可以很優雅地實現 Server Side Rendering 達到 Isomorphic JavaScript 的效果。在 `react-dom/server` 中有兩個方法 `renderToString` 和 `renderToStaticMarkup` 可以在 server 端渲染你的 components。其主要都是將 React Component 在 Server 端轉成 DOM String，也可以將 props 往下傳，然而事件處理會失效，要到 client-side 的 React 接收到後才會把它加上去（但要注意 server-side 和 client-side 的 checksum 要一致不然會出現錯誤），這樣一來可以提高渲染速度和 SEO 效果。`renderToString` 和 `renderToStaticMarkup` 最大的差異在於 `renderToStaticMarkup` 會少加一些 React 內部使用的 DOM 屬性，例如：`data-react-id`，因此可以節省一些資源。

使用 `renderToString` 進行 Server 端渲染：

```javascript
import ReactDOMServer from 'react-dom/server';

ReactDOMServer.renderToString(<HelloButton name="Mark" />);
```

渲染出來的效果：

```html
<button data-reactid=".7" data-react-checksum="762752829">
  Hello, Mark
</button>
```

總的來說使用 Isomorphic JavaScript 會有以下的好處：

1. 有助於 SEO
2. Rendering 速度較快，效能較佳
3. 放棄蹩腳的 Template 語法擁抱 Component 元件化思考，便於維護
4. 盡量前後端共用程式碼節省開發時間

接下來我們就開始動手實作一個簡單的 React Server Side Rendering Counter 應用程式。

## 專案成果截圖

![React Redux Sever Rendering（Isomorphic）入門](./images/react-server-rendering-demo.png "React Redux Sever Rendering（Isomorphic）入門")

## 環境安裝與設定
1. 安裝 Node 和 NPM

2. 安裝所需套件

	```
	$ npm install --save react react-dom redux react-redux react-router immutable redux-immutable redux-actions redux-thunk babel-polyfill babel-register body-parser express morgan qs
	```

	```
	$ npm install --save-dev babel-core babel-eslint babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-1 eslint eslint-config-airbnb eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react html-webpack-plugin webpack webpack-dev-server redux-logger
	```

接下來我們先設定一下開發文檔。

1. 設定 Babel 的設定檔： `.babelrc`

	```javascript
	{
		"presets": [
	  	"es2015",
	  	"react",
	 	],
		"plugins": []
	}
	```

2. 設定 ESLint 的設定檔和規則： `.eslintrc`

	```javascript
	{
	  "extends": "airbnb",
	  "rules": {
	    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
	  },
	  "env" :{
	    "browser": true,
	  }
	}
	```

3. 設定 Webpack 設定檔： `webpack.config.js`

	```javascript
	// 讓你可以動態插入 bundle 好的 .js 檔到 .index.html
	const HtmlWebpackPlugin = require('html-webpack-plugin');

	const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	  template: `${__dirname}/src/index.html`,
	  filename: 'index.html',
	  inject: 'body',
	});
	
	// entry 為進入點，output 為進行完 eslint、babel loader 轉譯後的檔案位置
	module.exports = {
	  entry: [
	    './src/index.js',
	  ],
	  output: {
	    path: `${__dirname}/dist`,
	    filename: 'index_bundle.js',
	  },
	  module: {
	    preLoaders: [
	      {
	        test: /\.jsx$|\.js$/,
	        loader: 'eslint-loader',
	        include: `${__dirname}/src`,
	        exclude: /bundle\.js$/
	      }
	    ],
	    loaders: [{
	      test: /\.js$/,
	      exclude: /node_modules/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015', 'react'],
	      },
	    }],
	  },
	  // 啟動開發測試用 server 設定（不能用在 production）
	  devServer: {
	    inline: true,
	    port: 8008,
	  },
	  plugins: [HTMLWebpackPluginConfig],
	};
	```

太好了！這樣我們就完成了開發環境的設定可以開始動手實作 `React Server Side Rendering Counter` 應用程式了！	

先看一下我們整個專案的資料結構：

![React Redux Sever Rendering（Isomorphic）入門](./images/react-server-rendering-folder.png "React Redux Sever Rendering（Isomorphic）入門")

## 動手實作

```javascript
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CounterContainer from '../common/containers/CounterContainer';
import configureStore from '../common/store/configureStore'
import { fromJS } from 'immutable';

// get initial state from server side
const initialState = window.__PRELOADED_STATE__;

// use initial state to create store and pass to provider
const store = configureStore(fromJS(initialState))

ReactDOM.render(
  <Provider store={store}>
    <CounterContainer />
  </Provider>,
  document.getElementById('app')
);

```

```javascript
// use babel-register to precompile ES6 syntax
require('babel-register');
require('./server');
```

```javascript
import Express from 'express';
import qs from 'qs';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

import configureStore from '../common/store/configureStore';
import CounterContainer from '../common/containers/CounterContainer';

import { fetchCounter } from '../common/api/counter';

const app = new Express();
const port = 3000;

function handleRender(req, res) {
  // Query our mock API asynchronously
  fetchCounter(apiResult => {
    // Read the counter from the request, if provided
    const params = qs.parse(req.query);
    const counter = parseInt(params.counter, 10) || apiResult || 0;
    // Combined initial state to immutable format
    const initialState = fromJS({
      counterReducers: {
        count: counter,
      }
    });
    // Create a new Redux store instance
    const store = configureStore(initialState);
    // Render the component to a string
    const html = renderToString(
      <Provider store={store}>
        <CounterContainer />
      </Provider>
    );
    // Grab the initial state from our Redux store
    const finalState = store.getState();
    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
  })
}

function renderFullPage(html, preloadedState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
  }
});

```

```
export const INCREMENT_COUNT = 'INCREMENT_COUNT';  
export const DECREMENT_COUNT = 'DECREMENT_COUNT';  
```

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(createLogger({ stateTransformer: state => state.toJS() }), thunk)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

```

```
import { createAction } from 'redux-actions';
import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from '../constants/actionTypes';

export const incrementCount = createAction(INCREMENT_COUNT);
export const decrementCount = createAction(DECREMENT_COUNT);
```

```
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function fetchCounter(callback) {
  // simulate asynchronous behavior
  setTimeout(() => {
    callback(getRandomInt(1, 100))
  }, 500)

  // In the case of a real world API call, you'll normally run into a Promise like this:
  // API.getUser().then(user => callback(user))
}
```

```
import React, { Component, PropTypes } from 'react'

const Counter = ({
  count,
  onIncrement,
  onDecrement,
}) => (
  <p>
    Clicked: {count} times
    {' '}
    <button onClick={onIncrement}>
      +
    </button>
    {' '}
    <button onClick={onDecrement}>
      -
    </button>
    {' '}
  </p>
);

Counter.propTypes = {
  count: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

Counter.defaultProps = {
  count: 0,
  onIncrement: () => {},
  onDecrement: () => {}
}

export default Counter;
```

```
import 'babel-polyfill';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';

import {
  incrementCount,
  decrementCount,
} from '../../actions';

export default connect(
  (state) => ({
    count: state.get('counterReducers').get('count'),
  }),
  (dispatch) => ({ 
    onIncrement: () => (
      dispatch(incrementCount())
    ),
    onDecrement: () => (
      dispatch(decrementCount())
    ),
  })
)(Counter);
```

```
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { CounterState } from '../constants/models';

import {
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from '../constants/actionTypes';

const counterReducers = handleActions({
  INCREMENT_COUNT: (state) => (
    state.set(
      'count',
      state.get('count') + 1
    )
  ),
  DECREMENT_COUNT: (state) => (
    state.set(
      'count',
      state.get('count') - 1
    )
  ),
}, CounterState);

export default counterReducers;
```

## 總結

## 延伸閱讀
1. [DavidWells/isomorphic-react-example](https://github.com/DavidWells/isomorphic-react-example)
2. [RickWong/react-isomorphic-starterkit](https://github.com/RickWong/react-isomorphic-starterkit)
3. [Server-rendered React components in Rails](https://www.bensmithett.com/server-rendered-react-components-in-rails/)
4. [Our First Node.js App: Backbone on the Client and Server](http://nerds.airbnb.com/weve-launched-our-first-nodejs-app-to-product/)
5. [Going Isomorphic with React](https://bensmithett.github.io/going-isomorphic-with-react/#/)
6. [A service for server-side rendering your JavaScript views](https://github.com/airbnb/hypernova)
7. [Isomorphic JavaScript: The Future of Web Apps](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)

（image via [airbnb](http://nerds.airbnb.com/wp-content/uploads/2013/11/Screen-Shot-2013-11-06-at-5.21.00-PM.png)）