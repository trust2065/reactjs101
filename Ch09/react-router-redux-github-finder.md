# 用 React + Router + Redux + ImmutableJS 寫一個 Github 查詢應用

## 前言
學了一身本領後，本章將帶大家完成一個單頁式應用程式（Single Page Application），整合 React + Redux + ImmutableJS + React Router 搭配 Github API 製作一個簡單的 Github 使用者查詢應用，實際體驗一下開發 React App 的感受。

## 功能規劃
讓訪客可以使用 Github ID 搜尋 Github 使用者，展示 Github 使用者名稱、follower、following、avatar_url 並可以返回首頁。

## 使用技術

1. React
2. Redux
3. Redux Thunk
4. React Router
5. ImmutableJS
6. Fetch
7. [Material UI](http://www.material-ui.com/#/)
8. Weather API Icons
9. Roboto Font from Google Font
10. Github API（https://api.github.com/users/torvalds）

## 專案成果截圖

![React Redux](./images/demo-1.png "React Redux")

![React Redux](./images/demo-2.png "React Redux")


## 環境安裝與設定
1. 安裝 Node 和 NPM

2. 安裝所需套件

```
$ npm install --save react react-dom redux react-redux react-router immutable redux-immutable redux-actions whatwg-fetch redux-thunk material-ui react-tap-event-plugin
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

太好了！這樣我們就完成了開發環境的設定可以開始動手實作 `Github Finder` 應用程式了！	

## 動手實作

1. Setup Mockup

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
	<title>GithubFinder</title>
	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
</head>
<body>
	<div id="app"></div>
</body>
</html>
```

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main';
import HomePageContainer from './containers/HomePageContainer';
import ResultPageContainer from './containers/ResultPageContainer';
import store from './store';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory}>
        <Route path="/" component={Main}>
          <IndexRoute component={HomePageContainer} />
          <Route path="/result" component={ResultPageContainer} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);
```

```javascript
import 'whatwg-fetch';
import {
  GET_GITHUB_INITIATE,
  GET_GITHUB_SUCCESS,
  GET_GITHUB_FAIL,
  CHAGE_USER_ID,
} from '../constants/actionTypes';

import {
  showSpinner,
  hideSpinner,
} from './uiActions';

export const getGithub = (userId = 'torvalds') => {
  return (dispatch) => {
    dispatch({ type: GET_GITHUB_INITIATE });
    dispatch(showSpinner());
    fetch('https://api.github.com/users/' + userId)
      .then(function(response) { return response.json() })
      .then(function(json) { 
        dispatch({ type: GET_GITHUB_SUCCESS, payload: { data: json } });
        dispatch(hideSpinner());
      })
      .catch(function(response) { dispatch({ type: GET_GITHUB_FAIL }) });
  } 
}

export const changeUserId = (text) => ({ type: CHAGE_USER_ID, payload: { userId: text } });
```

```javascript
import { createAction } from 'redux-actions';
import {
  SHOW_SPINNER,
  HIDE_SPINNER,
} from '../constants/actionTypes';

export const showSpinner = () => ({ type: SHOW_SPINNER});
export const hideSpinner = () => ({ type: HIDE_SPINNER});
```

```javascript
export * from './uiActions';
export * from './githubActions';
```


3. Actions/Reducers
```
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const HIDE_SPINNER = 'HIDE_SPINNER';
export const GET_GITHUB_INITIATE = 'GET_GITHUB_INITIATE';
export const GET_GITHUB_SUCCESS = 'GET_GITHUB_SUCCESS';
export const GET_GITHUB_FAIL = 'GET_GITHUB_FAIL';
export const CHAGE_USER_ID = 'CHAGE_USER_ID';
```

```
import Immutable from 'immutable';

export const UiState = Immutable.fromJS({
  spinnerVisible: false,
});

export const GithubState = Immutable.fromJS({
  userId: '',
  data: {},
});
```

```
import { handleActions } from 'redux-actions';
import { GithubState } from '../../constants/models';

import {
  GET_GITHUB_INITIATE,
  GET_GITHUB_SUCCESS,
  GET_GITHUB_FAIL,
  CHAGE_USER_ID,
} from '../../constants/actionTypes';

const githubReducers = handleActions({ 
  GET_GITHUB_SUCCESS: (state, { payload }) => (
    state.merge({
      data: payload.data,
    })
  ),  
  CHAGE_USER_ID: (state, { payload }) => (
    state.merge({
      'userId':
      payload.userId
    })
  ),
}, GithubState);

export default githubReducers;

```

```
import { handleActions } from 'redux-actions';
import { UiState } from '../../constants/models';

import {
  SHOW_SPINNER,
  HIDE_SPINNER,
} from '../../constants/actionTypes';

const uiReducers = handleActions({
  SHOW_SPINNER: (state) => (
    state.set(
      'spinnerVisible',
      true
    )
  ),
  HIDE_SPINNER: (state) => (
    state.set(
      'spinnerVisible',
      false
    )
  ),
}, UiState);

export default uiReducers;

```

```
import { combineReducers } from 'redux-immutable';
import ui from './ui/uiReducers';// import routes from './routes';
import github from './data/githubReducers';// import routes from './routes';

const rootReducer = combineReducers({
  ui,
  github,
});

export default rootReducer;

```

```
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Immutable from 'immutable';
import rootReducer from '../reducers';

const initialState = Immutable.Map();

export default createStore(
  rootReducer,
  initialState,
  applyMiddleware(reduxThunk, createLogger({ stateTransformer: state => state.toJS() }))
);

```

4. Build Component

```javascript
import React from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons/action/home';

const GithubBox = (props) => (
  <div>
    <Card>
      <CardHeader
        title={props.data.get('name')}
        subtitle={props.userId}
        avatar={props.data.get('avatar_url')}
      />
      <CardText>
        Followers : {props.data.get('followers')}
      </CardText>      
      <CardText>
        Following : {props.data.get('following')}
      </CardText>
      <CardActions>
        <Link to="/">
          <RaisedButton 
            label="Back" 
            icon={<ActionHome />}
            secondary={true} 
          />
        </Link>
      </CardActions>
    </Card> 
  </div>
);

export default GithubBox;
```

```javascript
import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import styles from './homePageStyles';

const HomePage = ({
  userId,
  onSubmitUserId,
  onChangeUserId,
}) => (
  <div>
    <TextField
      hintText="Please Key in your Github User Id."
      onChange={onChangeUserId}
    />
    <Link to={{ 
      pathname: '/result',
      query: { userId: userId }
    }}>
      <RaisedButton label="Submit" onClick={onSubmitUserId(userId)} primary />
    </Link>
  </div>
);

export default HomePage;
```

```javascript
import React from 'react';
import AppBar from 'material-ui/AppBar';

const Main = (props) => (
  <div>
    <AppBar
      title="Github Finder"
      showMenuIconButton={false}
    />
    <div>
      {props.children}
    </div>
  </div>
);

Main.propTypes = {
  children: React.PropTypes.object,
};

export default Main;
```

```javascript
import React from 'react';
import GithubBoxContainer from '../../containers/GithubBoxContainer';

const ResultPage = (props) => (
  <div> 
    <GithubBoxContainer data={props.data} userId={props.location.query.userId} />  
  </div>
);

export default ResultPage;
```

5. Connect State to Component

```javascript
import { connect } from 'react-redux';
import HomePage from '../../components/HomePage';

import {
  getGithub,
  changeUserId,
} from '../../actions';

export default connect(
  (state) => ({
    userId: state.getIn(['github', 'userId']),
  }),
  (dispatch) => ({
    onChangeUserId: (event) => (
      dispatch(changeUserId(event.target.value))
    ),
    onSubmitUserId: (userId) => () => (
      dispatch(getGithub(userId))
    ),
  }),
  (stateProps, dispatchProps, ownProps) => {
    const { userId } = stateProps;
    const { onSubmitUserId } = dispatchProps;
    return Object.assign({}, stateProps, dispatchProps, ownProps, {
      onSubmitUserId: onSubmitUserId(userId),
    });
  }
)(HomePage);
```

```javascript

import { connect } from 'react-redux';
import ResultPage from '../../components/ResultPage';

export default connect(
  (state) => ({
    data: state.getIn(['github', 'data'])    
  }),
  (dispatch) => ({})
)(ResultPage);
```

```javascript
import { connect } from 'react-redux';
import GithubBox from '../../components/GithubBox';

export default connect(
  (state) => ({}),
  (dispatch) => ({})
)(GithubBox);
```

6. That's it

![React Redux](./images/demo-1.png "React Redux")

## 總結

## 延伸閱讀

1. [Tutorial: build a weather app with React](http://joanmira.com/tutorial-build-a-weather-app-with-react/)
2. [OpenWeatherMap](http://openweathermap.org/)
3. [Weather Icons](https://erikflowers.github.io/weather-icons/)
4. [Weather API Icons](https://erikflowers.github.io/weather-icons/api-list.html)
5. [Material UI](http://www.material-ui.com/#/)
6. [【翻译】这个API很“迷人”——(新的Fetch API)](http://www.w3ctech.com/topic/854)
7. [Redux: trigger async data fetch on React view event](http://stackoverflow.com/questions/33304225/redux-trigger-async-data-fetch-on-react-view-event)
8. [Github API](https://api.github.com/)