# 附錄三、React 測試入門教學

![React 測試入門教學](./images/mocha.png)

## 前言
測試是軟體開發中非常重要的一個環節，本章我們將帶領大家從撰寫最簡單的測試程式碼到整合 `Mocha` + `Chai` 官方提供的[測試工具](https://facebook.github.io/react/docs/test-utils.html)和 Airbnb 所設計的 [Enzyme](https://github.com/airbnb/enzyme)進行 React 測試。

## Mocha 測試初體驗
[Mocha](https://mochajs.org/) 是目前頗為流行的 JavaScript 測試框架之一，其可以很方便使用於瀏覽器端和 Node 環境。

>Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun. Mocha tests run serially, allowing for flexible and accurate reporting, while mapping uncaught exceptions to the correct test cases.

除了 Mocha 外，尚有許多 JavaScript 單元測試工具可以選擇（例如：[Jasmine](http://jasmine.github.io/)）、[Karma](http://karma-runner.github.io/1.0/index.html) 等，但本章我們主要使用 `Mocha` + `Chai` 結合 React 測試工具和 Enzyme 進行講解。

在這邊我們先介紹一些比較常用的 Mocha 使用方法，讓大家熟悉測試的用法：

1. 安裝環境與套件

```
$ npm install --save react react-dom
```

```
$ npm install --global mocha
```

```
$ npm install --save-dev babel-core babel-loader babel-eslint babel-preset-react babel-preset-es2015 eslint eslint-config-airbnb eslint-loader eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react webpack webpack-dev-server html-webpack-plugin chai mocha
```

2. 測試程式碼
	1. describe（test suite）：表示一組相關的測試。describe 為一個函數，第一個參數為 test suite 的名稱，第二個參數為實際執行的函數。
	2. it（test case）：表示一個單獨測試，為測試裡最小單位。it 為一個函數，第一個參數為 test case 的描述名稱，第二個參數為實際執行的函數。

	在測試程式碼中會包含一個或多個 test suite，而每個 test suite 則會包含一個或多個 test case。

3. 整合 assertion 函式庫 `Chai`

所謂的 assertion（斷言），就是判斷程式碼的執行成果是否和預期一樣，若是不一致則會發生錯誤。通常一個 test case 會擁有一個或多個 assertion。由於 Mocha 本身是一個測試框架，但不包含 assertion，所以我們使用 [Chai](http://chaijs.com/) 這個適用於瀏覽器端和 Node 端的 BDD / TDD assertion library。在 Chai 中共提供三種操作 assertion 介面風格：Expect、Assert、Should，在這邊我們選擇使用比較接近自然語言的 Expect。

基本上，expect断言的写法都是一样的。头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等。两者之间使用to或to.be连接。


4. Mocha 基本用法

mocha 預設執行 `test` 資料夾下第一層的測試程式碼。若要讓 `test` 資料夾中的子資料夾測試碼也執行則要加上 `--recursive` 參數。 

```
$ mocha 
```

```
$ mocha file1.js 
```

```
$ mocha file1.js file2.js
```

但由於我們使用了，ES6 的語法所以必須使用 bable 進行轉譯，否則會出現類似以下的錯誤：

```
import add from '../src/modules/add';
^^^^^^
```

設定 `.bablerc`

```
{
	"presets": [
  	"es2015",
  	"react",
 	],
	"plugins": []
}
```

更改 `package.json` 中的 `scripts`：

```
$ ./node_modules/mocha/bin/mocha --compilers js:babel-core/register
```

```
$ mocha --compilers js:babel-core/register
```

```
$ mocha add.test.js

  test add function
    ✓ 1 + 1 = 2


  1 passing (181ms)
```

5. Mocha 指令參數
在 Mocha 中有許多可以使用的好用參數，例如：`--recursive` 可以執行執行測試資料夾下的子資料夾程式碼、`--reporter 格式` 更改測試報告格式（預設是 `spec`，也可以更改為 `tap`）、`--watch` 用來監控測試程式碼，當有測試程式碼更新就會重新執行、`--grep` 擷取符合條件的 test case。

以上這些參數我們可以都整理在 `test` 資料夾下的 `mocha.opts` 檔案中當作設定資料，此時再次執行 `npm run test` 就會把參數也使用進去。

```
--watch
--reporter spec
```

6. 非同步測試
在上面我們討論的主要是同步的狀況，但實際上在開發應用時往往會遇到非同步的情形。而在 Mocha 中每個 test case 最多允許執行 2000 毫秒，當時間超過就會顯示錯誤，然而實際上，為了解決這個：

為了展現測試非同步的情境，所以我們必須先安裝 [axios](https://github.com/mzabriskie/axios)

```
$ npm install --save axios
```

```javascript
import axios from 'axios';
import { expect } from 'chai';

it('asynchronous return an object', function(done){
  axios
    .get('https://api.github.com/users/torvus')
    .then(function (response) {
      expect(response).to.be.an('object');
      done();
    })
    .catch(function (error) {
      console.log(error);
    });
});
```

由於測試環境是在 Node 中，所以我們必須先安裝 [node-fetch](https://github.com/bitinn/node-fetch)

```
$ npm install --save node-fetch 
```

```javascript
import fetch from 'node-fetch';
import { expect } from 'chai';

it('asynchronous fetch promise', function() {
  return fetch('https://api.github.com/users/torvus')
    .then(function(response) { return response.json() })
    .then(function(json) { 
      expect(json).to.be.an('object');
    });
});
```

7. 測試使用的 hook

在 Mocha 中的 test suite 中，有 before()、after()、beforeEach() 和 afterEach() 四種 hook，可以讓你設計在特定時間點執行測試。

```javascript
describe('hooks', function() {
  before(function() {
    // 在 before 中的 test case 會在所有 test cases 前執行
  });
  after(function() {
    // 在 after 中的 test case 會在所有 test cases 後執行
  });
  beforeEach(function() {
    // 在 beforeEach 中的 test case 會在每個 test cases 前執行
  });
  afterEach(function() {
    // 在 afterEach 中的 test case 會在每個 test cases 後執行
  });
  // test cases
});
```

## 動手實作
在上面我們已經先講解了 `Mocha` + `Chai` 測試工具和基礎的測試寫法。現在接著我們要來探討 React 中的測試用法。然而，要在 React 中測試 Component 以及 JSX 語法時，使用傳統的測試工具並不方便，所以要整合 `Mocha` + `Chai` 官方提供的[測試工具](https://facebook.github.io/react/docs/test-utils.html)和 Airbnb 所設計的 [Enzyme](https://github.com/airbnb/enzyme)（由於官方的測試工具使用起來不太方便所以有第三方針對其進行封裝）進行測試。

### 使用官方測試工具
我們知道在 React 一個重要的特色為 Virtual DOM 所以在官方的測試工具中有提供測試 Virtual DOM 的方法：Shallow Rendering（createRenderer），以及測試真實 DOM 的方法：DOM Rendering（renderIntoDocument）。

1. Shallow Rendering（createRenderer）

Shallow Rendering 係指將一個 Virtual DOM 渲染成子 Component，但是只渲染第一層，不渲染所有子元件，因此處理速度快且不需要 DOM 環境。Shallow rendering 在單元測試非常有用，由於只測試一個特定的 component，而重要的不是它的 children。這也意味著改變一個 child component 不會影響 parent component 的測試。

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import Main from '../src/components/Main';

function shallowRender(Component) {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component/>);
  return renderer.getRenderOutput();
}

describe('Shallow Rendering', function () {
  it('Main title should be h1', function () {
    const todoItem = shallowRender(Main);
    expect(todoItem.props.children[0].type).to.equal('h1');
    expect(todoItem.props.children[0].props.children).to.equal('Todos');
  });
});
```

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import TodoList from '../src/components/TodoList';

const shallowRender = (Component, props) => {
  const renderer = TestUtils.createRenderer();
  renderer.render(<Component {...props}/>);
  return renderer.getRenderOutput();
}

describe('Shallow Props Rendering', () => {
  it('TodoList props check', () => {
    const todos = [{ id: 0, text: 'reading'}, { id: 1, text: 'coding'}];
    const todoList = shallowRender(TodoList, {todos: todos});
    expect(todoList.props.children.type).to.equal('ul');
    expect(todoList.props.children.props.children[0].props.children).to.equal('reading');
    expect(todoList.props.children.props.children[1].props.children).to.equal('coding');
  });
});
```

2. DOM Rendering（renderIntoDocument）
注意，因為 Mocha 運行在 Node 環境中，所以你不會存取到 DOM。所以我們要使用 JSDOM 來模擬真實 DOM 環境。同時我在這邊引入 `react-dom`，這樣我們就可以使用 findDOMNode 來選取元素。事實上，findDOMNode 方法的最大優勢是提供比 TestUtils 更好的 CSS 選擇器，方便開發者選擇元素。

```javascript
import jsdom from 'jsdom';

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><head></head><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}
```

```javascript
import React from 'react';

class TodoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.toggleButton = this.toggleButton.bind(this);
    this.state = {
      isActivated: false,
    };
  }
  toggleButton() {
    this.setState({
      isActivated: !this.state.isActivated,      
    })
  }
  render() {
    return (
      <div>
        <button disabled={this.state.isActivated} onClick={this.toggleButton}>Add</button>
      </div>
    );
  };
}

export default TodoHeader;
```

```javascript
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import { findDOMNode } from 'react-dom';
import TodoHeader from '../src/components/TodoHeader';

describe('Simulate Event', function () {
  it('When click the button, it will be toggle', function () {
    const TodoHeaderApp = TestUtils.renderIntoDocument(<TodoHeader />);
    const TodoHeaderDOM = findDOMNode(TodoHeaderApp);
    const button = TodoHeaderDOM.querySelector('button');
    TestUtils.Simulate.click(button);
    let todoHeaderButtonAfterClick = TodoHeaderDOM.querySelector('button').disabled;
    expect(todoHeaderButtonAfterClick).to.equal(true);
  });
});
```

這種渲染 DOM 的測試方式類似於 JavaScript 或 jQuery 的 DOM 操作。首先要先找到欲操作的目標節點，而後觸發想要執行的動作，在官方測試工具中擁有許多可以[協助選取節點的方法](https://facebook.github.io/react/docs/test-utils.html#scryrenderedcomponentswithtype)。然而由於其在使用上不夠簡潔，也因此我們接下來將介紹由 Airbnb 所設計的 [Enzyme](https://github.com/airbnb/enzyme)進行 React 測試。

### 使用 Enzyme 函式庫進行測試
[Enzyme](https://github.com/airbnb/enzyme) 優勢是在於針對官方測試工具封裝成了類似 jQuery API 的選取元素的方式。根據官方網站介紹 Enzyme 將更容易地去操作選取 React Component：

> Enzyme is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components’ output.
Enzyme is unopinionated regarding which test runner or assertion library you use, and should be compatible with all major test runners and assertion libraries out there.

在 Enzyme 有三個主要的 API 方法：

1. Shallow Rendering

shallow 方法事實上就是官方測試工具的 shallow rendering 封装。

2. Static Rendering

render 方法是將 React 元件渲染成靜態的 HTML 字串，並利用 Cheerio 函式庫（這點和 shallow 不同）分析其結構返回物件。

3. Full Rendering

mount 方法 React 元件載入真實 DOM 節點。

更多 Enzyme API 可以[參考官方文件](http://airbnb.io/enzyme/docs/api/index.html)。

## 總結
以上我們介紹了測試工具的寫法。

## 延伸閱讀
1. [React 测试入门教程](http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html)
2. [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
3. [Test Utilities](https://facebook.github.io/react/docs/test-utils.html)
4. [JavaScript Testing utilities for React](https://github.com/airbnb/enzyme)
5. [持续集成是什么？](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)
6. [Let’s test React components with TDD, Mocha, Chai, and jsdom](https://medium.freecodecamp.com/simple-react-testing-d9e25ec87e2)
7. [Unit Testing React-Native Components with Enzyme Part 1](https://kyrisu.com/2016/01/31/unit-testing-react-native-components-with-enzyme-part-1/)
8. [What React Stateless Components Are Missing](http://jaketrent.com/post/react-stateless-components-missing/)
9. [0.14-rc1: findDOMNode(statelessComponent) doesn’t work with TestUtils.renderIntoDocument #4839](https://github.com/facebook/react/issues/4839)
10. [Writing Redux Tests](http://redux.js.org/docs/recipes/WritingTests.html)
11. [【译】展望2016，React.js 最佳实践 (中英对照版)](http://blog.jimmylv.info/2016-01-22-React.js-Best-Practices-for-2016/)

（image via [Anthony Ng](https://cdn-images-1.medium.com/max/800/1*CrB6isZN6YXeM1rWmnjxHw.png)）