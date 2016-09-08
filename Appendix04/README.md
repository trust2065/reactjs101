# 附錄四、GraphQL/Relay 初體驗

![Relay/GraphQL 初體驗](./images/relay-graphql.png)

## 前言
GraphQL 的出現主要是為了要解決 Web/Mobile 端不斷增加的 API 請求所衍生的問題。由於 RESTful 最大的功能在於很有效的前後端分離和建立 stateless 請求，然而 RESTful API 的資源設計上比較偏向單方面的互動，若是有著複雜資源間的關聯就會出現請求次數過多，遇到不少的瓶頸。

## GraphQL 初體驗

>GraphQL is a data query language and runtime designed and used at Facebook to request and deliver data to mobile and web apps since 2012.

根據 [GraphQL 官方網站](http://graphql.org/)的定義，GraphQL 是一個資料查詢語言和 runtime。Query responses 是由 client 所宣告決定，而非 server 端，且只會回傳 client 所宣告的內容。此外，GraphQL 是強型別（strong type）且可以容易使用階層（hierarchical）和處理複雜的資料關連性，並更容易讓前端工程師和產品工程師使用。

一般 RESTful 在取用資源時會對應到 HTTP 中 `GET`、`POST`、`DELETE`、`PUT` 等方法，並以 URL 對應的方式去取得資源，例如：

取得 id 為 3500401 的使用者資料：

GET `/users/3500401`

以下則是 GraphQL 宣告的 query 範例，宣告式（declarative）的方式比起 RESTful 感覺起來相對直觀：

```javascript
{
  user(id: 3500401) {
    id,
    name,
    isViewerFriend,
    profilePicture(size: 50)  {
      uri,
      width,
      height
    }
  }
}
```

接收到 GraphQL query 後 server 回傳結果：

```javascript
{
  "user" : {
    "id": 3500401,
    "name": "Jing Chen",
    "isViewerFriend": true,
    "profilePicture": {
      "uri": "http://someurl.cdn/pic.jpg",
      "width": 50,
      "height": 50
    }
  }
}
```

```
import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});
```

```
var query = '{ hello }';

graphql(schema, query).then(result => {

  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(result);

});
```

```
$ npm install --save express-graphql
```

```javascript
const express = require('express');
const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: MyGraphQLSchema,
  graphiql: true
}));

app.listen(4000);
```

## Relay 初體驗

![Relay/GraphQL 初體驗](./images/relay-architecture.png)

```
class Tea extends React.Component {
  render() {
    var {name, steepingTime} = this.props.tea;
    return (
      <li key={name}>
        {name} (<em>{steepingTime} min</em>)
      </li>
    );
  }
}
Tea = Relay.createContainer(Tea, {
  fragments: {
    tea: () => Relay.QL`
      fragment on Tea {
        name,
        steepingTime,
      }
    `,
  },
});

class TeaStore extends React.Component {
  render() {
    return <ul>
      {this.props.store.teas.map(
        tea => <Tea tea={tea} />
      )}
    </ul>;
  }
}
TeaStore = Relay.createContainer(TeaStore, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        teas { ${Tea.getFragment('tea')} },
      }
    `,
  },
});

class TeaHomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query TeaStoreQuery {
        store { ${Component.getFragment('store')} },
      }
    `,
  };
}

ReactDOM.render(
  <Relay.RootContainer
    Component={TeaStore}
    route={new TeaHomeRoute()}
  />,
  mountNode
);
```

```
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

const STORE = {
  teas: [
    {name: 'Earl Grey Blue Star', steepingTime: 5},
    {name: 'Milk Oolong', steepingTime: 3},
    {name: 'Gunpowder Golden Temple', steepingTime: 3},
    {name: 'Assam Hatimara', steepingTime: 5},
    {name: 'Bancha', steepingTime: 2},
    {name: 'Ceylon New Vithanakande', steepingTime: 5},
    {name: 'Golden Tip Yunnan', steepingTime: 5},
    {name: 'Jasmine Phoenix Pearls', steepingTime: 3},
    {name: 'Kenya Milima', steepingTime: 5},
    {name: 'Pu Erh First Grade', steepingTime: 4},
    {name: 'Sencha Makoto', steepingTime: 2},
  ],
};

var TeaType = new GraphQLObjectType({
  name: 'Tea',
  fields: () => ({
    name: {type: GraphQLString},
    steepingTime: {type: GraphQLInt},
  }),
});

var StoreType = new GraphQLObjectType({
  name: 'Store',
  fields: () => ({
    teas: {type: new GraphQLList(TeaType)},
  }),
});

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      store: {
        type: StoreType,
        resolve: () => STORE,
      },
    }),
  }),
});
```

## 總結
React 生態系中，除了前端 View 的部份有革新性的創新外，GraphQL 更是對於資料取得的全新思路。雖然 GraphQL 和 Relay 已經成為開源專案，但技術上仍持續演進，若需要在團隊 production 上導入仍可以持續觀察。到這邊，若是一路從第一章看到這裡的讀者真的要給自己一個熱烈掌聲了，我知道對於初學者來說 React 龐大且有許多的新的觀念需要消化，但如同筆者在最初時所提到的，學習 React 重要的是透過這個生態系去學習現代化網頁開發的工具和方法以及思路，成為更好的開發者。根據前端摩爾定律，每半年就有一次大變革，但基本 Web 問題和觀念依然不變，大家一起加油啦！ 

## 延伸閱讀
1. [Your First GraphQL Server](https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2#.7e02np1rs)
2. [搭建你的第一个 GraphQL 服务器](http://qianduan.guru/2016/01/03/Your-First-GraphQL-Server/)
3. [Learn GraphQL](https://learngraphql.com/)
4. [GraphQL vs Relay](https://kadira.io/blog/graphql/graphql-vs-relay)
5. [GraphQL 官網](http://graphql.org/)
6. [Relay 官網](https://facebook.github.io/relay/)
7. [A reference implementation of GraphQL for JavaScript](https://github.com/graphql/graphql-js)

（image via [facebook](https://facebook.github.io/react/img/blog/relay-components/relay-architecture.png)、[kadira](https://cldup.com/uhBzqnK002.png)）