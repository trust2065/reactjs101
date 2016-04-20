# Ch01 前端工程和 React 生態系簡介

## 前言
隨著現代化網站（Modern Web）開發專業和複雜性的提昇以及對於使用者體驗的要求下，網站開發已從過去的Web Develpoer（或現在我們稱的Full Stack Engineer）一夫當關，轉向專業分工，更加細分成網頁前端（Web Front End）、網頁後端（Web Back End）等職位。此外，由於跨平台、跨瀏覽器的需求日益增加，技術變化更迭快速，市場上對於前端工程師（Web Front End Engineer）的需求也與日俱增，前端工程的（Front End Engineering）挑戰也越來越多。

## 前端工程範疇
HTML、CSS 和 JavaScript 是前端工程最重要的技術元素。過去一段時間，我們所認為的前端工程主要專注在瀏覽器平台，但現在的 Web 平台已經不侷限於桌面瀏覽器，更多的跨平台、跨瀏覽器的應用開發，其中包含：

1. 網頁瀏覽器（Web Browser），一般的網頁應用程式開發
2. 透過 CLI 指令去操作的 Headless 瀏覽器（Headless　Application）。例如：phantomJS、CasperJS
3. 運作在 WebView 瀏覽器核心（WebView Application）的應用。例如：Apache Cordova、Electron、NW.js
4. 原生應用程式（Native Application），透過 Web 技術撰寫原生應用程式。例如：React Native、Native Script

過去幾年，前端開發就像經歷了文藝復興（Rinascimento）的年代，開始了各種框架、套件百花齊放的時代。雖然現在有更多好用工具可以協助開發，但前端工程師似乎並沒有變得比較輕鬆。以往若能妥善運用 jQuery 等函式庫就可以應付大部分前端工程師的工作，但現在前端徵人廣告上不僅要求精通 HTML、CSS 和 JavaScript，還要對於還要對於 Backbone、Ember、Angular、React 等 JavaScript 框架或函式庫有一定程度的了解。

其中 [React](https://facebook.github.io/react/) 是 Facebook 推出的開源 [JavaScript](https://en.wikipedia.org/wiki/JavaScript) Library，它的出現帶出了許多革新性的 Web 觀念開始流行，例如：Virtual DOM、Web Component 等。而自從 React 於 2013 年正式開源後，React 生態系開始蓬勃發展。事實上，透過學習 React 生態系（ecosystem）的過程中，可以讓我們順便學習現代化 Web 開發的重要觀念（例如：ES6、[Webpack](https://github.com/webpack/webpack)、[Bable](https://babeljs.io/)、模組化等）。本書筆者主要是希望藉由一個整合 Github API 的應用範例深入淺出的教學介紹 ReactJS 生態系，並帶領讀者們探討前端工程中軟體工程的部份。



