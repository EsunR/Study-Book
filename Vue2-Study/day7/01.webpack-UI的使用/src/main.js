import Vue from 'vue';
// 使用 Vue-Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// // 导入所有的 Mint-UI
// import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';
// // 将 Mint-UI 安装到 Vue 中
// Vue.use(MintUI);

// 按需导入
import { Button } from 'mint-ui';
// 使用 Vue.component 注册组件
// Vue.component('mybtn', Button);
Vue.component(Button.name, Button);


// 导入bootstrap样式
import 'bootstrap/dist/css/bootstrap.css';
import './lib/mui/css/mui.css';
import './css/app.css';

import router from './router.js';
import app from './App.vue';

var vm = new Vue({
  el: '#app',
  render(c) {
    return c(app);
  },
  // render: c => c(app),  // render会把el指定的容器中的内容清空覆盖，所以不要把路由的router-view和router-link直接写到el所控制的元素中
  // 4.将路由对象挂载到vm上
  router: router,
})