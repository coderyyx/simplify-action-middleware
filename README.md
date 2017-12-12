# simplify-action-middleware
提高redux 的dispatch的能力，精简action部分。为了兼容目前框架，采用jquery进行web请求后期可改为whatwg-fetch；
部分内容需要配置，如果有额外需求的同学可以联系我~~
___________________________________________


[![travis][travis-image]][travis-url]
[![dep][dep-image]][dep-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/then/simplify-action-middleware.svg?style=flat
[travis-url]: https://travis-ci.org/then/simplify-action-middleware
[dep-image]: https://img.shields.io/david/then/simplify-action-middleware.svg?style=flat
[dep-url]: https://david-dm.org/then/simplify-action-middleware
[npm-image]: https://img.shields.io/npm/v/simplify-action-middleware.svg?style=flat
[npm-url]: https://npmjs.org/package/simplify-action-middleware
[downloads-image]: https://img.shields.io/npm/dm/simplify-action-middleware.svg?style=flat
[downloads-url]: https://npmjs.org/package/simplify-action-middleware

##install:
<code>npm install simplify-action-middleware</code>

## Tips
如果对于options配置项有更多需求的可以联系我，大家一起丰富。
___________________________________________
## Usage simplify-action-middleware

```javascript
import simplify  from 'simplify-action-middleware';
```
##redux中间件的目的是在action阶段做一些处理，用来增强dispatch的能力
所以我们在创建sotre的时候注入中间件，并且与其他中间件兼容，开发这个中间件的目的是为了简化
action过程的一些操作，同时处理了**异步action**，在对现有项目改造阶段同时引入
thunk和simplify,
是为了兼容两种不同对于异步action的处理方式，并不会引起冲突；
options 是一个配置对象，用来传入一些外部的函数处理一些异常 exp:session超时的处理、
或者一些模态框函数、

```javascript
var store = createStore(
    combineReducers(reducers),
    compose(applyMiddleware(thunk,silplify(options)))
);
```
##
这是一个注入到页面的action，使用simplify后就这么精简就可以了，区别之前繁琐的aciton构造，
提高开发效率，让开发者专注于业务组件和数据流的设计而不用关心框架其他方面。
当然这个返回的对象也是可以配置的，
```javascript
export const searchTreatCases = (postData) =>{
  return {
      url:'../patient/patientCaseSearch',
      data:{"params":JSON.stringify(postData)},
      types:['SEARCHTREAT_START','SEARCHTREAT_SUCCESS',null]
    }
}

配置对象：
configObj :
    url , 
    types , 
    method , 
    data , 
    async, 
    contentType
```
只需要传入一些请求必须的参数，需要拓展的可以联系我；
目前我们仍引用了juqery库作为web请求的库（import $ form ‘jquery’），
后期随着项目的改进可改为fetch。

