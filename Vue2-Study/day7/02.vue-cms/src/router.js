import VueRouter from 'vue-router';

// 导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';


var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: HomeContainer },
    { path: '/member', component: MemberContainer },
    { path: '/shopcar', component: ShopcarContainer },
    { path: '/search', component: SearchContainer }
  ],
  linkActiveClass: 'mui-active' //覆盖默认的激活的类
})

// 把路由对象暴露出去
export default router;