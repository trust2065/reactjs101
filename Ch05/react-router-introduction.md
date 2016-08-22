# React Router 入門實戰教學

## 前言
若你是從一開始一路走到這裡讀者請先給自己一個愛的鼓勵吧！在經歷了 React 基礎的訓練後，相信各位讀者應該都等不及想大展拳腳了！接下來我們將進行比較複雜的應用程式開發並和讀者介紹目前市場上常見的不刷頁單頁式應用程式（single page application）的設計方式。

## 單頁式應用程式（single page application）
隨著使用者對於使用者體驗的要求提昇，許多的網頁應用程式紛紛設計成不刷頁的單頁式應用程式（single page application），由前端負責 URL 的 routing 管理，若需要和後端進行 API 資料溝通的話，通常也會使用 Ajax 的技術。在 React 開發世界中主流是使用 [react-router](https://github.com/reactjs/react-router) 這個 routing 管理用的 library。

## React Router 環境設置

先透過以下指令產生 `package.json` 設計檔：

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

安裝好後我們可以設計一下我們的資料夾結構：




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
	const HtmlWebpackPlugin = require('html-webpack-plugin');

	const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
	  template: `${__dirname}/src/index.html`,
	  filename: 'index.html',
	  inject: 'body',
	});

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
	  devServer: {
	    inline: true,
	    port: 8008,
	  },
	  plugins: [HTMLWebpackPluginConfig],
	};
	```

## 延伸閱讀
1. [Leveling Up With React: React Router](https://css-tricks.com/learning-react-router/)
2. [Programmatically navigate using react router](http://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router)
3. [React Router 使用教程](http://www.ruanyifeng.com/blog/2016/05/react_router.html)
4. [React Router 中文文档](https://react-guide.github.io/react-router-cn/index.html)
5. [React Router Tutorial](https://github.com/reactjs/react-router-tutorial)
