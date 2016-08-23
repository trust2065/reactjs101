# ImmutableJS 入門教學

![ImmutableJS](./images/immutable.png "ImmutableJS")

## 前言
一般來說在 JavaScript 中有兩種資料類型：Primitive（String、Number、Boolean、null、undefinded）Object（Reference），在 JavaScript 中物件的操作比起 Java 容易很多，但也因為相對不嚴謹，所以產生了一些問題。在 JavaScript 中的 Object（物件）資料是 Mutable（可以變的），由於是使用 Reference 的方式，所以當修改到複製的值也會修改到原始值。一般作法是使用 `shallowCopy` 或 `deepCopy` 來避免修改，但這樣作法會產生較多的資源浪費。為了很好的解決這個問題，我們可以使用 `Immutable Data`，所謂的 Immutable Data 就是一旦建立，就不能再被修改的數據資料。

為了解決這個問題，在 2013 年時 Facebook 工程師打造了 `ImmutableJS`，但並沒有被預設放到 React 工具包中（雖然有提供簡化的 Helper），但 `ImmutableJS` 的出現確實解決了 `React` 甚至 `Redux` 所遇到的一些問題。

## ImmutableJS 初體驗
1. Persistent data structure
Immutable.js 提供了 7 種不可修改的資料類型：List、Map、Stack、OrderedMap、Set、OrderedSet、Record。若是對 Immutable 物件操作都會返回新值。

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
## 總結
和 Flux/Redux 整合。 

## 延伸閱讀
1. [官方網站](https://facebook.github.io/immutable-js/)
2. [Immutable.js初识](http://www.w3cplus.com/javascript/immutable-js.html)
3. [Immutable 详解及 React 中实践](https://github.com/camsong/blog/issues/3)
4. [为什么需要Immutable.js](http://zhenhua-lee.github.io/react/Immutable.html)
5. [facebook immutable.js 意义何在，使用场景？](https://www.zhihu.com/question/28016223)
6. [React 巢狀 Component 效能優化](https://blog.wuct.me/react-%E5%B7%A2%E7%8B%80-component-%E6%95%88%E8%83%BD%E5%84%AA%E5%8C%96-b01d8a0d3eff#.3kf4h1xq1)
7. [PureRenderMixin](https://facebook.github.io/react/docs/pure-render-mixin.html)
8. [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)

（image via [risingstack](https://risingstack-blog.s3.amazonaws.com/2016/Jan/immutable_logo_for_react_js_best_practices-1453211749818.png)）