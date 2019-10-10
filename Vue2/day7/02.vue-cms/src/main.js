// 入口文件
// 导入js
import Vue from 'vue';
import app from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 导入css
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入Mint-UI中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 使用路由
Vue.use(VueRouter);
import router from './router.js';

// 使用Vue-resource
Vue.use(VueResource);

var vm = new Vue({
  el: '#app',
  render: c => c(app),
  router: router,
});