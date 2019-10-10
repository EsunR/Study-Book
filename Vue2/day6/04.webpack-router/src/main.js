import Vue from 'vue';
// 1.导入vue-router包
import VueRouter from 'vue-router';
// 2.手动安装vue-router
Vue.use(VueRouter);

import app from './App.vue';

import account from './main/Account.vue';
import goodslist from './main/GoodsList.vue';

// 3.创建路由对象
var router = new VueRouter({
  routes: [
    // account goodslist
    { path: '/account', component: account },
    { path: '/goodslist', component: goodslist }
  ]
})

var vm = new Vue({
  el: '#app',
  render(c){
    return c(app);
  },
  // render: c => c(app),  // render会把el指定的容器中的内容清空覆盖，所以不要把路由的router-view和router-link直接写到el所控制的元素中
  // 4.将路由对象挂载到vm上
  router: router,
})