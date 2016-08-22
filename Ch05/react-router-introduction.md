# React Router 入門實戰教學

## 前言
若你是從一開始一路走到這裡讀者請先給自己一個愛的鼓勵吧！在經歷了 React 基礎的訓練後，相信各位讀者應該都等不及想大展拳腳了！接下來我們將進行比較複雜的應用程式開發並和讀者介紹目前市場上常見的不刷頁單頁式應用程式（single page application）的設計方式。

## 單頁式應用程式（single page application）
傳統的 Web 開發主要是由伺服器管理 URL Routing 和渲染 HTML 頁面，過往每次 URL 一換或使用者連結一點，就需要重新從伺服器端重新載入頁面。但隨著使用者對於使用者體驗的要求提昇，許多的網頁應用程式紛紛設計成不刷頁的單頁式應用程式（single page application），由前端負責 URL 的 routing 管理，若需要和後端進行 API 資料溝通的話，通常也會使用 Ajax 的技術。在 React 開發世界中主流是使用 [react-router](https://github.com/reactjs/react-router) 這個 routing 管理用的 library。

## React Router 環境設置

先透過以下指令在根目錄產生 npm 設定檔 `package.json` ：

```
	$ npm init
```

安裝相關套件（包含開發環境使用的套件）：

```shell
	$ npm install --save react react-dom react-router
```

```
	$ npm install --save-dev babel-core babel-eslint babel-loader babel-preset-es2015 babel-preset-react eslint eslint-config-airbnb eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react webpack webpack-dev-server html-webpack-plugin
```

安裝好後我們可以設計一下我們的資料夾結構，首先我們在根目錄建立 `src` 和 `res` 資料夾，分別放置 `script` 的 `source` 和靜態資源（如：全域使用的 `.css` 和圖檔）。在 `components` 資料夾中我們會放置所有 `components`，其餘設定檔則放置於根目錄下。

![React Router 資料夾結構](./images/folder.png "React Router 資料夾結構")

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

太好了！這樣我們就完成了開發環境的設定可以開始動手實作 `React Router` 應用程式了！	

## 開始 React Routing 之旅

HTML Markup：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ReactRouter</title>
  <link rel="stylesheet" type="text/css" href="../res/styles/main.css">
</head>
<body>
	<div id="app"></div>
</body>
</html>
```

以下是 `webpack.config.js` 的進入點 `src/index.js`，負責管理 `Router` 和 `render` 元件。這邊我們要先詳細討論的是，為了使用 React Router 功能引入了許多 `react-router` 內部的元件。

1. Router

2. Route

3. hashHistory

4. IndexRoute

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Repos from './components/Repos';
import About from './components/About';
import User from './components/User';
import Contacts from './components/Contacts';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/repos/:name" component={Repos} />
      <Route path="/about" component={About} />
      <Route path="/user" component={User} />
      <Route path="/contacts" component={Contacts} />
    </Route>
  </Router>,
  document.getElementById('app'));
```

我們將 App 元件當做每個元件都會載入的母模版，這樣就可以讓每個頁面都有導覽列連結可以點選，同時可以透過 `props.children` 載入對應 URL 的子元件。

1. Link

2. IndexLink

`src/components/App/App.js`：

```javascript
import React from 'react';
import { Link, IndexLink } from 'react-router';
import styles from './appStyles';
import NavLink from '../NavLink';

const App = (props) => (
  <div>
    <h1>React Router Tutorial</h1>
    <ul>
      <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
      <li><Link to="/about" activeStyle={{ color: 'green' }}>About</Link></li>
      <li><Link to="/repos/react-router" activeStyle={styles.active}>Repos</Link></li>
      <li><Link to="/user" activeClassName="active">User</Link></li>
      <li><NavLink to="/contacts">Contacts</NavLink></li>
    </ul>
    <!-- 我們將 App 元件當做每個元件都會載入的母模版，因此可以透過 children 載入對應 URL 的子元件 -->
    {props.children}
  </div>
);

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
```

特別注意當 child route `actived` 時，parent route 也會 `actived`。所以我們回首頁的連結使用 `<IndexLink />` 內部的 `onlyActiveOnIndex` 屬性來解決這個問題。

![範例成果](./images/example.png "範例成果")

## 延伸閱讀
1. [Leveling Up With React: React Router](https://css-tricks.com/learning-react-router/)
2. [Programmatically navigate using react router](http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router)
3. [React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)
4. [React Router 中文文档](https://react-guide.github.io/react-router-cn/index.html)
5. [React Router Tutorial](https://github.com/reactjs/react-router-tutorial)
