import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// We are using Webpack code splitting here so that each route's associated
// component code is loaded on-demand only when the route is visited.
// It's actually not really necessary for a small project of this size but
// the goal is to demonstrate how to do it.
//
// Note that the dynamic import syntax should actually be just `import()`
// but buble/acorn doesn't support parsing that syntax until it's stage 4
// so we use the old System.import here instead.
//
// If using Babel, `import()` can be supported via
// babel-plugin-syntax-dynamic-import.

const createListView = name => () =>
  System.import('../views/CreateListView').then(m => m.createListView(name))
const ItemView = () => System.import('../views/ItemView.vue')
const UserView = () => System.import('../views/UserView.vue')

const Homepage = () => System.import('../views/Homepage.vue')
// const ProductDetail = () => System.import('../views/ProductDetail.vue')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/top/:page(\\d+)?', component: createListView('top') },
    { path: '/new/:page(\\d+)?', component: createListView('new') },
    { path: '/show/:page(\\d+)?', component: createListView('show') },
    // { path: '/ask/:page(\\d+)?', component: createListView('ask') },
    // { path: '/job/:page(\\d+)?', component: createListView('job') },
    { path: '/item/:id(\\d+)', component: ItemView },


    // { path: '/product/product_detail/:id(\\d+)', component: ProductDetail },
    // { path: '/user/:id', component: UserView },
     //{ path: '/', redirect: '/top' },
    { path: '/homepage', component: Homepage }, // component 表示加载首页面
    { path: '/', redirect: '/homepage' } // 先加载首页
  ]
})
