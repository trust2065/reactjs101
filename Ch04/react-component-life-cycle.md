# React Component 生命週期

## 前言

## 生命週期
一般而言 React Component 有以下三種生命週期的狀態，就像人一樣會有生老病死。

1. Mounting：已插入真實 DOM
2. Updating：正在被重新渲染
3. Unmounting：已移出真實 DOM

componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()

特殊處理的函數

componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

目前預設 return true

若採用 immutable 可以使用 nextProps === this.props 比對是否有變動

## Ajax 非同步處理
componentDidMount