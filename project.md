
### 开发

#### 约定
- 本项目开发“硬件”环境
  - 各小组成员使用统一环境：vagrant，采取debian8.5版本（要求熟悉基本Linux操作）
  - 项目目录：/vagrant/cpmall_react/（默认vagrant共享目录），其中node_modules实际路径映射为 ~/coolpad/cpmall_react/node_modules

#### 项目结构

``` bash
vagrant@debian-8:~/coolpad/cpmall_react$ ls -l /vagrant/cpmall_react/
├── api
│   ├── actions
│   ├── __tests__
│   └── utils
├── app.json
├── bin
│   ├── api.js
│   ├── server.js（服务器启动入口）
├── docs（开发教程）
│   ├── AddingAPage
│   ├── AddingToHomePage
│   ├── ExploringTheDemoApp
│   └── InstallingTheKit
├── lib
│   └── vendor（第三方js库）
├── node_modules -> /home/vagrant/coolpad/cpmall_react/node_modules
├── src
│   ├── components（项目组件）
│   ├── containers（项目页面或模块）
│   ├── helpers（项目辅助文件）
│   ├── redux（a predictable state container）
│   ├── theme（样式主题配置，可去掉）
│   └── utils（项目工具库）
├── static
│   ├── css（第三方样式库）
│   ├── js（项目js公共库）
│   └── sass（项目公共样式库）
├── webpack
│   ├── dev.config.js（开发环境脚本）
│   ├── prod.config.js（生产环境）
│   ├── webpack-dev-server.js（开发环境服务器脚本）
│   └── webpack-isomorphic-tools（构建辅助脚本）
├── circle.yml（Travis CI等配置文件）
├── karma.conf.js（测试配置文件）
├── server.babel.js（babel编译辅助文件）
├── package.json（项目配置文件）
├── project.md（本项目开发文档）
├── README.md（本项目默认说明文档）
└── tests.webpack.js
```

#### 开发单页路由
- src/routes.js
  - `<IndexRoute component={Home}/>`，默认首页
  - `<Route path="product_detail/:id"`, 商品详情页
  - `<Route path="cart"`, 购物车页

#### 开发模拟后端接口

> 模拟接口以目录为映射形式，比如cart/get-cart-json接口，则映射为cart目录(api/actions/page/cart/index.js)
> 独立访问接口：http://localhost:3030/cart/get-cart-json

- 模拟接口：api/actions，对接src/redux/modules/reducer.js
  - api/apifix.js
  - 页面：首页
    - api/actions/page/cpmallIndex.js
    - src/redux/modules/page.js#loadIndex
  - 页面：商品详情页
  - 页面：购物车页(api/actions/page/cart/index)
    - api/actions/page/cart/get-cart-json
    - src/redux/modules/page.js#loadCart
  - 交互：购物车增/删商品数量
  - 交互：购物车增/删保障服务
  - 交互：购物车选择/取消选择条目
  - 交互：购物车前往下单
  - 页面：订单确认页
  - 页面：订单支付页
  - 页面：全部商品页
  - 个人中心 - 我的账号（地址管理，优惠券管理）
  - 个人中心 - 订单列表
  - 个人中心 - 订单详情

#### webpack/dev.config.js

``` javascript
// line 9
var host = '192.168.31.98';       // 修改为自己内网的ip
```

### 项目必备知识
- [webpack 2.x](https://webpack.js.org/configuration/)
- [react官网](https://facebook.github.io/react/)
- [react中文](http://react-china.org/)
- [react-redux文档](http://redux.js.org/)
- [react-router 文档](https://github.com/reacttraining/react-router)
- [react-helmet 文档](https://github.com/nfl/react-helmet)
- [express 4.x](http://expressjs.com/en/guide/routing.html)
- [pm2监控](http://pm2.keymetrics.io/)
- [深入理解 react-router 路由系统](https://zhuanlan.zhihu.com/p/20381597?columnSlug=purerender)
- [React Tutorial: Cloning Yelp](https://www.fullstackreact.com/articles/react-tutorial-cloning-yelp/)

### 修改插件等（已废弃,不采用bootstrap）

#### node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_navbar.scss

``` scss
// line 35
// line 67
// line 267
// line 582
&.collapse {
  // modified by kevin
  // display: block !imortant;
  // height: auto !important;
  padding-bottom: 0; // Override default setting
  overflow: visible !important;
}
```