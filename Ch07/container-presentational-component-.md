# Container 與 Presentational Components

Redux 的 React 綁定擁抱了分離 Presentational 和 Container Component 的概念

## 差異比較
1. Presentational Components	
	- 用途：怎麼看事情（Markup、外觀）
	- 是否讓 Redux 意識到：否
	- 取得資料方式：從 props 取得
	- 改變資料方式：從 props 去呼叫 callback function
  - 寫入方式：手動處理

2. Container Components
 - 用途：怎麼做事情（擷取資料，更新 State）
 - 是否讓 Redux 意識到：是
 - 取得資料方式：訂閱 Redux State
 - 改變資料方式：Dispatch Redux Action
 - 寫入方式：從 React Redux 產生

元件防呆

High Order Component

## 延伸閱讀
1. [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.vtcuxsurv)
2. [Redux Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html)