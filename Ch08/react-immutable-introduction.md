# ImmutableJS 入門教學

## 前言
在 JavaScript 中的物件資料是可以變的（Mutable），由於是使用引用方式給值，所以當修改到複製的值也會修改到原始值。一般作法是使用 shallowCopy 或 deepCopy 來避免修改，但這樣作法會資源的浪費。為了很好的解決這個問題，我們可以使用 `Immutable Data`，所謂的 Immutable Data 就是一旦建立，就不能再被修改的數據資料。於 2013 時 Facebook 工程師打造了 `ImmutableJS`，但並沒有被預設放到 React 工具包中（雖然有提供簡化的 Helper）。

javascript(es5)中存在两类数据结构: primitive value(string、number、boolean、null、undefined)、object(reference)。在编译型语言(例如java)也存在object，但是js中的对象非常灵活、多变，这给我们的开发带来了不少好处，但是也引起了非常多的问题。

## ImmutableJS 初體驗

1. Persistent data structure
Immutable.js提供了7种不可变的数据类型: List、Map Stack OrderedMap Set OrderedSet Record。对Immutable对象的操作均会返回新的对象，例如：

2. structural sharing

3. support lazy operation


4. 豐富 API

5. Functional Programming

## 與 React 效能調教
```javascript
shouldComponentUpdate (nextProps) {
    return this.props.value !== nextProps.value;
}
```

## 與 Redux 做整合

## 延伸閱讀
1. [官方網站](https://facebook.github.io/immutable-js/)
2. [Immutable.js初识](http://www.w3cplus.com/javascript/immutable-js.html)
3. [Immutable 详解及 React 中实践](https://github.com/camsong/blog/issues/3)
4. [为什么需要Immutable.js](http://zhenhua-lee.github.io/react/Immutable.html)
5. [facebook immutable.js 意义何在，使用场景？](https://www.zhihu.com/question/28016223)
6. [React 巢狀 Component 效能優化](https://blog.wuct.me/react-%E5%B7%A2%E7%8B%80-component-%E6%95%88%E8%83%BD%E5%84%AA%E5%8C%96-b01d8a0d3eff#.3kf4h1xq1)
7. [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html)
