# 從零開始學習 Flux 架構

## 前言
[Flux](https://facebook.github.io/flux/) 是 Facebook 推出的 client-side 應用程式架構（Architecture），並非一個完整的前端框架，其特色在於實現了 Unidirectional Data Flow（單向流）的資料流處理方式，在開發複雜的大型應用程式時可以更容易地管理 state（狀態）。由於 React 主要是負責 View 的部份，所以透過搭配 Flux-like 的資料處理架構，可以更好的去管理我們的 state（狀態）。

由於原始的 Flux 架構在實現上有些部分可以精簡，在實務上我們通常會使用 Flux-like 相關的架構實現（例如：Redux、Alt、Reflux 等），不過這邊我們主要會使用 Facebook 本身提供 Dispatcher 函式庫（可以想成是一個 pub/sub 處理器，透過 broadcast 將 payloads 傳給註冊的 callback function）並搭配 NodeJS 的 EventEmitter 模組去完成 Flux 架構的實現。

1. Actions - pub/sub
2. Dispatcher
3. Stores
4. Controller Views

## 延伸閱讀
1. [Getting To Know Flux, the React.js Architecture](https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture)
2. [Flux 官方網站](https://facebook.github.io/flux/)
3. [從 Flux 與 MVC 的差異來簡介 Flux](http://blog.techbridge.cc/2016/04/29/introduce-flux-from-flux-and-mvc/)
4. [Flux Stores and ES6](https://medium.com/@softwarecf/flux-stores-and-es6-9b453dbf9db#.uuf1ddj8u)
5. [React and Flux: Migrating to ES6 with Babel and ESLint](https://medium.com/front-end-developers/react-and-flux-migrating-to-es6-with-babel-and-eslint-6390cf4fd878#.vafamphwy)
6. [Building an ES6/JSX/React Flux App – Part 2 – The Flux](https://shellmonger.com/2015/08/17/building-an-es6jsxreact-flux-app-part-2-the-flux/)
