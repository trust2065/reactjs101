# Container 與 Presentational Components

Redux 的 React 綁定擁抱了分離 Presentational 和 Container Component 的概念

	Presentational Components	Container Components
用途	怎麼看事情（markup, styles)	怎麼做事情 (抓資料, 更新state)
意識到 Redux	否	是
取得資料	從 props 讀取資料	訂閱 Redux state
改變資料	從 props 呼叫 callback	Dispatch Redux action
從哪被寫入	經由手動	通常由 React Redux 產生

## 延伸閱讀
1. [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.vtcuxsurv)
2. [Redux Usage with React](http://redux.js.org/docs/basics/UsageWithReact.html)