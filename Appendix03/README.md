# 附錄三、React 測試入門教學

![React 測試入門教學](./images/mocha.png)

## 前言
測試是軟體開發中非常重要的一個環節，然而要在 React 中測試 Component 以及 JSX 語法時，使用傳統的測試工具並方便，所以在本章會介紹讀者整合  `Mocha` + `Chai`  官方提供的[測試工具](https://facebook.github.io/react/docs/test-utils.html)和 Airbnb 所設計的 [Enzyme](https://github.com/airbnb/enzyme)（由於官方的測試工具使用起來不太方便所以有第三方針對其進行封裝）。

## 測試初體驗
[Mocha](https://mochajs.org/) 是目前頗為流行的 JavaScript 測試框架之一，其可以很方便使用於瀏覽器端和 Node 環境。除了 Mocha 外，尚有許多 JavaScript 單元測試工具可以選擇（例如：[Jasmine](http://jasmine.github.io/)）、[Karma](http://karma-runner.github.io/1.0/index.html) 等，但本章我們主要使用 `Mocha` + `Chai` 結合 React 測試工具和 Enzyme 進行講解。

這邊我們主要介紹一些比較常用的 Mocha 使用方法：

1. 安裝環境與套件

```
$ npm install  --svae react react-dom
```

```
$ npm install --global mocha
```

```
$ npm install --save-dev babel-core babel-preset-es2015 chai mocha
```

2. 測試程式碼
	1. description（case suite）
	2. it（test case）

3. 整合 assert 函式庫 `Chai`

4. Mocha 基本用法

mocha 預設執行`test` 資料夾下第一層的測試程式碼。若要讓 `test` 資料夾中的測試碼也執行要加上 `--recursive` 參數。 

Component
1. Shallow Rendering
2. DOM Rendering

[Enzyme](https://github.com/airbnb/enzyme) 提供了類似 jQuery API 的選取元素的方式

## 動手實作

## 總結

## 延伸閱讀
1. [React 测试入门教程](http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html)
2. [测试框架 Mocha 实例教程](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
3. [Test Utilities](https://facebook.github.io/react/docs/test-utils.html)
4. [JavaScript Testing utilities for React](https://github.com/airbnb/enzyme)
5. [持续集成是什么？](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)
6. [Let’s test React components with TDD, Mocha, Chai, and jsdom](https://medium.freecodecamp.com/simple-react-testing-d9e25ec87e2)

（image via [Anthony Ng](https://cdn-images-1.medium.com/max/800/1*CrB6isZN6YXeM1rWmnjxHw.png)）